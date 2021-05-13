import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../../app';
import Order from '../../../models/Order';
import Product from '../../../models/Product';

it('DELETE:/api/order/:orderId --> Unauthorized', async () => {
   const orderId = new mongoose.Types.ObjectId().toHexString();
   await request(app).delete(`/api/order/${orderId}`).expect(401);   
});

it('DELETE:/api/order/:orderId --> Order not found', async () => {
   const orderId = mongoose.Types.ObjectId()
   await request(app)
      .delete(`/api/order/${orderId}`)
      .set('Authorization', global.signinAsCustomer())
      .expect(400);   
}); 

it('DELETE:/api/order/:orderId --> Delete Order.', async () => {
   const product1 = Product.build({
      price: 500,
      quantity: 100,
      title: 'product title 1',
      isQuantityRestricted: true,
      placeholder: 'new placeholder 1',
      id: mongoose.Types.ObjectId().toHexString()
  });

   await product1.save();
   const productQuantities = [10];
   const productIds = [product1.id];
   const token = global.signinAsCustomer()

   await request(app)
      .post('/api/order')
      .set('Authorization', token)
      .send({productIds, productQuantities})
      .expect(200);    

   const data = await Order.find({})
   expect(data.length).toEqual(1)
   const order = data[0]

   await request(app)
      .delete(`/api/order/${order.id}`)
      .set('Authorization', token)
      .expect(200)
});

it('DELETE:/api/order/:orderId --> Unauthorized Order Retrieval.', async () => {
   const product1 = Product.build({
      price: 500,
      quantity: 100,
      title: 'product title 1',
      isQuantityRestricted: true,
      placeholder: 'new placeholder 1',
      id: mongoose.Types.ObjectId().toHexString()
  });

   await product1.save();
   const productQuantities = [10];
   const productIds = [product1.id]

   await request(app)
      .post('/api/order')
      .set('Authorization', global.signinAsCustomer())
      .send({productIds, productQuantities})
      .expect(200);    

   const data = await Order.find({})
   expect(data.length).toEqual(1)
   const order = data[0]

   await request(app)
      .delete(`/api/order/${order.id}`)
      .set('Authorization', global.signinAsCustomer())
      .expect(401);
});