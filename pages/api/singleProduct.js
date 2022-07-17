import run from './database';
const ObjectId = require('mongodb').ObjectId;
export default async function handler(req, res) {
    const { database } = await run();
    const products = database.collection('products');

    if (req.method === 'GET') {
        const id = req.query.id

        console.log(id);
        const query = { '_id': ObjectId(id) }
        const result = await products.findOne(query)
        res.status(201).json(result);
    }
}