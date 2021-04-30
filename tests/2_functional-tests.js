
// WORKING TESTS
const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite("GET /api/convert => conversion object", () => {
// Functional Test #1. Convert a valid input such as 10L: GET request to /api/convert.    
    test("#1 - Convert a valid input", done => {
      chai.request(server)
      .get("/api/convert")
      .query({input: "10L"})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        
      });
      done();
    });

// Functional Test #2. Convert an invalid input such as 32g: GET request to /api/convert.    
    test("#2 - Convert an invalid input", done => {
      chai.request(server)
      .get("/api/convert")
      .query({input: "320mg"})
      .end((err, res) => {
        assert.equal(res.body, "invalid unit");        
      });
      done();
    });

// Functional Test #3. Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.    
    test("#3 - Convert an invalid number", done => {
      chai.request(server)
      .get("/api/convert")
      .query({input: "3/7.2/4kg"})
      .end((err, res) => {
        assert.equal(res.body, "invalid number");        
      });
      done();
    });

// Functional Test #4. Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.    
    test("#4 - Convert an invalid number AND unit", done => {
      chai.request(server)
      .get("/api/convert")
      .query({input: "3/7.2/4megazilogram"})
      .end((err, res) => {
        assert.equal(res.body, "invalid number and unit");        
      });
      done();
    });

// Functional Test #5. Convert with no number such as kg: GET request to /api/convert.    
    test("#5 - Convert with no number", done => {
      chai.request(server)
      .get("/api/convert")
      .query({input: "kg"})
      .end((err, res) => {
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
      });
      done();
    });
    
  });
  
});

