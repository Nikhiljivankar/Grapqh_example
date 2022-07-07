const express = require('express');

const router = express.Router();
const orderController = require('../controller/order');

router.route('/FindByStatus').post(orderController.FindByStatus);

router.route('/place').post(orderController.Create); //@ order place 

router.route('/status-for-ids').post(orderController.CompleteStatus);//status of orders

router.route('/:id').put(orderController.UpdateOrderById);//@  update quantity modification

router.route('/:id').delete(orderController.CancelOrder);//@  cancel order




module.exports = router;
