const https = require('https');
const fs = require('fs');
const Console = require('console').Console;

const output = fs.createWriteStream('./stdout_request.log');
const errorOutput = fs.createWriteStream('./stderr_request.log');
const logger = new Console(output, errorOutput);


function request(data){
    let json_data = JSON.stringify(data);

    let options = {
      protocol: "https:",
      hostname: "strikingly-hangman.herokuapp.com",
      path: "/game/on",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Content-Length": Buffer.byteLength(json_data)
      }
    }


    return new Promise(function(resolve, reject){
      let req = https.request(options,(res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          //when trying to make a guess and the guess is wrong, it should return a json including a message that shows "No more guess left",but always return a HTML response. 
          try {
            chunk = JSON.parse(chunk);
            logger.info(chunk);
            resolve(chunk);
          }catch(e){
            logger.info({message:'No more guess left'});
            resolve({message:'No more guess left'});
          }
        });
      });

      req.on('error', (e) => {
        reject(`problem with request: ${e.message}`);
      });
      console.info(`request is ${json_data}`)
      logger.info(`request is ${json_data}`)
      req.write(json_data);
      req.end();    
    })
}

module.exports = request;

