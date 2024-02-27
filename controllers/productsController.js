const { ObjectId } = require("mongodb");
const { productCollection } = require("../utils/Database");
const fileUp = require("../utils/filup");

const CREATE_ALLOWED = new Set(['category', 'photo', 'title', 'description', 'price', 'rating', 'stock', 'brand']);

async function addProduct(req, res) {
    try {
        const isValid = Object.keys(req.body).every((key) => CREATE_ALLOWED.has(key));
        if (!isValid) return res.status(400).send({ reason: 'Bad Request' });
        const photo = await fileUp(req.files.photo.path);
        req.body.photo = photo;
        const product = productCollection.insertOne({ ...req.body });
        res.status(200).send(product)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }

}

async function getProducts(req, res) {

    try {
        const result = await productCollection.find().toArray();
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

async function getProductsByCategory(req, res) {
    try {
        const category = req.params.category
        if (!category) return res.status(400).send({ reason: 'Bad Request' });
        const result = await productCollection.find({ category: category }).toArray()
        res.status(200).send(result);

    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}
async function getProductsByBrand(req, res) {
    try {
        const brand = req.params.brand
        if (!brand) return res.status(400).send({ reason: 'Bad Request' });
        const result = await productCollection.find({ brand }).toArray()
        res.status(200).send(result);


    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}
async function getProductsById(req, res) {
    try {
        const id = req.params.id
        if (!id) return res.status(400).send({ reason: 'Bad Request' });
        const result = await productCollection.findOne({ _id: new ObjectId(id) })
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}



module.exports = { getProducts, addProduct, getProductsByCategory, getProductsByBrand, getProductsById }