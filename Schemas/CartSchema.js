const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    Buyer: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    Quantity: { type: Number },
}, { versionKey: false, timestamps: true })

module.exports = model('cart', cartSchema)