import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String ,
    age: Number,
    companyId: String,
    purchasedProducts: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'purchase' 
    }]
});

const User = mongoose.model('user', userSchema);

export default User;