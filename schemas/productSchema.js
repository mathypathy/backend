const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: mongoose.Schema.Types.String, required: true},
    price:{type: mongoose.Schema.Types.Number, required: true},
    category:{type: mongoose.Schema.Types.String, required: true},
    imageName:{type: mongoose.Schema.Types.String},
    rating: {type: mongoose.Schema.Types.String}
})

module.exports = mongoose.model("Products", productSchema)