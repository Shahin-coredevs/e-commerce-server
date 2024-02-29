
const { ObjectId } = require("mongodb");
const CartSchema = require("../Schemas/CartSchema");

const addToCart = async (req, res) => {
    try {
        const productExists = await CartSchema.findOne({ product: req.body.product });
        if (productExists) return res.status(409).send({ reason: 'Product already exists in your cart' });
        const result = new CartSchema({ product: req.body.product, Buyer: req.user.id, Quantity: 1 });
        await result.save()
        return res.status(200).send(result)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
}

const cartUpdate = async (req, res) => {
    try {
        const { id, Quantity } = req.body
        const result = await CartSchema.findOneAndUpdate({ _id: id }, { $set: { Quantity: Quantity } }, { new: true });
        await result.save()
        return res.status(200).send(result)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
}

const cartProducts = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) return res.status(400).send({ reason: 'Bad Request' })
        const result = await CartSchema.find({ Buyer: id }).populate({ path: 'product Buyer seller', select: '-role -createdAt -updatedAt -password -photo' })
        return res.status(200).send(result)

    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}


const deleteFromCart = async (req, res) => {
    try {
        const id = req.body
        const result = await CartSchema.findOneAndDelete({ _id: new ObjectId(id) })
        return res.status(200).send(result)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = { addToCart, cartProducts, deleteFromCart, cartUpdate }