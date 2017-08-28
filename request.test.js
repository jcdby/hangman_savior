
describe('Request test.', () => {

  jest.mock('./request.js');//需要实际网络通信测试时，可以注释掉jestmock
  let sessionId = '';
  let request = require('./request.js');

  test('Should return not_exist response when player ID does not exist. ', () => {
    let request = require('./request');
    let data = {
      playerID: 'test@example.com',
      action: 'startGame'
    };
    let expect_result = {
      message: 'Player does not exist'
    };
    return expect(request(data)).resolves.toEqual(expect_result);
  });

  test('Should get right response when request to start game.', () => {
    let request = require('./request.js');

    let data = {
      playerID: 'jcdby@hotmail.com',
      action: 'startGame'
    }

    return request(data)
            .then(res => {
              sessionId = res.sessionId;
              expect(res).toEqual(expect.objectContaining({
                message: "THE GAME IS ON",
                sessionId: expect.any(String),
                data: {
                  numberOfWordsToGuess: expect.any(Number),
                  numberOfGuessAllowedForEachWord: expect.any(Number)
                }
              }));
            });
  });

  test('Should get the word info when action is guessWord if the session ID is correct.', () => {
    let data = {
      sessionId: sessionId,
      action: 'nextWord'
    }

    
    return request(data)
            .then(res => {
              expect(res).toEqual(expect.objectContaining({
                sessionId: expect.any(String),
                data: {
                  word: expect.any(String),
                  totalWordCount: expect.any(Number),
                  wrongGuessCountOfCurrentWord: expect.any(Number)
                }
              }))
            });
  });


  test('Should get the error message when session id is wrong', () => {
    let data = {
      sessionId: 'wrongsessionid',
      action: 'nextWord'
    };

    let expect_result = {
      message: 'Game session does not exist'
    };

    return request(data)
            .then(res => {
              expect(res).toEqual(expect_result);  
            });
  });

  test('Shold get the error message when there is no more word to guess.', () => {
    
  });


});