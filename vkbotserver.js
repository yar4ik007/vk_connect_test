const sendRequest = require('request');
const http = require("http");
const url = require('url');
const fs = require('fs');
//libDbQuery = require

http.createServer(function(request, response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    
    var uploadUrl = url.parse(request.url, true).query.upload_url;
    var userId = url.parse(request.url, true).query.user_id;

    //request_to_db
    // var imagePath = request_to_db.resultPath
    var formData = {
        photo: fs.createReadStream('../vkbotteacherservice/src/level.jpg'),
        // photo: fs.createReadStream('imagePath'),
    };

    sendRequest.post({url: uploadUrl, formData: formData}, (err, res, bod) => {
        console.log('errors: ' + JSON.stringify(err));
        console.log('response: ' + JSON.stringify(res));
        console.log('body: ' + JSON.stringify(bod));
    });
    
    response.end('OK');
}).listen(3000)