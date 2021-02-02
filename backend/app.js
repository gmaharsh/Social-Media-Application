const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const Post = require('./models/Post');


const typeDefs = gql`
    type Post{
        id:ID!,
        body:String!,
        createdAt:String!,
        userName: String!
    }
    type Query{
        getPosts:[Post]
    },
`;
//Resolver is a collection of functions that generate response for a GraphQL query. In simple terms, a resolver acts as a GraphQL query handler
const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts
            } catch (err) {
                throw new Error(err)
            }
        }
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

//Database Connection
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology:true })
    .then(() => {
        console.log("Connected to Database")
    })
    .catch((err) => {
        console.log(err.message)
})

server.listen(5000)
    .then(res => {
        console.log("Server is running at port")
    })