const { ObjectId } = require("mongodb");
const { cartCollection } = require("../utils/Database");

async function addToCart(req, res) {
    const addAllowed = new Set(['email', 'name', 'category', 'photo', 'title', 'description', 'price', 'rating', 'stock', 'brand']);
    try {
        const isValid = Object.keys(req.body).every((key) => addAllowed.has(key));
        if (!isValid) return res.status(400).send({ reason: 'Bad Request' });

        const result = cartCollection.insertOne({ ...req.body })
        res.status(200).send(result)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

async function cartProducts(req, res) {
    try {
        const email = req.params.email
        if (!email) return res.status(400).send({ reason: 'Bad Request' })
        const result = cartCollection.find({ email }).toArray()
        res.status(200).send(result)

    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

async function deleteFromCart(req, res) {
    const id = req.params.id;
    if (!id) return res.status(400).send({ reason: 'Bad Request' })
    const result = cartCollection.deleteOne({ _id: new ObjectId(id) })
    res.status(200).send('Sucessfully deleted from cart')
}

module.exports = { addToCart, cartProducts, deleteFromCart }