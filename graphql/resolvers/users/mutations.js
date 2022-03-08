const User = require("../../../models/user")

const userMutations = {
    createUser: async (_, args) => {
        let user = new User ({
            firstName: args.firstName,
            age: args.age,
            companyId: args.companyId
        })
        return user.save()
    }
}

export default userMutations