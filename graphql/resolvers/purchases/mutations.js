const Product = require("../../../models/product")
const Purchase = require("../../../models/purchase")

const purchaseMutations = {
    addPurchase: async(_, { userId, productId, quantity }) => {
        return Product.findById(productId)
            .then(res => {
                let purchase = new Purchase({
                    userId,
                    productId,
                    quantity,
                    price: res.price
                })
                return purchase.save()
                    .then(purchase => {
                        User.findByIdAndUpdate(args.userId, 
                          { $push: { purchasedProducts : purchase._id } }, 
                          {new: true} ).then()
                        return purchase
                      })
            })
    }
}

export default purchaseMutations;