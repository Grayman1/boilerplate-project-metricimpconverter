const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

// getNum, getUnit, getReturnUnit, spellOutUnit, getString

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('function convertHandler.getNum(input)', () => {
    // test whole number input
    test('whole number input', (done) => {
      var input = '12L';
      assert.equal(convertHandler.getNum(input), 12);
      done();
    })

    test('Decimal number input', (done) => {
      var input = '6.55km';
      assert.equal(convertHandler.getNum(input), 6.55);
      done();
    })

    test('fractional input', (done) => {
      var input = '3/8L';
      assert.equal(convertHandler.getNum(input), 0.375);
      done();
    })

    test('fractional input w/decimal', (done) => {
      var input = '32.75/2L';
      assert.equal(convertHandler.getNum(input), 16.375);
      done();
    })

    test('invalid input (double fraction)', (done) => {
      var input = '3/4.2/4';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();

    })

    test('no numerical input', (done) => {
      var input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), 'L');
      done();
    })
  })

  suite('function convertHandler.getUnit(input)', () => {

    test('for each valid unit Inputs', (done) => {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'GAL', 'L', 'MI', 'KM', 'kg', 'LBS', 'KG'];
      input.forEach((ele) =>{
        assert.equal(convertHandler.getUnit(32 + ele), ele);
        done();
      })
      
    })

    test('Unknown Unit Input', (done) => {
      let input = '32gm';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    })
  })

  suite('function convertHandler.getReturnUnit(initUnit)', () => {
    // test whole number input
    test('for each valid unit inputs', (done) => {
      var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      var expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((ele, i) =>{
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);        
      })
      done();
    })
  })

  suite('function convertHandler.spellOutUnit(Unit)', () => {
    test('For Each Valid Unit Inputs', (done) => {
      // see above example for hint
      let input = ['gal','l', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallon(s)', 'liter(s)', 'mile(s)', 'kilometer(s)', 'pound(s)', 'kilogram(s)']
      input.forEach((ele, i) =>{
        // assert
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      })
      done();
    })

  })

  suite('function convertHandler.convert(num, unit)', () => {
    test('gal to L', (done) => {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
      done();
    })

    test('L to gal', (done) => {
      var input = [15, 'L'];
      var expected = 3.963;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
      done();
    })

    test('mi to km', (done) => {
      var input = [5, 'mi'];
      var expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
      done();
    })

    test('km to mi', (done) => {
      var input = [10, 'km'];
      var expected = 6.2137;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
      done();
    })

    test('lbs to kg', (done) => {
      var input = [10, 'lbs'];
      var expected = 4.5359;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
      done();
    })

    test('kg to lbs', (done) => {
      var input = [5, 'kg'];
      var expected = 11.0231;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); // 0.1 tolerance
      done();
    })



  })





});