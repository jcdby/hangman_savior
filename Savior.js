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
    if(arguments.length === 0 || !path ){
      throw Error('You should input a path!');
    }
    if(arguments.length === 1 && typeof path === 'string') {
      path = path.trim();
    }else{
      throw new Error('The path should be String!');
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

  updateDictByWordLength(old_dict, word_length) {
    if(!Array.isArray(old_dict)){
      throw new Error('First parameter should be a array!')
    }
    if(arguments.length === 2 && typeof word_length !== 'number'){
      throw new Error('Second parameter should be a number!');
    }

    let new_dict = []
    old_dict.forEach((el) => {
      if(el.length === word_length){
        new_dict.push(el);
      }
    })

    return new_dict;
  }

  updateDictByLetter(old_dict, letter, position){
    if(!Array.isArray(old_dict)){
      throw new Error('First parameter should be a array!');
    }
    if(arguments.length === 2 && typeof letter !== 'string'){
      throw new Error('Second parameter should be a string');
    }
    if(arguments.length === 3 && typeof position !== 'number'){
      throw new Error('The Third parameter should be a number');
    }
    let new_dict = [];
    new_dict = old_dict.filter((el) => {
      return !el.includes(letter);
    })
    return new_dict;
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
