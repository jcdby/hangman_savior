
describe('Request test.', () => {
  test('Should return right response from sever when using real request', () => {
    let request = require('./request');
    let data = {
      playerID: 'test@example.com',
      action: 'startGame'
    };
    let expect_result = {
      message: 'Player does not exist'
    };
    expect(request(data)).resolves.toEqual(expect_result);
  })
  ;
  test('Should get right response when request to start game.', () => {
    expect(request(correct_data)).resolves.toEqual(correct_expect_result);
  });

});