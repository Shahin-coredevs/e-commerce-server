
const productSchema = require("../Schemas/productSchema");
const fileUp = require("../utils/filup");

const CREATE_ALLOWED = new Set(['category', 'title', 'description', 'price', 'rating', 'stock', 'brand', 'photo']);
const addProduct = async (req, res) => {
    try {
        const isValid = Object.keys(req.body).every((key) => CREATE_ALLOWED.has(key));
        if (!isValid) return res.status(400).send({ reason: 'Bad Request' });
        const photo = await fileUp(req.files.photo.path);
        req.body.photo = photo;
        const product = await new productSchema({ ...req.body, seller: req.user.id });
        await product.save()
        res.status(200).send(product)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

const getProducts = async (req, res) => {
    const sortfield = req.query.sortfield;
    const sortorder = req.query.sortorder;
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const sortObj = {};
    if (sortfield && (sortorder === "asc" || sortorder === "desc")) {
        sortObj[sortfield] = sortorder === "asc" ? 1 : -1;
    }






    try {
        const result = await productSchema.find().sort(sortObj).skip((page - 1) * limit).limit(limit).populate({ path: 'seller', select: 'name email' });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category
        if (!category) return res.status(400).send({ reason: 'Bad Request' });
        const result = await productSchema.find({ category: category });
        return res.status(200).send(result);

    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}
const getProductsByBrand = async (req, res) => {
    try {
        const brand = req.params.brand
        if (!brand) return res.status(400).send({ reason: 'Bad Request' });
        const result = await productSchema.find({ brand });
        res.status(200).send(result);


    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}
const getProductsById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) return res.status(400).send({ reason: 'Bad Request' });
        const result = await productSchema.findOne({ _id: id }).populate({ path: 'user', select: '-password -createdAt -updatedAt' });
        if (!result) return res.status(404).send({ reason: 'Not Found' });
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = { getProducts, addProduct, getProductsByCategory, getProductsByBrand, getProductsById }


