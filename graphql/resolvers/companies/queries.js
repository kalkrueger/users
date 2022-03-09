import Company from "../../../models/companies.js";

const companyQueries = {
    company: async(_, args) => {
        return Company.findById(args.id)
    }
}

export default companyQueries;