const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    Buyer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    address: { type: String, required: true, required: true },
    status: { type: String, default: 'pendding' }
}, { versionKey: false, timestamps: true })

module.exports = model('Order', orderSchema)