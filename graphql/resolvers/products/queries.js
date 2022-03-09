import Product from "../../../models/products.js";

const productQueries =  {
    product: async (_, args) => {
        return Product.findById(args.id)
    }
}

export default  productQueries;