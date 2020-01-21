const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

async function main() {
  const newLink = await prisma.createLink({
    url: 'www.prisma.io',
    description: 'Prisma replaces traditional ORMs',
  });

  console.log(`Created new link: ${newLink.url} (ID: ${newLink.id})`);

  const allLinks = await prisma.links();
  console.log(allLinks);
}

main().catch(e => console.error(e));

// type definitions from your application schema

// resolvers: This is a JavaScript object that mirrors the Query, 
// Mutation and Subscription types and their fields from your 
// application schema. Each field in the application schema is 
// represented by a function with the same name in that object.
const resolvers = {
  Query: {
    info: () => `API for Hackernews Clone!`,
    feed: () => (root, args, context, info) => {
      return context.prisma.links();
    },
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
  },
};

// init server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log(`Running server on port 4000..`));