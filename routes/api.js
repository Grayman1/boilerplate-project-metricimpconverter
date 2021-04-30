"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  let convertHandler = new ConvertHandler();

    app.route('/api/convert')
    .get( (req, res) =>{
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var initUnitString = convertHandler.spellOutUnit(initUnit);
      var returnUnitString = convertHandler.spellOutUnit(returnUnit);

      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      // FOR TESTING PURPOSES ONLY:
//    console.log("initNum: ", initNum, typeof(initNum), "initUnit: ", initUnit, typeof(initUnit),"returnNum: ", returnNum, typeof(returnNum),"returnUnit: ", returnUnit, typeof(returnUnit),"toString: ", toString, typeof(toString));


      if(initUnit === 'invalid unit' && initNum === 'invalid number') {
       // USER STORY #9
        res.json('invalid number and unit')
      } else if(initUnit === 'invalid unit') {
        // USER STORY #7
        res.json('invalid unit')
      } else if(initNum === 'invalid number') {
        // USER STORY #8
        res.json('invalid number')
      }     



      // USER STORY #10 RETURN RESPONSE OBJECT
      let resObject = {}
      resObject['initNum'] = initNum
      resObject['initUnit'] = initUnit 
      resObject['returnNum'] = returnNum 
      resObject['returnUnit'] = returnUnit 
      resObject['string'] = toString 

      res.json(resObject)

    })
};