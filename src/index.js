import 'dotenv/config';
import express from 'express'
import { ApolloServer, gql } from "apollo-server-express";

const app = express()

const schema = gql`
    type Query {
        me: User
        you: User
        employee: Employee
    }
    type User {
        username: String!
    }
    type Employee {
        username: String!
        lastname: String!
    }
`;
const resolvers = {
    Query: {
        me: () => {
            return {
                username: 'Waldek Pieniak',
            };
        },
        you: () => {
            return {
                username: "Kajeczka Pierdeczka"
            }
        },
        employee: () => {
            return {
                username: 'Jan',
                lastname: 'Sniezek'
            }
        }
    },
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
})

app.get('/', (req, res) => {
    res.send('Cos tam')
})

server.applyMiddleware({ app, path: '/graphql'})

app.listen(4000, () => console.log('listening'))
