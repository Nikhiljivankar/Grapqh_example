const {
    GraphQLObjectType,
    GraphQLSchema,
  } =require('graphql');
  
  const { order } =require('./order');
  
  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      description: 'Root query object',
      fields: (conn) => {
        return {
          orders: order.query,
        };
      },
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      description: 'Mutation object',
      fields: () => {
        return {
          orders: order.mutation,
        };
      },
    })
  });
  
  module.exports =schema;
  