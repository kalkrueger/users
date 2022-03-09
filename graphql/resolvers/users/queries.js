import User from "../../../models/users.js";
import Company from "../../../models/companies.js";

const userQueries = {
    user: async (_, args) => {
        return User.findById(args.id)
    },

    userPurchases: async (_, args) => {
        return User.findById(args.id).then(res => {
            res.company = () => Company.findById(res.companyId)
            res.purchases =  () => res.populate( {path: "purchasedProducts"} ).then(res => {
                return res.purchasedProducts
            })
            return res
        })
    },
};

export default userQueries