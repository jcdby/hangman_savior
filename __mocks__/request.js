let valid_player = 'jcdby@hotmail.com';
let sessionId = "rightSessionID";
let wordToGuess = '******';
let totalWordCount = 0;
let actions_correct_msg = {
  startGame: {
    message: "THE GAME IS ON",
    sessionId: sessionId,
    data: {
        numberOfWordsToGuess: 80,
        numberOfGuessAllowedForEachWord: 10
    }
  },
  nextWord: {
    sessionId: 'rightSessionID',
    data: {
      word: wordToGuess,
      totalWordCount: 0,
      wrongGuessCountOfCurrentWord: 0

    }
  }
};

let actions_exception_msg = {
  startGame: {
    message: 'Player does not exist'
  },
  nextWord: {
    message: 'Game session does not exist'
  }
}


function asyncFunc(cb) {
  setTimeout(function() {
    cb();
  }, 10);
}


function request(data) {
  return new Promise(function(resolve,reject){
    let action = data.action;
    let result = '';
    switch (action) {
      case 'startGame':
        let player = data.playerID;
        if(player === valid_player) {
          result = actions_correct_msg[action];
        }else {
          result = actions_exception_msg[action];
        }      
        break;
      case 'nextWord':
        totalWordCount++;
        if(sessionId === data.sessionId && totalWordCount <= 80){
          actions_correct_msg[action].data.totalWordCount = totalWordCount;
          result = actions_correct_msg[action];
        }else if(sessionId !== data.sessionId) {
          result = actions_exception_msg[action];
        }else {
          result = {message: 'No more word to guess.'}
        }
        break;
      default:
        break;
    }
    asyncFunc(resolve(result));

  })
}


module.exports = request;