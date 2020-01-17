var lint = require('./../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('Simple input', () => {
    it('empty input', () => {        
        const result = lint('');
        expect(result).to.be.an('array').that.is.empty;
    })

    it('empty object', () => {        
        const result = lint('{}');
        expect(result).to.be.an('array').that.is.empty;
    })

    it('empty warning', () => {        
        const result = lint('{ "block": "warning"}');
        expect(result).to.be.an('array').that.is.empty;
    })
});
