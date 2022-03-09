import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers/index.js';
import { printSchema } from 'graphql';
//import { buildSchema, GraphQLSchema } from 'graphql';


const gqlFiles = readdirSync(join('graphql', './typedefs'));
let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join('graphql', './typedefs', file), {
    encoding: 'utf8',
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;