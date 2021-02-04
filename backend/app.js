const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const resolvers =  require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
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