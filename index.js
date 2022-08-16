const {ApolloServer} = require('apollo-server');
const moongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')

const {MONGODB } = require('./config');



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

moongoose
    .connect(MONGODB, {useNewUrlParser: true})
    .then(() => { 
        console.log('Connected to MongoDB');
        return server.listen({port: 5000});
    })
    .then(res => {
        console.log(`🚀  Server ready at ${res.url}`)
    })
    .catch(err => {
        console.log(err);
    });



