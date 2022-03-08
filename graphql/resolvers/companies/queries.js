const Company = require("../../../models/company")

const companyQueries = {
    company: async(_, args) => {
        return Company.findById(args.id)
    }
}

export default companyQueries;