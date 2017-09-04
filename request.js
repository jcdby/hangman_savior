let http = require('http');

function request(data){
    let json_data = JSON.stringify(data);

    let options = {
      protocol: "http:",
      hostname: "strikingly-hangman.herokuapp.com",
      path: "/game/on",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Content-Length": Buffer.byteLength(json_data)
      }
    }


    return new Promise(function(resolve, reject){
      let req = http.request(options,(res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          try {
            console.info(chunk);
            chunk = JSON.parse(chunk);
            resolve(chunk);
          }catch(e){
            resolve({message:'No more guess left'});
          }
        });
      });

      req.on('error', (e) => {
        reject(`problem with request: ${e.message}`);
      });
      console.info(`request is ${json_data}`)
      req.write(json_data);
      req.end();    
    })
}

module.exports = request;

