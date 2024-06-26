const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!): Todo
    updateTodo(id: ID!, title: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    todos: async () => await Todo.find(),
    todo: async (_, { id }) => await Todo.findById(id),
  },
  Mutation: {
    createTodo: async (_, { title }) => {
      const todo = new Todo({
        title,
      });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, title, completed }) => {
      const todo = await Todo.findById(id);
      if (title !== undefined) todo.title = title;
      if (completed !== undefined) todo.completed = completed;
      await todo.save();
      return todo;
    },
    deleteTodo: async (_, { id }) => {
      const result = await Todo.findByIdAndDelete(id);
      return result ? true : false;
    },
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
