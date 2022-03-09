import Purchase from "../../../models/purchases.js";

const purchaseQueries = {
    purchase: async(_, args) => {
        return Purchase.findById(args.id)
    }
}

export default purchaseQueries;