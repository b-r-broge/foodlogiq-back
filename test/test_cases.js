const assert = require("assert");
const request = require("supertest");
const app = require('../app');

const Applicant = require('../models/Applicant')

describe('POST /api/answer', function () {
  before('reset the test database', function(done) {
    Applicant.deleteMany({}).then(function() {
      return done();
    });
  });

  it('Should add test response to the collection', function(done) {
    request(app).post('/api/answer')
      .send({
        "name": "TESTING",
        "coolProb": "this is a test coolProblem",
        "designDesc": "this is a test description",
        "dreamEnv": "this is a test dream"
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect({
        "success": true,
        "new": "TESTING"
      })
      .end(done)
  });
  it('Should return the test answer', function(done) {
    request(app).get('/api/response')
    .expect(200)
    .expect({
      "success": true,
      "responses": [
        {
          "name": "TESTING",
          "coolProb": "this is a test coolProblem",
          "designDesc": "this is a test description",
          "dreamEnv": "this is a test dream"
        }
      ]
    })
    .end(done)
  })
  it('Should verify there is one record in the collection', function (done) {
    Applicant.count({})
    .then(function(num) {
      assert.equal(num, 1);
      done();
    })
  })
})
