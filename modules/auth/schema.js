const { gql } = require("apollo-server-express")

module.exports = gql`
   type User{
    staff_id: ID,
    staff_name: String,
    staff_password: String,
    birth_date: String,
    branch_id: Int,
    staff_gender: String
   }

   type Message {
    msg: String!
   }
   type Query {
       users: [ User! ]
   }

   type Mutation {
    getUser(userId: Int!): User,
    authRegister( staff_name: String!, staff_password: String!, branch_id: String!, bith_date: String!, staff_gender: String! ): Message,
    deleteUser( id: Int! ): Message,
    updateUser( id: Int!, username: String, password: String, email: String, age: Int ): Message,
   }
`

