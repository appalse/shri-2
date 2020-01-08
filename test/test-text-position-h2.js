var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('TEXT.INVALID_H2_POSITION', () => {

    describe('INVALID', () => {
       
        it('h2 before h1', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h2" } },
                    { "block": "text", "mods": { "type": "h1" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.INVALID_H2_POSITION",
                    "error": "Заголовок второго уровня не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 21, "line": 4 },
                        "end": { "column": 66, "line": 4 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */
    
    describe('VALID', () => {
       
        it('h1 before h2', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h1" } },
                    { "block": "text", "mods": { "type": "h2" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */
        
}) /* describe: TEXT.INVALID_H2_POSITION */
