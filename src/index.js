const { GraphQLServer } = require('graphql-yoga');

// type definitions from your application schema

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}];

let idCount = links.length;

// resolvers: This is a JavaScript object that mirrors the Query, 
// Mutation and Subscription types and their fields from your 
// application schema. Each field in the application schema is 
// represented by a function with the same name in that object.
const resolvers = {
  Query: {
    info: () => `API for Hackernews Clone!`,
    feed: () => links,
  },
  Mutation : {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link);
      return link;
    }
  }
};

// init server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Running server on port 4000..`));