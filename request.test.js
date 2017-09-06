
describe('Request test.', () => {

  const request = require('./request.js');

  test('Should return the right response from mock api server.', () => {
    const API_URL = "https://reqres.in/api/users";
    const data = {
      name: "jincheng",
      job: "Software Engineer"
    };

    const expect_result = expect.objectContaining({
      name: "jincheng",
      job: 'Software Engineer',
      id: expect.any(String),
      createdAt: expect.any(String)
    });

    return expect(request(API_URL, data)).resolves.toEqual(expect_result);
    
  });


  




});