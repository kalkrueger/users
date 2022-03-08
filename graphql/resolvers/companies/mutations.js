const Company = require("../../../models/company")

const companyMutations = {
    createCompany: async(_, { name, description }) => {
        let company = new Company ({
            name: name,
            description: description,
          })
          return company.save()
    }
}

export default companyMutations;