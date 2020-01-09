var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;


describe('WARNING.INVALID_BUTTON_POSITION', () => {

    describe('INVALID', () => {

        it('Button before placeholder on the same level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { "block": "button", "mods": { "size": "m" } },
                    { "block": "placeholder", "mods": { "size": "m" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 67, "line": 5 }
                    }
                }
            ]);
        }) /* it */ 

        it('Button before placeholder on deeper level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "button", 
                            "mods": { "size": "m" }
                        }
                    },
                    { 
                        "block": "placeholder", 
                        "mods": { "size": "m" } 
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 36, "line": 7 },
                        "end": { "column": 26, "line": 10 }
                    }
                }
            ]);
        }) /* it */ 

        it('2 buttons before placeholder, both on deeper levels', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "some-deeper-block",
                        "content": [
                            { "block": "button", "mods": { "size": "m" } },
                            { "block": "button", "mods": { "size": "m" } }
                        ]
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "placeholder", 
                            "mods": { "size": "m" }
                        }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 29, "line": 8 },
                        "end": { "column": 75, "line": 8 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 29, "line": 9 },
                        "end": { "column": 75, "line": 9 }
                    }
                }
            ]);
        }) /* it */ 

        it('2 buttons before 2 placeholders', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "some-deeper-block",
                        "content": [
                            { "block": "button", "mods": { "size": "m" } }
                        ]
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "placeholder", 
                            "mods": { "size": "m" }
                        }
                    },
                    { "block": "button", "mods": { "size": "m" } },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "placeholder", 
                            "mods": { "size": "m" }
                        }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 29, "line": 8 },
                        "end": { "column": 75, "line": 8 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 21, "line": 18 },
                        "end": { "column": 67, "line": 18 }
                    }
                }
            ]);
        }) /* it */ 

        it('Button before placeholder in one nested block', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "button",
                        "mods": { "size": "m" },
                        "content": [
                            { "block": "placeholder", "mods": { "size": "m" } }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 22, "line": 11 }
                    }
                }
            ]);
        }) /* it */ 

        it('Button before placeholder in block__elem items', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "warning",
                        "elem": "button-wrapper",
                        "content": [
                            {
                                "block": "button", 
                                "mods": { "size": "m" }
                            }
                        ]
                    },
                    {
                        "block": "warning",
                        "elem": "content",
                        "content": [
                            { 
                                "block": "placeholder", 
                                "mods": { "size": "m" } 
                            }         
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 29, "line": 9 },
                        "end": { "column": 30, "line": 12 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */
    
    


    describe('VALID', () => {

        it('Placeholder and button on the same level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { "block": "placeholder", "mods": { "size": "m" } },
                    { "block": "button", "mods": { "size": "m" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Button is on the deeper level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { "block": "placeholder", "mods": { "size": "m" } },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "button", 
                            "mods": { "size": "m" }
                        }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Placeholder is on the deeper level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "some-deeper-block",
                        "content": [
                            { 
                                "block": "placeholder", 
                                "mods": { "size": "m" } 
                            }
                        ]
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "button", 
                            "mods": { "size": "m" }
                        }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Not warning block and placeholder under button', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "button", 
                            "mods": { "size": "m" }
                        }
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": [
                            { 
                                "block": "placeholder", 
                                "mods": { "size": "m" } 
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */

}) /* WARNING.INVALID_BUTTON_POSITION */
