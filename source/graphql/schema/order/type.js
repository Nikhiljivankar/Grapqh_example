const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
  } = require('graphql');

  const Order = new GraphQLObjectType({
    name: 'Order',
    description: 'This represents a Order',
    fields() {
      return {
        _id: {
          type: GraphQLString,
          resolve(order) {
            return order._id;
          },
        },
        order_id: {
          type: GraphQLString,
          resolve(order) {
            return order.order_id;
          },
        },
        order_tag: {
          type: GraphQLString,
          resolve(order) {
            return order.order_tag;
          },
        },
        symbol: {
          type: GraphQLString,
          resolve(order) {
            return order.symbol;
          },
        },
        filled_quantity: {
          type: GraphQLInt,
          resolve(order) {
            return order.filled_quantity;
          },
        },
        request_quantity: {
          type: GraphQLInt,
          resolve(order) {
            return order.request_quantity;
          },
        },
        status: {
          type: GraphQLString,
          resolve(order) {
            return order.status;
          },
        },
      };
    },
  });
  
  module.exports =Order;
  