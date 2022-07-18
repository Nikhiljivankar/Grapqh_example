const cron = require('node-cron');
const OrderModel = require('../graphql/schema/order/model');

const cronJob = async () => {
	cron.schedule("* * * * * *", async function () {
        // console.log("running a task every minute");
          try{
        await OrderModel.findOneAndUpdate({status:'open',$expr: { $gt: [ "$request_quantity" , "$filled_quantity" ] }},{ $inc: { "filled_quantity" : Math.floor(Math.random() * 2) } },{
              new: true,
              runValidators: true,
          })
    
          await OrderModel.findOneAndUpdate({status:'open',$expr: { $eq: [ "$request_quantity" , "$filled_quantity" ] }},{$set:{status : "complete"}});
          if(Math.floor(Math.random() * 10) == 10){
          await OrderModel.findOneAndUpdate({status:'open',$expr: { $gt: [ "$request_quantity" , "$filled_quantity" ] }},{$set:{status : "error"}});
          }
        }catch(err){console.log(err);}
      });
};

module.exports = cronJob;
