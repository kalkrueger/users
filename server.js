const express = require('express');
const app = express();
const openTel = require("./open-telemetry");
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
//const schema = require('./graphql/schema')
const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(process.env.DB)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
