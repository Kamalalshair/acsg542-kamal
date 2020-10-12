var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    item: {type: String, required: true, index: true}
}, {collection: "data"});

exports.todoSchema = todoSchema;