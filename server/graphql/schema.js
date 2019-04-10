import { gql } from 'apollo-server-express';

import {
  GraphQLTime,
} from 'graphql-iso-date';

const schema =  gql`

  scalar Time

  type User {
    id: ID!
    firstName: String
    lastName: String
    username: String!
    thumbnail: String
    profile: String
    createdAt: Time!
  }

`;

Object.assign(schema._typeMap.Time, GraphQLTime);

export default schema;
