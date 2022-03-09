import User from "../../../models/users.js"
import Product from "../../../models/products.js"
import Purchase from "../../../models/purchases.js"


const purchaseMutations = {
    addPurchase: async (_, { purchase }) => {
        return Product.findById(purchase.productId)
            .then(res => {
                let newPurchase = new Purchase({
                    ...purchase,
                    price: res.price
                })
                return newPurchase.save()
                    .then(purchase => {
                        User.findByIdAndUpdate(purchase.userId, 
                          { $push: { purchasedProducts : purchase._id } }, 
                          {new: true} ).then()
                        return purchase
                      })
            })
    }
}

export default purchaseMutations