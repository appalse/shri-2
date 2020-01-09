var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;


describe('WARNING.INVALID_BUTTON_SIZE', () => {

    describe('INVALID', () => {

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

        it('Invalid button size xxxl', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "xxl" } },
                            { "block": "button", "mods": { "size": "xxxl" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 29, "line": 8 },
                        "end": { "column": 78, "line": 8 }
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

        it('Buttons are on deeper levels than etalon text', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "s" } },
                    {
                        "block": "deeper-block",
                        "content" : [
                            {
                                "block": "more-deeper-block",
                                "content": 
                                    { "block": "button", "mods": { "size": "l" } }
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 37, "line": 11 },
                        "end": { "column": 83, "line": 11 }
                    }
                }
            ]);
        }) /* it */

        it('Etalon text is on deeper level than buttons', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "deeper-block",
                        "content" : [
                            { "block": "text", "mods": { "size": "m" } }
                        ]
                    },
                    {
                        "block": "deeper-block",
                        "content" : [
                            {
                                "block": "more-deeper-block",
                                "content": 
                                    { "block": "button", "mods": { "size": "m" } }
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 37, "line": 16 },
                        "end": { "column": 83, "line": 16 }
                    }
                }
            ]);
        }) /* it */


        it('Invalid empty button size', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "m" } },
                    { "block": "button", "mods": { "size": "" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 66, "line": 5 }
                    }
                }
            ]);
        }) /* it */

        it('No size in button mods', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "m" } },
                    { "block": "button", "mods": { "prop": "" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 66, "line": 5 }
                    }
                }
            ]);
        }) /* it */

        it('No mods in button', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "m" } },
                    { "block": "button" }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 21, "line": 5 },
                        "end": { "column": 42, "line": 5 }
                    }
                }
            ]);
        }) /* it */

        it('Etalon text is under buttons', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "deeper-block",
                        "content" : [
                            {
                                "block": "more-deeper-block",
                                "content": 
                                    { "block": "button", "mods": { "size": "m" } }
                            }
                        ]
                    },
                    {
                        "block": "deeper-block",
                        "content" : [
                            { "block": "text", "mods": { "size": "m" } }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "WARNING.INVALID_BUTTON_SIZE",
                    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
                    "location": {
                        "start": { "column": 37, "line": 10 },
                        "end": { "column": 83, "line": 10 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe: INVALID */




    describe('VALID', () => {

        it('Valid xl-button size after l-size text block ', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "text", "mods": { "size": "l" } },
                    { "block": "button", "mods": { "size": "xl" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid button size s', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "xs" } },
                            { "block": "button", "mods": { "size": "s" } },
                            { "block": "button", "mods": { "size": "s" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid button size m', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "s" } },
                            { "block": "button", "mods": { "size": "m" } },
                            { "block": "button", "mods": { "size": "m" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid button size l', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "m" } },
                            { "block": "button", "mods": { "size": "l" } },
                            { "block": "button", "mods": { "size": "l" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid button size xl', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "l" } },
                            { "block": "button", "mods": { "size": "xl" } },
                            { "block": "button", "mods": { "size": "xl" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Valid button size xxl', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "xl" } },
                            { "block": "button", "mods": { "size": "xxl" } },
                            { "block": "button", "mods": { "size": "xxl" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Text and button on the different levels', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { 
                        "block": "text", 
                        "mods": { "size": "m" } 
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": {
                            "block": "button", 
                            "mods": { "size": "l" }
                        }
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Etalon text after button', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "button", 
                        "mods": { "size": "l" }
                    },
                    { 
                        "block": "text", 
                        "mods": { "size": "m" } 
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Etalon text on deeper level after button', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "block": "button", 
                        "mods": { "size": "l" }
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": [
                            { 
                                "block": "text", 
                                "mods": { "size": "m" } 
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Not warning block, button m-size', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": [
                    {
                        "block": "button", 
                        "mods": { "size": "m" }
                    },
                    { 
                        "block": "some-deeper-block",
                        "content": [
                            { 
                                "block": "text", 
                                "mods": { "size": "m" } 
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Not warning block, button empty size', () => {  
            const inputJson = `{
                "block": "not-a-warning-block",
                "content": [
                    {
                        "block": "button", 
                        "mods": { "size": "" }
                    },
                    { 
                        "block": "text", 
                        "mods": { "size": "m" } 
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: VALID */  

}) /* INVALID input of warning block */
