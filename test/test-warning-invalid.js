var lint = require('../build/linter.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();


describe('INVALID input of warning block', () => {


    describe('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', () => {
       
        it('2 blocks of different sizes', () => {
                const inputJson = `{
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
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 14, "line": 22 }
                    }
                }
            ]);
        }) /* it */

        it('3 blocks of different sizes', () => {
            const inputJson = `{
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
                                "mods": { "size": "s" }
                            },
                            {
                                "block": "text",
                                "mods": { "size": "m" }
                            },
                            {
                                "block": "text",
                                "mods": { "size": "m" }
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 14, "line": 26 }
                    }
                }
            ]);
        }) /* it */  

        it('nested warning blocks, empty lines', () => {
            const inputJson = `
            {
                "block": "warning",
                "content": {
                    "block": "warning",
                    "content": 
                    {
                        "elem": "content",
                        "content": 
                        [
                            {
                                "block": "text",
                                "mods": { "size": "s" }
                            },

                            {
                                "block": "text",
                                "mods": { "size": "m" }
                            }
                        ]
                    }
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 28, "line": 4 },
                        "end": { "column": 18, "line": 22 }
                    }
                }
            ]);
        }) /* it */

        it('Nested text blocks with different sizes', () => {
            const inputJson = `{
                "block": "warning",
                "content": 
                {
                    "block": "text",
                    "mods": { "size": "s" },
                    "content": 
                    {
                        "elem": "content",
                        "content": 
                        [
                            {
                                "block": "text",
                                "mods": { "size": "m" }
                            },
                            {
                                "block": "text",
                                "mods": { "size": "m" }
                            }
                        ]
                    }
                }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 14, "line": 23 }
                    }
                }
            ]);
        }) /* it */

        it('Text blocks with different sizes on different levels', () => {
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "card",
                        "content": 
                        {
                            "elem": "content",
                            "content": 
                                {
                                    "block": "text",
                                    "mods": { "size": "m" }
                                }
                        }
                    },
                    {
                        "block": "text",
                        "mods": { "size": "s" }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 14, "line": 21 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: WARNING.TEXT_SIZES_SHOULD_BE_EQUAL */




    describe('WARNING.INVALID_BUTTON_SIZE', () => {

        it('Invalid button sizes, equal or bigger than s', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "xs" } },
                    { "block": "button", "mods": { "size": "xs" } },
                    { "block": "button", "mods": { "size": "m" } },
                    { "block": "button", "mods": { "size": "l" } },
                    { "block": "button", "mods": { "size": "xl" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 68, "line": 5 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 6 },
                        "end": { "column": 67, "line": 6 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 7 },
                        "end": { "column": 67, "line": 7 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 8 },
                        "end": { "column": 68, "line": 8 }
                    }
                }
            ]);
        }) /* it */

        it('Invalid button sizes, equal or smaller than xl', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "xl" } },
                    { "block": "button", "mods": { "size": "xl" } },
                    { "block": "button", "mods": { "size": "l" } },
                    { "block": "button", "mods": { "size": "m" } },
                    { "block": "button", "mods": { "size": "s" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 68, "line": 5 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 6 },
                        "end": { "column": 67, "line": 6 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 7 },
                        "end": { "column": 67, "line": 7 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 8 },
                        "end": { "column": 67, "line": 8 }
                    }
                }
            ]);
        }) /* it */

        it('Invalid button sizes, text and non-text blocks in array', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "xl" } },
                    { "block": "text", "mods": { "size": "xl" } },
                    { "block": "not-a-text-block", "mods": { "size": "l" } },
                    { "block": "button", "mods": { "size": "xl" } },
                    { "block": "button", "mods": { "size": "xxl" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 7 },
                        "end": { "column": 68, "line": 7 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: NO - WARNING.INVALID_BUTTON_SIZE */




    describe('WARNING.INVALID_BUTTON_POSITION', () => {

        it('Button before placeholder on the same level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
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
                        "start": { "column": 21, "line": 4 },
                        "end": { "column": 67, "line": 4 }
                    }
                }
            ]);
        }) /* it */ 

        it('Button before placeholder on deeper level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
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
                        "start": { "column": 36, "line": 6 },
                        "end": { "column": 26, "line": 9 }
                    }
                }
            ]);
        }) /* it */ 

        it('2 buttons before placeholder, both on deeper levels', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
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
                        "start": { "column": 29, "line": 7 },
                        "end": { "column": 75, "line": 7 }
                    }
                },
                {
                    "code": "WARNING.INVALID_BUTTON_POSITION",
                    "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
                    "location": {
                        "start": { "column": 29, "line": 8 },
                        "end": { "column": 75, "line": 8 }
                    }
                }
            ]);
        }) /* it */ 

    }) /* describe: NO - WARNING.INVALID_BUTTON_POSITION */   




    describe('WARNING.INVALID_PLACEHOLDER_SIZE', () => {

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

    }) /* describe: WARNING.INVALID_PLACEHOLDER_SIZE */

}) /* INVALID input of warning block */
