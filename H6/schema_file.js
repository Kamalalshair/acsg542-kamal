var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema ({
    todo: {type: String,
    required: true,
    index: true}
})