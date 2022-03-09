import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type:Number,
    required: true
  }

})

const Product = mongoose.model('product', ProductSchema);

export default Product;