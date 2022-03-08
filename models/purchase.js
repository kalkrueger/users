const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({

  productId: {
    type: Schema.Types.ObjectId, 
    ref: "product"
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "user"
  },  
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },

}, {timestamps: true})

const Purchase = mongoose.model('purchase', PurchaseSchema);

module.exports = Purchase;