const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Books]
    }

    type Books {
        authors: [String]
        description: String
        bookId: ID!
        image: String
        link: String
        title: String
    }

    input BookData {
        bookId: String!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookData!): User
        removeBook(bookId: ID!): User
    }
`

module.exports = typeDefs