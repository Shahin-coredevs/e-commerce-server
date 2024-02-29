const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'superadmin', 'seller'] }
}, { versionKey: false, timestamps: true })

module.exports = model('User', userSchema);