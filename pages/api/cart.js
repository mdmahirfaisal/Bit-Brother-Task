import run from './database';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    const { database } = await run();
    const cart = database.collection('cart');

    if (req.method === 'GET') {
        const email = req.query.email;
        const query = { email: email };
        const cursor = cart.find(query);
        const result = await cursor.toArray();
        res.status(200).json(result);
    }
    else if (req.method === 'POST') {
        const singleNews = req.body;
        const result = await cart.insertOne(singleNews);
        res.status(201).json(result);
    }
    // delete news
    else if (req.method === 'DELETE') {
        const id = req.query.id;
        const query = { '_id': ObjectId(id) };
        const result = await cart.deleteOne(query);
        res.status(200).json(result)
    }
    else if (req.method === 'PUT') {
        const id = req.query.id;
        const { product, quantity, price, img, desc, email, totalPrice } = req.body
        const query = { '_id': ObjectId(id) };
        const updateDoc = {
            $set: {
                product, quantity, price, img, desc, email, totalPrice
            }
        };
        const result = await cart.updateOne(query, updateDoc);
        res.status(201).json(result);
    }
}