var lint = require('./../build/linter.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Simple input', () => {
    it('empty input', () => {        
        const result = lint('');
        expect(result).to.be.an('array').that.is.empty;
    })
});
