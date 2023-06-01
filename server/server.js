const express = require("express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schema");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth.js");

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on ${PORT}`);
      console.log(`🌍 Now listening on localhost:${PORT}`);
    });
  });
}

startApolloServer();