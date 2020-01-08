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

        it('h1 on different levels', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h1" } },
                    {
                        "block": "card",
                        "content": [
                            {
                                "block": "form",
                                "content": [
                                    { "block": "text", "mods": { "type": "h1" } }
                                ]
                            }
                        ]
                    }
                    
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.SEVERAL_H1",
                    "error": "Заголовок первого уровня должен быть единственным на странице",
                    "location": {
                        "start": { "column": 37, "line": 11 },
                        "end": { "column": 82, "line": 11 }
                    }
                }
            ]);
        }) /* it */

        it('2 nested h1', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    {
                        "block": "card",
                        "content": [
                            {
                                "block": "form",
                                "content": [
                                    { "block": "text", "mods": { "type": "h1" } }
                                ]
                            }
                        ]
                    },
                    {
                        "block": "card",
                        "content": 
                            { "block": "text", "mods": { "type": "h1" } }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "TEXT.SEVERAL_H1",
                    "error": "Заголовок первого уровня должен быть единственным на странице",
                    "location": {
                        "start": { "column": 29, "line": 18 },
                        "end": { "column": 74, "line": 18 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */
    
    describe('VALID', () => {
       
        it('no sequential h1', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text" },
                    { "block": "text", "mods": { "type": "h1" } },
                    { "block": "text", "mods": { "type": "h4" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Single h1 and nested h4', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h1" } },
                    {
                        "block": "card",
                        "content": [
                            {
                                "block": "form",
                                "content": [
                                    { "block": "text", "mods": { "type": "h4" } }
                                ]
                            }
                        ]
                    }
                    
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Single h4 and nested h1', () => {
            const inputJson = `{
                "block": "page",
                "content": [
                    { "block": "text", "mods": { "type": "h4" } },
                    {
                        "block": "card",
                        "content": [
                            {
                                "block": "form",
                                "content": [
                                    { "block": "text", "mods": { "type": "h1" } }
                                ]
                            }
                        ]
                    }
                    
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */  
        
}) /* describe: TEXT.SEVERAL_H1 */
