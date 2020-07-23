const mongoose = require('mongoose');
const shortUrlSchema = mongoose.Schema({
    "fullUrl": {
        type: String,
        require: true
    },
    "shortUrl":{
        type:String,
        require:true
    }
})
module.exports = mongoose.model('shortUrl',shortUrlSchema)