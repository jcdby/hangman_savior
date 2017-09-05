
describe('Request test.', () => {

  let sessionId = '';
  let request = require('./request.js');

  test('Should return json from server.', () => {
  let data = {
      playerID: 'test@example.com',
      action: 'startGame'
    };
    let expect_result = {
      message: 'Player does not exist'
    };
    return expect(request(data)).resolves.toEqual(expect_result);
  })




});