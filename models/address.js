var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AddressSchema = new Schema({
    title: String,
    description: String,
    website: String,
    timestamp: Date,
    root: String
})

AddressSchema.index(
    {
        title: 'text', 
        description: 'text', 
        website: 'text'
    },
    {
        weights: {
            title: 3,
            description: 2,
            website: 1
        },
        name: "TextIndex"
    });

module.exports = mongoose.model('Address', AddressSchema)