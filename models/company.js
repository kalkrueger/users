const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String ,
    description: String,
});

const Company = mongoose.model('compay', companySchema);

module.exports = Company;