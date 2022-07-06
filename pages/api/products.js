import run from './database';

export default async function handler(req, res) {
    const { database } = await run();
    const products = database.collection('products');

    if (req.method === 'GET') {
        const result = await products.find({}).toArray();
        res.status(200).json(result);
    }
}