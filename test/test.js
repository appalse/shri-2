var lint = require('./../build/linter.js');
console.log(typeof lint);
console.log(lint);
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('First test', () => {
    it('some text', () => {
        const json = `{
            "block": "warning",
            "content": [
                {
                    "block": "placeholder",
                    "mods": { "size": "m" }
                },
                {
                    "elem": "content",
                    "content": [
                        {
                            "block": "text",
                            "mods": { "size": "m" }
                        },
                        {
                            "block": "text",
                            "mods": { "size": "l" }
                        }
                    ]
                }
            ]
        }`;
        const result = lint(json);
        expect(result).to.be.an('array');
        expect(result).to.equal([]);
    }) 
})
