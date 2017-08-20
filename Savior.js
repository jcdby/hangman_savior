let fs = require('fs');

class Savior {

  constructor(saviorId) {
    this.saviorId = saviorId;
    this.myKnowledge = {};
  }


  request(data){
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


  learnEnglish(path) {
    if(arguments.length === 1) {
      path = path.trim();
    }
    if(arguments.length === 0 || !path ){
      throw Error('error');
    }
    if(!fs.existsSync(path)){
      throw new Error('file not existed!');
    }




    this.myKnowledge = {
      dict: {},
      lettersFreq: [],
      backupFreq: []
    }
  }


  getKnowledge() {
    return this.myKnowledge;
  }


  

  getSaviorId() {
    return this.saviorId;
  }


  startGame(){

  }

  getWord(){

  }

  makeGuess(){

  }

  getResult(){

  }

  submitResult(){

  }

}

module.exports = Savior
