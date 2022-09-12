const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    imageLink: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;