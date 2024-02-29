const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'cart' },
    Buyer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    seller: { type: Schema.Types.ObjectId, ref: 'product'},
    address: { type: String, required: true },
}, { versionKey: false, timestamps: true })

module.exports = model('Order', orderSchema)