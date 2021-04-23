// RegEx expression for Stacker Overflow 40648145 javascript regext to split numbers and letters

let inputRegex = /[a-z]+|[^a-z]+/gi

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    result = input.match(inputRegex)[0]

    // Check if no input number
    let numRegex = /\d/
    if (numRegex.test(result) === false) {
      result = 1
    }

    if(result.toString().includes('/')) {
      var values = result.toString().split('/')
      if(values.length !=2) {
        return 'invalid number'
      }
      values[0]= parseFloat(values[0])
      values[1]= parseFloat(values[1])
      result = parseFloat((values[0]/values[1]).toFixed(5))
    }

    if(isNaN(result)) {
      result = 'invalid number'
    }
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    let result;
    let units;
    
    units = input.match(inputRegex)[1];

    if(!units) {
      units = input.match(inputRegex)[0]
    }

    var validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];

    if(validUnits.includes(units)) {
      if(units === 'l' || units === 'L') {
      result = 'L';
      } else {result = units.toLowerCase();
      } 
    } else {
      result = 'invalid unit'      
    }
    return result;
  };
  
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

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case "km":
      case "KM":
        result = "kilometer(s)";
        break;
      case "gal":
      case "GAL":
        result = "gallon(s)";
        break;
      case "l":
      case "L":
        result = "liter(s)";
        break;
      case "lbs":
      case "LBS":
        result = "pound(s)";
        break;
      case "kg":
      case "KG":
        result = "kilogram(s)";
        break;
      case "mi":
      case "MI":
        result = "mile(s)";
        break;
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    if(initUnit === 'gal' || initUnit === 'GAL') {
      // Convert GALLONS to LITERS
      result = (initNum * galToL).toFixed(5)
    } else if(initUnit === 'l' || initUnit === 'L') {
      // Convert LITERS to GALLONS 
      result = (initNum / galToL).toFixed(5)
    }

    if(initUnit === 'km' || initUnit === 'KM') {
      // Convert KM to MILES
      result = (initNum / miToKm).toFixed(5)
    } else if(initUnit === 'mi' || initUnit === 'MI') {
      // Convert MILES to KM
      result = (initNum * miToKm).toFixed(5)
    }

    if(initUnit === 'lbs' || initUnit === 'LBS') {
      // Convert POUNDS to KG
      result = (initNum * lbsToKg).toFixed(5)
    } else if(initUnit === 'kg' || initUnit === 'KG') {
      // Convert KG to POUNDS
      result = (initNum / lbsToKg).toFixed(5)
    }

    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' +  returnNum+ ' ' + this.spellOutUnit(returnUnit);
    
    //result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' +  this.spellOutUnit(returnUnit);
    return result;
  };
  
}
module.exports = ConvertHandler;
