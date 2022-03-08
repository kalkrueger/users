const graphql = require('graphql');
const axios = require('axios');
const Product = require("../models/product");
const User = require("../models/user");
const Company = require("../models/company");
const Purchase = require("../models/purchase");
const { populate } = require('../models/product');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return User.find({companyId: parentValue.id})
      }
    }
  })
});

const PurchaseType = new GraphQLObjectType ({
  name: 'Purchase',
  fields: () => ({
    id: { type: GraphQLString },
    userId: { type: GraphQLString },
    productId: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    price: { type: GraphQLInt},
    product: {
      type: ProductType,
      resolve: (parent) => { return Product.findById(parent.productId) }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString } ,
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) { 
        return Company.findById(parentValue.companyId)
      } 
    },
    purchases: {
      type: new GraphQLList(PurchaseType),
      resolve(parentValue, args) {
        return parentValue.populate({
          path: "purchasedProducts",
        }).then(res => {
          return res.purchasedProducts
          })
      }
    },
  })
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: {type: GraphQLString}},
      resolve(parentValue, args) {
        return User.findById(args.id)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return Company.findById(args.id)
      }
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return Product.findById(args.id)
      }
    },
    purchase: {
      type: PurchaseType,
      args: { id: { type: GraphQLString} },
      resolve(parentValue, args) {
        return Purchase.findById(args.id)
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt)},
        companyId: {type: GraphQLString}
      },
      resolve(parentValue, { firstName, age, companyId }) {
        let user = new User ({
          firstName: firstName,
          age: age,
          companyId: companyId
        })
        return user.save()
      }
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, { name, description }) {
        let company = new Company ({
          name: name,
          description: description,
        })
        return company.save()
      }
    },
    addProduct: {
      type: ProductType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt)},
        quantity: { type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parentValue, { title, price, quantity }) {
        let product = new Product ({
          title: title,
          price: price,
          quantity: quantity
        })
        return product.save()
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return User.findByIdAndDelete(id)
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt},
        companyId: {type: GraphQLString},
        purchasedProducts: {type: new GraphQLList(GraphQLString)}
      },
      resolve(parentValue, args) {
        return User.findByIdAndUpdate(args.id, args, {new: true})
      }
    },
    addPurchase: {
      type: PurchaseType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLString) },
        productId: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        price: { type: GraphQLInt },
      },
      async resolve(_, args) {
        return Product.findById(args.productId).then(res => {
          let purchase = new Purchase({
            userId: args.userId,
            productId: args.productId,
            quantity: args.quantity,
            price: res.price 
          })
          return purchase.save().then(purchase => {
            User.findByIdAndUpdate(args.userId, 
              { $push: { purchasedProducts : purchase._id } }, 
              {new: true} ).then()
            return purchase
          })
        })
      }
    },
  }
});



module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});