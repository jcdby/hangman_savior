let request = require('./request');

describe('Request test.', () => {
  test('Should get right response when request to start game.', () => {
    let url = "https://strikingly-hangman.herokuapp.com/game/on";
    let data = {
      "playerId": "test@example.com",
      "action" : "startGame"
    };

    let expect_result = {
      message: "Player does not exist"
    }

    

  })
});