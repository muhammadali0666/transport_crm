const { getUsers, authRegister, getUser, deleteUser, updateUser } = require("./model")
module.exports = {
    Query: {
        users: async () => await getUsers()
    },
    Mutation: {
        getUser: async (_, args) => await getUser(args),
        authRegister: async (_, args) => await authRegister(args),
        // deleteUser: async (_, args) => await deleteUser(args),
        // updateUser: async (_, args) => await updateUser(args)
    }
}