import { ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloClient and InMemoryCache from Apollo Client library

// Create an instance of ApolloClient
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql', // The URI for the GraphQL endpoint
  cache: new InMemoryCache(), // Use InMemoryCache for caching results from the GraphQL server
});

// Export the Apollo Client instance for use in other parts of the application
export default client;

