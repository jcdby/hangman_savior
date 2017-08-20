class Savior {

  constructor(saviorId) {
    this.saviorId = saviorId;
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
