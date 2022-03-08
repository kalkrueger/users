const Purchase = require("../../../models/purchase")

const purchaseQueries = {
    purchase: async(_, args) => {
        return Purchase.findById(args.id)
    }
}

export default purchaseQueries;