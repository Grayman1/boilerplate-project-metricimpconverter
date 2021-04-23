const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', () => {

    suite('GET /api/convert => conversion object', () => {
    // TEST #1 - VALID INPUT
      test('Convert 10L (valid input)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '10L'})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.initNum, 10);
            assert.equal(res.body.initUnit, 'L');
            assert.approximately(res.body.returnNum, 2.64172, 0.1);
            assert.equal(res.body.returnUnit, 'gal');
            
          })
          done();
      })
      // TEST #2 CONVERT AN INVALID INPUT SUCH AS 32g
      test('Convert 32g (invalid input unit)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '32g'})
          .end((err, res) => {
            assert.equal(res.body, 'invalid unit');
          })
          done();
      })
      // TEST #3 CONVERT AN INVALID NUMBER SUCH AS 3/7.2/4KG
      test('Convert 3/7.2/7kg (invalid number)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/7kg'})
          .end((err, res) => {
            assert.equal(res.body, 'invalid number');
          })
          done();
      });

      // TEST #4 CONVERT AN INVALID NUMBER AND UNIT SUCH AS 3/7.2/4kilomegagram
      test('Convert 3/7.2/7kilomegagram (invalid number and unit)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/7kilomegagram'})
          .end((err, res) => {
            assert.equal(res.body, 'invalid number and unit');
          })
          done();
      })
    // TEST #5 CONVERT WITH NO NUMBER SUCH AS KG
      test('Convert kg (no number)', (done) => {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'kg'})
          .end((err, res) => {
            assert.equal(res.body.initNum, 1);
            assert.equal(res.body.initUnit, 'kg');
          })
          done();
      })
    })  
  })
});