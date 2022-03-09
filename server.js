import express from 'express';
const app = express();
import openTel from "./open-telemetry.js";
import  countAllRequests from './monitoring.js'
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema.js';
import mongoose from "mongoose";
import 'dotenv/config'

app.use(countAllRequests());

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