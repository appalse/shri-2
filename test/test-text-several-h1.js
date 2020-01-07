var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('TEXT.SEVERAL_H1', () => {


    describe('INVALID', () => {
       
        it('2 sequential h1', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h1" } },
                    { "block": "text", "mods": { "type": "h1" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.SEVERAL_H1",
                    "error": "Заголовок первого уровня должен быть единственным на странице",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 66, "line": 5 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: TEXT.SEVERAL_H1 */               
        
}) /* describe: TEXT */
