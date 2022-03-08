const Product = require("../../../models/product")

const productQueries =  {
    product: async (_, args) => {
        return Product.findById(args.id)
    }
}

export default productQueries;