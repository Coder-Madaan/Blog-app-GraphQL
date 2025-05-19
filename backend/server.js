const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { MongoClient, ObjectId  } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const typeDefs = `
  type BlogPost {
    _id: ID!
    title: String!
    content: String!
    author: String!
  }

  type Query {
    posts: [BlogPost]
    post(id: ID!): BlogPost
  }
`;

const resolvers = {
  Query: {
    posts: async (_, __, { db }) => {
      try {
        return await db.collection('posts').find().toArray();
      } catch (error) {
        throw new Error('Failed to fetch posts');
      }
    },
   post: async (_, { id }, { db }) => {
  try {
    // Validate ID format
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid ID format - must be 24-character hexadecimal');
    }

    const postId = new ObjectId(id);
    const post = await db.collection('posts').findOne({ _id: postId });

    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error.message);
    throw new Error(error.message);
  }
},
  },
};

async function startServer() {
  const app = express();

  // Enable CORS
  app.use(cors());

  // Database connection setup
  let db;
  try {
    console.log('🔃 Attempting MongoDB connection...');
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db();
    console.log(`✅ Connected to MongoDB: ${db.databaseName}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }

  // Apollo Server setup
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }), 
    formatError: (error) => {
      console.error(error);
      return { message: error.message };
    },
  });

 
  await apolloServer.start();
  
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });

  process.on('SIGTERM', () => {
    console.log('Shutting down server...');
    client.close();
    process.exit(0);
  });
}

startServer().catch(error => {
  console.error('Server startup error:', error.message);
  process.exit(1);
});