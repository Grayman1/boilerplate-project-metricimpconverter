// RegEx expression for Stacker Overflow 40648145 javascript regext to split numbers and letters
let inputRegex = /[a-z]+|[^a-z]+/gi;
let numberRegex = /\d/;

function ConvertHandler() {


//   >>>>   WORKING GETNUM FUNCTION   <<<<

  this.getNum = function(input) {
    let result;

    const separatedInput = input.match(inputRegex);

    if (separatedInput.length === 1) {
      result = 1;
    } else {
      result = separatedInput[0];

      if (result.match(/[a-z]+|\s/g)) {
        return "invalid number";
      }

      if (result.match(/\.+\d*\.+|\/\.|\.\/|^\/$/gi)) {
        result = "invalid number";
      } else if (result.match(/^\./g)) {
        result = 0 + result;
      } else if (result.match(/\.$/g)) {
        result = result.replace(/\.$/, "");
      } //

      if (result.includes("/")) {
        const value = result.split("/");
        
        // CHECK FOR NUMERATOR, DENOMINATOR
        if (value.length !== 2) {
          return "invalid number";
        } else {
          result = (value[0] / value[1]).toFixed(5);
        }
      }
    }
    result = Number(result);
    // CHECK IF NUMBER INPUT IS 0
    if (result == 0) {
      return "invalid number";
    }
    // CHECK IF INPUT FIELD IS NOT BLANK AND NOT A NUMBER
    if (isNaN(result)) {
      return "invalid number";
    }
    // FOR TESTING PURPOSES ONLY:
//    console.log('getNum', result);
    return result;
  };


//   >>>>>   WORKING GETUNIT CODE     <<<<<<

  this.getNum = function(input) {
    var result;
    
    result = input.match(inputRegex)[0]
    
    let numberRegex = /\d/
    
    if(numberRegex.test(result) === false){
      result = 1
    }
    
    if(result.toString().includes('/')){
      let values = result.toString().split('/')
      if(values.length != 2){
        return 'invalid number'
      }
      values[0] = parseFloat(values[0])
      values[1] = parseFloat(values[1])
      result = parseFloat((values[0]/values[1]).toFixed(5)) 
    }

    if(isNaN(result)){
      return 'invalid number'
    }
    
    return parseFloat(result);
  };

  this.getUnit = function(input) {
    var result;
    
    result = input.match(inputRegex)[1]
    
    if(!result){
      result = input.match(inputRegex)[0]
    }
    
    let validUnits = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG']
    
    if(!validUnits.includes(result)){
      return 'invalid unit'
    }

    result = result.toLowerCase();

    if(result == 'l') {
      result = "L"
    }
    
    return result;
  };


// >>>>>>   WORKING GETRETURNUNIT FUNCTION   <<<<<<

  this.getReturnUnit = function(initUnit) {
    let result;
    
    if(initUnit === 'gal' || initUnit === 'GAL') {
      result = 'L'
    } else if(initUnit === 'l' || initUnit === 'L') {
      result = 'gal'
    }

    if(initUnit === 'lbs' || initUnit === 'LBS') {
      result = 'kg'
    } else if(initUnit === 'kg' || initUnit === 'KG') {
      result = 'lbs'
    }

    if(initUnit === 'mi' || initUnit === 'MI') {
      result = 'km'
    } else if(initUnit === 'km' || initUnit === 'KM') {
      result = 'mi'
    }
    // FOR TESTING PURPOSES ONLY:
//    console.log('initUnit: ',initUnit, 'returnUnit: ', result);
    return result;
  };




//  >>>>>    WORKING SPELLOUTUNIT FUNCTION   <<<<
  this.spellOutUnit = function(unit) {
    let result;
    const shortUnit = ["gal", "L", "km", "mi", "lbs", "kg"];
    const fullUnit = [
      "gallons",
      "litres",
      "kilometers",
      "miles",
      "pounds",
      "kilograms"
    ];

    if (shortUnit.includes(unit)) {
      let fullUnitIndex = shortUnit.indexOf(unit);
      result = fullUnit[fullUnitIndex];
    }
    // FOR TESTING PURPOSES ONLY:
//    console.log("spellOutUnit: ", result);
    return result;
  };


  //   >>>>>   WORKING CONVERT FUNCTION   <<<<<<
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;


    switch (initUnit) {
      case "gal":
        result = (initNum * galToL).toFixed(5);
        break;
      case "L":
        result = (initNum / galToL).toFixed(5);
        break;
      case "lbs":
        result = (initNum * lbsToKg).toFixed(5);
        break;
      case "kg":
        result = (initNum / lbsToKg).toFixed(5);
        break;
      case "mi":
        result = (initNum * miToKm).toFixed(5);
        break;
      case "km":
        result = (initNum / miToKm).toFixed(5);
    }

    result = Number(result);
    // FOR TESTING PURPOSES ONLY:
//    console.log('convert: ', result);
    return result;
  };


//  >>>>>>  WORKING GETSTRING FUNCTION    <<<<<<
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
        
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    // FOR TESTING PURPOSES ONLY:
//    console.log('getString', result);
    return result;
  };


/*
//  >>>>>>  ALTERNATIVE WORKING GETSTRING FUNCTION    <<<<<<
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);

    // FOR TESTING PURPOSES ONLY:
    console.log('getString', result);
    return result;
*/


}

module.exports = ConvertHandler;
