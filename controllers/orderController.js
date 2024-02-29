const orderSchema = require("../Schemas/orderSchema");

const orderconfirm = async (req, res) => {

    try {

        const order = await new orderSchema({ ...req.body, Buyer: req.user.id });
        await order.save()
        return res.status(200).send(order)
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
    }

}

const showOrder = async (req, res) => {
    const order = await orderSchema.find().populate({ path: 'product Buyer', select: '-password -createdAt -updatedAt -role -photo'});
    return res.status(200).send(order)

}

module.exports = { orderconfirm, showOrder }