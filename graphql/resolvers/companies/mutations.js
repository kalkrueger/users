import Company from "../../../models/companies.js";

const companyMutations = {
    createCompany: async (_, { company }) => {
        let newCompany = new Company (company)
        return newCompany.save()
    }
}

export default companyMutations;