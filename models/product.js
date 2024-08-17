const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// Define el esquema de producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
});


productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;


