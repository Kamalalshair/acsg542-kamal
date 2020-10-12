var fs = require('fs');
var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var schema = require('./schema_file.js').todoSchema;

var ROOT_DIR = "./";
var dbUrl = "mongodb://localhost/mydb";
var db = mongoose.connect(dbUrl);
var Items = mongoose.model("Items", schema);

mongoose.connection.once('open', {useUnifiedTopology: true}, function () {
    http.createServer(function (req, res) {
        if (req.method === "POST") {
            var jsonData = "";
            req.on('data', function (chunk) {
                jsonData += chunk;
            });
            req.on('end', function () {
                var reqObj = JSON.parse(jsonData);
                var newItem = new Items({
                    item: reqObj
                });

                newItem.save(function (err, doc) {
                    console.log(doc);
                });

                res.writeHead(200);
                res.end(JSON.stringify({}));
            });
        } else if (req.method === "POST" && req.url === "/list") {
            var query = Items.find();
            query.exec(function (err, docs) {
                res.writeHead(200);
                res.end(JSON.stringify({docs}));
            });
        } else {
            var urlObj = url.parse(request.url, true, false);
            fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
                response.writeHead(200);
                response.end(data);
            });

        }
    }).listen(8080);
    db.close();
})