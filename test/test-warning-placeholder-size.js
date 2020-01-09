var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;


describe('WARNING.INVALID_PLACEHOLDER_SIZE', () => {

    describe('INVALID', () => {

        it('Invalid size in placeholder, content is object, not an array', () => {  
            const inputJson = `{
                "block": "warning",
                "content": {
                    "block": "placeholder",
                    "mods": { "size": "xs" }
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 28, "line": 3 },
                        "end": { "column": 18, "line": 6 }
                    }
                }
            ]);
        }) /* it */

        it('Invalid sizes in 2 sequential placeholders', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "placeholder",
                        "mods": { "size": "xl" }
                    },
                    {
                        "block": "placeholder",
                        "mods": { "size": "xxl" }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 21, "line": 4 },
                        "end": { "column": 22, "line": 7 }
                    }
                },
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 21, "line": 8 },
                        "end": { "column": 22, "line": 11 }
                    }
                }
            ]);
        }) /* it */

        it('Invalid sizes in nested placeholders', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "elem": "content",
                        "content": [
                            {
                                "block": "placeholder",
                                "mods": { "size": "xxl" }
                            },
                            {
                                "block": "placeholder",
                                "mods": { "size": "xxxl" },
                                "content" : {
                                    "block": "placeholder",
                                    "mods": { "size": "xxxxl" }
                                }
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 29, "line": 7 },
                        "end": { "column": 30, "line": 10 }
                    }
                },
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 29, "line": 11 },
                        "end": { "column": 30, "line": 18 }
                    }
                }
                ,
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 45, "line": 14 },
                        "end": { "column": 34, "line": 17 }
                    }
                }
            ]);
        }) /* it */

        it('Invalid empty size in placeholder', () => {  
            const inputJson = `{
                "block": "warning",
                "content": {
                    "block": "placeholder",
                    "mods": { "size": "" }
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 28, "line": 3 },
                        "end": { "column": 18, "line": 6 }
                    }
                }
            ]);
        }) /* it */

        it('No mods in placeholder', () => {  
            const inputJson = `{
                "block": "warning",
                "content": {
                    "block": "placeholder"
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 28, "line": 3 },
                        "end": { "column": 18, "line": 5 }
                    }
                }
            ]);
        }) /* it */

        it('No size property in placeholder mods', () => {  
            const inputJson = `{
                "block": "warning",
                "content": {
                    "block": "placeholder",
                    "mods": { "prop": "m", "prop2": "s" }
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
                    "error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
                    "location": {
                        "start": { "column": 28, "line": 3 },
                        "end": { "column": 18, "line": 6 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */




    describe('VALID', () => {

        it('Valid l-size in placeholder, content is object, not an array', () => {  
            const inputJson = `{
                "block": "warning",
                "content": {
                    "block": "placeholder",
                    "mods": { "size": "s" }
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid l-size in placeholder', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "placeholder",
                        "mods": { "size": "l" }
                    },
                    {
                        "block": "placeholder",
                        "mods": { "size": "l" }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid sizes in nested placeholders', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "elem": "content",
                        "content": [
                            {
                                "block": "placeholder",
                                "mods": { "size": "s" }
                            },
                            {
                                "block": "placeholder",
                                "mods": { "size": "m" },
                                "content" : {
                                    "block": "placeholder",
                                    "mods": { "size": "l" }
                                }
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Not warning block with non-valid placeholder size', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": {
                    "block": "placeholder",
                    "mods": { "size": "xs" }
                }
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Not warning block with empty placeholder size', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": {
                    "block": "placeholder",
                    "mods": { "size": "" }
                }
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Not warning block with no placeholder mods', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": {
                    "block": "placeholder"
                }
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('no warning block with valid placeholder size', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": {
                    "block": "placeholder",
                    "mods": { "size": "s" }
                }
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */

}) /* WARNING.INVALID_PLACEHOLDER_SIZE */
