const User = require("../../../models/user")

const userQueries = {
    user: async (_, args) => {
        return User.findById(args.id)
    }
};

export default userQueries;