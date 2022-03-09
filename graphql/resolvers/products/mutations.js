import Product from "../../../models/products.js";

const productMutations = {
    createProduct: async (_, { product }) => {
        let newProduct = new Product (product)
        return newProduct.save()
    } 
}

export default productMutations;