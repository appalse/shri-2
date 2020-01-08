var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('TEXT.INVALID_H3_POSITION', () => {

    describe('INVALID', () => {
       
        it('h3 before h2', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h3", "size": "s" } },
                    { "block": "text", "mods": { "type": "h2", "size": "s" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.INVALID_H3_POSITION",
                    "error": "Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 21, "line": 4 },
                        "end": { "column": 66, "line": 4 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */
    
    describe('VALID', () => {
       
        it('h2 before h3', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h2", "size": "s" } },
                    { "block": "text", "mods": { "type": "h3", "size": "s" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */
        
}) /* describe: TEXT.INVALID_H3_POSITION */
