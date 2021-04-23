'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get( (req, res) =>{
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      if(initUnit === 'invalid unit' && initNum === 'invalid number') {
        res.json('invalid number and unit')
      } else if(initUnit === 'invalid unit') {
        res.json('invalid unit')
      } else if(initNum === 'invalid number') {
        res.json('invalid number')
      }     


      let responseObject = {}
      responseObject['initNum'] = initNum
      responseObject['initUnit'] = initUnit 
      responseObject['returnNum'] = returnNum 
      responseObject['returnUnit'] = returnUnit 
      responseObject['string'] = toString 

      res.json(responseObject)

    })


};
