const { getUsers, authRegister, authLogin, createBranches, createTransport, getUser, deleteUser, updateUser } = require("./model")
module.exports = {
    Query: {
        users: async () => await getUsers()
    },
    Mutation: {
        getUser: async (_, args) => await getUser(args),
        authRegister: async (_, args) => await authRegister(args),
        authLogin: async (_, args) => await authLogin(args),
        createBranches: async (_, args) => await createBranches(args),
        createTransport: async (_, args) => await createTransport(args)

        // deleteUser: async (_, args) => await deleteUser(args),
        // updateUser: async (_, args) => await updateUser(args)
    }
}