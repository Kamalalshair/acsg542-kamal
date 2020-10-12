var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var schema = require('./schema_file.js').todoSchema;

var ROOT_DIR = "./";
var db = mongoose.connect('mongodb://localhost/mydb');
var Items = mongoose.model('Items', schema);

mongoose.connection.once('open', function () {
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/', express.query());

    app.delete("/", function (request, response) {
        // Items.remove({_id: request.query.id}).exec()
        console.log(request.query)
        Items.deleteOne({_id: request.query.id}).exec()
    })

    app.post('*', function (req, res) {

        var reqObj = JSON.parse(req.body);
        var newItem = new Items({
            item: reqObj
        });

        newItem.save(newItem, function (err, doc) {
            console.log(doc);
            res.status(200);
            res.send(JSON.stringify({}));
        });
    });
    app.get('/list', function (req, res) {
        var query = Items.find();
        query.exec(function (err, docs) {
            res.status(200);
            res.send(JSON.stringify({docs}));
        });
    });
    app.use('/', express.static('./'));
    app.listen(8080, function () {
        console.log("Application is Running!");
    });
});