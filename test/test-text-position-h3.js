var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('TEXT.INVALID_H3_POSITION', () => {

    describe('INVALID', () => {

        it('Input array as in example', () => {
            const inputJson = `[
                {
                    "block": "text",
                    "mods": { "type": "h3" }
                },
                {
                    "block": "text",
                    "mods": { "type": "h2" }
                }
            ]`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.INVALID_H3_POSITION",
                    "error": "Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 17, "line": 2 },
                        "end": { "column": 18, "line": 5 }
                    }
                }
            ]);
        }) /* it */
       
        it('h3 before h2', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h3" } },
                    { "block": "text", "mods": { "type": "h2" } }
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

        it('Nested h3 before h2', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { 
                        "block": "card",
                        "content": [
                            { "block": "text", "mods": { "type": "h3" } }        
                        ] 
                    },
                    { "block": "text", "mods": { "type": "h2" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.INVALID_H3_POSITION",
                    "error": "Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 29, "line": 7 },
                        "end": { "column": 74, "line": 7 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */
    
    describe('VALID', () => {

        it('Input array as in example', () => {
            const inputJson = `[
                {
                    "block": "text",
                    "mods": { "type": "h2" }
                },
                {
                    "block": "text",
                    "mods": { "type": "h3" }
                }
            ]`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */
       
        it('h2 before h3', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h2" } },
                    { "block": "text", "mods": { "type": "h3" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('h2 before nested h3', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { 
                        "block": "text", 
                        "mods": { "type": "h2" },
                        "content": [
                            { "block": "text", "mods": { "type": "h2" } }        
                        ]
                    },
                    { "block": "text", "mods": { "type": "h3" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('h2 before nested internal h3', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { 
                        "block": "text", 
                        "mods": { "type": "h2" },
                        "content": [
                            { "block": "text", "mods": { "type": "h3" } }        
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */
        
}) /* describe: TEXT.INVALID_H3_POSITION */
