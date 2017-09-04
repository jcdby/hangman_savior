let https = require('https');

function request(data){
    let json_data = JSON.stringify(data);
    let options = {
      protocol: "https:",
      hostname: "strikingly-hangman.herokuapp.com",
      path: "/game/on",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(json_data)
      }
    }


    return new Promise(function(resolve, reject){
      let req = https.request(options,(res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.info(chunk);
          resolve(JSON.parse(chunk));
        });
      });

      req.on('error', (e) => {
        reject(`problem with request: ${e.message}`);
      });
      req.write(json_data);
      req.end();    
    })
}

module.exports = request;

