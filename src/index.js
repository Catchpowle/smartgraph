const { ApolloServer, gql } = require("apollo-server");
const SmartAPI = require("./smart-api.js");

const typeDefs = gql`
  type Query {
    info: String!
    adviser(id: Int!): Adviser
    advisers: [Adviser]
    company(slug: String!): Company
    companies: [Company]
  }

  type Adviser {
    id: Int!
    type: String!
    name: String!
    address: String!
    created_at: String!
    updated_at: String!
  }

  type Company {
    id: Int!
    name: String!
    slug: String!
    registration_number: String!
    scheme_starts_on: String!
    legal_structure: String!
    pensionable_earning_type: String!
    employer_pension_scheme_registration: String!
    created_at: String!
    updated_at: String!
    state: String!
    contribution_charge_id: Int!
  }

  type User {
    id: Int!
    email: String!
    title: String!
    forename: String!
    surname: String!
    api_key: String!
    telephone: String!
    adviser_id: Int!
    created_at: String!
    updated_at: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "Smart Graph",
    advisers: async (_source, _args, { dataSources }) => {
      return dataSources.smartAPI.getAdvisers();
    },
    adviser: async (_source, { id }, { dataSources }) => {
      return dataSources.smartAPI.getAdviser(id);
    },
    company: async (_source, { slug }, { dataSources }) => {
      return dataSources.smartAPI.getCompany(slug);
    },
    companies: async (_source, _args, { dataSources }) => {
      return dataSources.smartAPI.getCompanies();
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      smartAPI: new SmartAPI()
    };
  }
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
