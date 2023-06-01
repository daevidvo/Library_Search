const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Books]!
    }

    type Books {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        _id: ID
        user: User
    }

    type Query {
        me: User

    }

    type Mutation {
        login(email: String!, password String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook()
    }
`

module.exports = typeDefs