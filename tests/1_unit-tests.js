// WORKING Tests
const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("function convertHandler.getNum(input)", () => {
// Unit Test #1. convertHandler should correctly read a whole number input.
    test("#1 - whole number input", done => {
      var input = "42L";
      assert.equal(convertHandler.getNum(input), 42);
      done();
    });
// Unit Test #2. convertHandler should correctly read a decimal number input.
    test("#2 - decimal number input", done => {
      var input = "6.625L";
      assert.equal(convertHandler.getNum(input), 6.625);
      done();
    });
// Unit Test #3. convertHandler should correctly read a fractional input.
    test("#3 - fractional input", done => {
      var input = "6/2mi";
      assert.equal(convertHandler.getNum(input), 6 / 2);
      done();
    });
// Unit Test #4. convertHandler should correctly read a fractional input with a decimal.
    test("#4 - fractional input with a decimal", done => {
      var input = "32.75/2km";
      assert.equal(convertHandler.getNum(input), 16.375);
      done();
    });

// Unit Test #5. convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
    test("#5 - error on a double-fraction", done => {
      var input = "6/2.5/3L";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

// Unit Test #6. convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
    test("#6 - no numeric input - default to a numerical input of 1", done => {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), 'kg');
   done();
   })
  })


 suite("function convertHandler.getUnit(input)", () => {
// Unit Test #7. convertHandler should correctly read each valid input unit.    
    test("#7 - valid input unit", done => {
      var input = [
        "gal", "GAL", "l", "L", "mi", "MI", "km", "KM", "kg", "KG", "lbs", "LBS"
      ];
      var output = [
        "gal", "gal", "L",
        "L", "mi", "mi", "km", "km",
        "kg", "kg", "lbs", "lbs"
      ];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getUnit(ele), output[i]);
      });
      done();
    });

// Unit Test #8. convertHandler should correctly return an error for an invalid input unit.
    test("#8 - return an error for an invalid input unit", done => {
      var input = ["20millileters", "21.5kilograms"];
      input.forEach(ele => {
        assert.equal(convertHandler.getUnit(ele), "invalid unit");
      });
      done();
    });
  });

  suite("function convertHandler.getReturnUnit(initUnit)", () => {
// Unit Test #9. convertHandler should return the correct return unit for each valid input unit.    
    test("#9 - return the correct return unit for each valid input unit", done => {
      var input = ["gal", "L", "mi", "km", "kg", "lbs"];
      var returnUnit = ["L", "gal", "km", "mi", "lbs", "kg"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), returnUnit[i]);
      });
      done();
    });
  });

  suite("function convertHandler.spellOutUnit(unit)", () => {
// Unit Test #10. convertHandler should correctly return the spelled-out string unit for each valid input unit.    
    test("#10 - return the spelled-out string unit for each valid input unit", done => {
      var shortUnit = ["gal", "L", "km", "mi", "lbs", "kg"];
      var fullUnit = [
        "gallons",
        "litres",
        "kilometers",
        "miles",
        "pounds",
        "kilograms"
      ];
      shortUnit.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), fullUnit[i]);
      });
      done();
    });

  });

  suite("#11 - function convertHandler.convert(initNum, initUnit)", () => {
// Unit Test #11. convertHandler should correctly convert gal to L.    
    test("convert gal to L", done => {
      var input = [5, "gal"];
      var expected = 18.92705;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("#12 - convert L to gal", done => {
// Unit Test #12. convertHandler should correctly convert L to gal.      
      var input = [6, "L"];
      var expected = 1.58503;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
// Unit Test #13. convertHandler should correctly convert mi to km.
    test("#13 - convert mi to km", done => {
      var input = [5, "mi"];
      var expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
// Unit Test #14. convertHandler should correctly convert km to mi.
    test("#14 - convert km to mi", done => {
      var input = [4.1, "km"];
      var expected = 2.54763;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
// Unit Test #15. convertHandler should correctly convert lbs to kg.
    test("#15 - convert lbs to kg", done => {
      var input = [10, "lbs"];
      var expected = 4.5359;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
// Unit Test #16. convertHandler should correctly convert kg to lbs.
    test("#16 - convert kg to lbs", done => {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});

