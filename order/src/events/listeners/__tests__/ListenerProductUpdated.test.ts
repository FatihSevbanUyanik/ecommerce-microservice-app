import mongoose from 'mongoose';
import Product from '../../../models/Product';
import ListenerProductUpdated from '../ListenerProductUpdated';
import { EventProductUpdated } from '@conqueror-ecommerce/common';

it('ListenerProductUpdated', async () => {

    const product = Product.build({
        price: 500,
        quantity: 100,
        title: 'product title 1',
        isQuantityRestricted: true,
        placeholder: 'placeholder1',
        id: mongoose.Types.ObjectId().toHexString()
    })

    await product.save()

    // build event data
    const eventData: EventProductUpdated['data'] = {
        price: 200,
        quantity: 250,
        id: product.id,
        isQuantityRestricted: true,
        version: product.version + 1,
        title: 'product title 1 updated',
        placeholder: 'placeholder1 updated',
    }

    // @ts-ignore
    const message: Message = { ack: jest.fn() }

    // check listener
    await ListenerProductUpdated.onMessage(eventData, message)
    expect(message.ack).toHaveBeenCalled()

    // retrieve updated products
    const productUpdated = await Product.findById(product.id)

    // check props
    expect(productUpdated!.id).toEqual(eventData.id)
    expect(productUpdated!.price).toEqual(eventData.price)
    expect(productUpdated!.title).toEqual(eventData.title)
    expect(productUpdated!.version).toEqual(product.version + 1)
    expect(productUpdated!.quantity).toEqual(eventData.quantity)
    expect(productUpdated!.placeholder).toEqual(eventData.placeholder)
    expect(productUpdated!.isQuantityRestricted).toEqual(eventData.isQuantityRestricted) 
})