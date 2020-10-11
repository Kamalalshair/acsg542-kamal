var fs = require('fs');
var http = require('http');
var url = require('url');
var mongo = require('mongodb');
var ROOT_DIR = "../H5";

var dbUrl = "mongodb://localhost";

mongo.MongoClient.connect(dbUrl, {useUnifiedTopology: true},function (err, db) {
    if (err) throw err;
    http.createServer(function (req, res) {
        if (req.method === "POST") {
            var jsonData = "";
            req.on('data', function (chunk) {
                jsonData += chunk;
            });
            req.on('end', function () {
                var reqObj = JSON.parse(jsonData);
                var myDB = db.db("mydb");
                myDB.collection("todo", function(err, todo){
                    todo.save(reqObj, function(err, results){
                        console.log(results);
                    });
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
                    res.end(data);
                }
            });
        }

    }).listen(8080);
    db.close();
})