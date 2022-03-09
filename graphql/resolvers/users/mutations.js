import  User  from "../../../models/users.js"
import Company from "../../../models/companies.js"

const userMutations = {
    createUser: (_, { user }) => {
        let newUser = new User( user );
        return newUser.save().then(res => {
            res.company = () => Company.findById(res.companyId)
            console.log(res.company)
            return res
        }); 
    }
}

export default userMutations