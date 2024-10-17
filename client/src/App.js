const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema'); // Replace with the correct path to your schema
const resolvers = require('./resolvers'); // Replace with the correct path to your resolvers
const path = require('path');
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo Server
const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); // Ensure GraphQL is served at /graphql
};

startServer();

// Static files for production (React app)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});