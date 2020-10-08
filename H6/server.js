var fs = require('fs');
var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var schema = require('./schema_file.js');

var ROOT_DIR = "../H5";
var dbUrl = "mongodb://localhost/mydb";
var db = mongoose.connect(dbUrl);

mongoose.connection.once('open', {useUnifiedTopology: true},function () {
    http.createServer(function (req, res) {
        if (req.method === "POST") {
            var jsonData = "";
            req.on('data', function (chunk) {
                jsonData += chunk;
            });
            req.on('end', function () {
                var reqObj = JSON.parse(jsonData);
                var myDB = db.db("mydb");
                myDB.createCollection("data", myDB);
                myDB.collection("data").insertOne(reqObj, function (err, res){
                    if (err) throw err;
                    console.log("Successful Insertion of: " + reqObj);
                });
                console.log(reqObj);
                res.writeHead(200);
                res.end(JSON.stringify({}));
            });
        } else {
            var urlObj = url.parse(req.url, true, false);
            fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                else {
                    res.writeHead(200);
                    res.end(JSON.stringify("Success!"));
                    return;
                }
            });
        }

    }).listen(8080);
    db.close();
})