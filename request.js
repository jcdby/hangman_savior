let https = require('https');


  request(url, data){
    let options = {
      protocol: "https",
      hostname: "strikingly-hangman.herokuapp.com",
      path: "/game/on",
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    }



  }