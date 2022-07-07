const mongoose = require("mongoose");
const OrderModel = require("../../graphql/schema/order/model");
const catchAsync = require("../../utils/catchAsync");
const successResponse = require("../../utils/successResponse");
const OrderSuccessResponse = require("../../utils/OrderSuccessResponse");

const options = { new: true, runValidators: true };


exports.FindByStatus = catchAsync(async (req, res, next) => {
  let finalData = await OrderModel.find({ status: req.body.status });
  if (finalData.length) {
    res
      .status(200)
      .json(
        successResponse(finalData, finalData.length, "order fetched successfully")
      );
  } else {
    res.status(200).json(successResponse(finalData,"No order found"));
  }
});

exports.Create = catchAsync(async (req, res, next) => {
  const order = {symbol:req.body.symbol,order_tag:req.body.order_tag,request_quantity:req.body.quantity};
  let finalData = await OrderModel.create(order);
  delete finalData._doc._id;
  res
    .status(200)
    .json(successResponse(finalData, "order create success"));
});

exports.UpdateOrderById = catchAsync(async (req, res, next) => {
  const classDetails = await OrderModel.findOneAndUpdate(
    { order_id: req.params.id,$where : `${req.body.quantity} > this.filled_quantity` },
    {request_quantity:req.body.quantity},
    options
  );
  if(classDetails){
  res.status(200).json(successResponse(classDetails,'order update success'));
  }else{
    res.json({statusCode:200,mesage:"can't update requested quantity"});
  }
});

exports.CancelOrder = catchAsync(async (req, res, next) => {
  const classDetails = await OrderModel.findOneAndUpdate(
    { $match:{order_id: req.params.id,status:'open'} },
    {status:'cancel'},
    options
  );
  res.status(200).json(successResponse(classDetails,'order cancel success'));
});

exports.CompleteStatus = catchAsync(async (req, res, next) => {
  const classDetails = await OrderModel.find({order_id:{$in:req.body.order_ids}});
  res.status(200).json(OrderSuccessResponse(classDetails));
});
