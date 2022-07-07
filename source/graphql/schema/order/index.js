const {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
  } =require('graphql');
  const Order =require('./type');
  // const OrderModel =require('./model');

  exports.order = {
    query: {
      type: new GraphQLList(Order),
      args: {
        type: {
          type: GraphQLString,
        },
        _id: {
          type: GraphQLString,
        }
      },
      async resolve(root, args, context, info) {
        const orderData = await context.mongo.models.Order.find({});
        return orderData;
      },
    },
    mutation: {
      type: Order,
      args: {
        type: {
          type: GraphQLString,
        },
        _id: {
          type: GraphQLString,
        },
        order_id: {
          type: GraphQLString,
        },
        order_tag: {
          type: GraphQLString,
        },
        symbol: {
          type: GraphQLString,
        },
        filled_quantity: {
          type: GraphQLInt,
        },
        request_quantity: {
          type: GraphQLInt,
        },
        status: {
          type: GraphQLString,
        },
      },
      async resolve(root, args, context, info) {
        const transactionType = args.type;
        if (transactionType == 'createOrder') {
            return await context.mongo.models.Order.create({
                symbol: args.symbol,
                order_tag: args.order_tag,
                request_quantity: args.quantity,
              });
          
        }
        else if (transactionType == 'orderStatus') {
          return await context.mongo.models.Order.find({ order_id: { $in: args.order_ids } });
        }
        else if (transactionType == 'updateQuantity') {
            return await context.mongo.models.Order.findOneAndUpdate(
                { order_id: args.id, $where: `${args.quantity} > this.filled_quantity` },
                { request_quantity: args.quantity },
                { new: true, runValidators: true }
              );
          }
        else if (transactionType == 'cancelOrder') {
            const classDetails = await context.mongo.models.Order.findOneAndUpdate(
                { $match: { order_id: args.id, status: "open" } },
                { status: "cancel" },
                options
              );
        }
      },
    },
  };