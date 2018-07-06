var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AddressSchema = new Schema({
    title: String,
    description: String,
    website: String,
    timestamp: Date,
    root: String
})

module.exports = mongoose.model('Address', AddressSchema)