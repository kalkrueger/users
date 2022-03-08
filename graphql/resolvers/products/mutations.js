const Product = require("../../../models/product")

const productMutations = {
    createProduct: async (_, { title, price, quantity }) => {
        let product = new Product ({
            title: title,
            price: price,
            quantity: quantity
          })
          return product.save()
    } 
}

export default productMutations;