const { ObjectId } = require("mongodb");
const orderSchema = require("../Schemas/orderSchema");

const orderconfirm = async (req, res) => {
    try {

        const order = await new orderSchema({ ...req.body, Buyer: req.user.id, });
        await order.save()
        return res.status(200).send(order)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }

}

const showOrder = async (req, res) => {
    try {
        const order = await orderSchema.find().populate({ path: 'product Buyer seller', select: '-password -createdAt -updatedAt -role -photo' });
        return res.status(200).send(order)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }

}

const updateOrder = async (req, res) => {
    try {
        const { id, status } = req.body
        const result = await orderSchema.findByIdAndUpdate({ _id: id }, { $set: { status } }, { new: true });
        if (result) return res.status(200).send(result)
        else return res.status(404).send({ message: "Product not found" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

const getOrderBySellerId = async (req, res) => {
    const id = req.body.id
    try {
        const allOrder = await orderSchema.find({ seller: id }).populate({ path: 'product Buyer seller', select: '-password -createdAt -updatedAt -role -photo' })
        return res.send(allOrder)

    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Server Error");
    }
}

module.exports = { orderconfirm, showOrder, updateOrder, getOrderBySellerId }