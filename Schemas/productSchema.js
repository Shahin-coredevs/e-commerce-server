const { model, Schema } = require('mongoose')

const ProductSchema = new Schema({
    seller: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    photo: { type: String, required: true }
}, { versionKey: false })

module.exports = model('product', ProductSchema)