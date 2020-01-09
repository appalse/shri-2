var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;


describe('WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', () => {

    describe('INVALID', () => {
       
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

        it('Text block without mods', () => {
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
                        "block": "text"                        
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
                        "end": { "column": 14, "line": 20 }
                    }
                }
            ]);
        }) /* it */

        it('Etalon text block without mods', () => {
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
                                    "block": "text"
                                }
                        }
                    },
                    {
                        "block": "text",
                        "mods": { "size": "m" }
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
                        "end": { "column": 14, "line": 20 }
                    }
                }
            ]);
        }) /* it */

        it('Text block without size in mods', () => {
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
                        "mods": { "prop": "m" }    
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

        it('Etalon text block without size in mods', () => {
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
                                    "mods": { "prop": "m" }
                                }
                        }
                    },
                    {
                        "block": "text",
                        "mods": { "size": "m" }
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

        it('size is not set', () => {
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "elem": "content",
                        "content": [
                            {
                                "block": "text",
                                "mods": { "size": "m" }
                            },
                            {
                                "block": "text",
                                "mods": { "size": "" }
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
                        "end": { "column": 14, "line": 18 }
                    }
                }
            ]);
        }) /* it */

        it('Etalon size is not set', () => {
            const inputJson = `{
                "block": "warning",
                "content": [
                    {
                        "elem": "content",
                        "content": [
                            {
                                "block": "text",
                                "mods": { "size": "" }
                            },
                            {
                                "block": "text",
                                "mods": { "size": "xl" }
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
                        "end": { "column": 14, "line": 18 }
                    }
                }
            ]);
        }) /* it */

        it('Nested warning elements of different text sizes inside one warning block', () => {  
            const inputJson = `{ 
                "block": "warning",
                "content": [
                    { 
                        "block": "warning", 
                        "elem": "content",
                        "content": [
                            { "block": "text", "mods": { "size": "m" } },
                            {
                                "block": "warning",
                                "elem": "button-wrapper",
                                "content": [
                                    { "block": "text", "mods": { "size": "l" } }
                                ]
                            },
                            { "block": "text", "mods": { "size": "m" } }
                        ]
                    },
                    { "block": "text", "mods": { "size": "l" } }
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
        
    }) /* describe: INVALID */




    describe('VALID', () => {

        it('2 text blocks of size-l', () => {  
            const inputJson = `
            { 
                "block": "warning",
                "content": 
                    [
                        { 
                            "block": "placeholder",
                            "mods": { "size": "m" }
                        },
                        {  
                            "elem": "content",
                            "content": 
                                [
                                    { 
                                        "block": "text",
                                        "mods": { "size": "l" }
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
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */
        
        it('3 text blocks of size-m, 3rd level children,content is object', () => {  
            const inputJson = `
            { 
                "block": "warning",
                "content": 
                    { 
                        "block": "warning", 
                        "elem": "content",
                        "content": 
                            {
                                "block": "warning",
                                "elem": "button-wrapper",
                                "content":
                                    [
                                        { 
                                            "block": "text",
                                            "mods": { "size": "m" }
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
                    }
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */  

        it('3 nested warning blocks of different text sizes', () => {  
            const inputJson = `
            { 
                "block": "warning",
                "content": [
                    { 
                        "block": "text",
                        "mods": { "size": "l" }
                    },
                    { 
                        "block": "warning", 
                        "content": [
                            { 
                                "block": "text",
                                "mods": { "size": "m" }
                            },
                            {
                                "block": "warning",
                                "content":
                                    [
                                        { 
                                            "block": "text",
                                            "mods": { "size": "l" }
                                        },
                                        {  
                                            "block": "text",
                                            "mods": { "size": "l" }
                                        },
                                        {  
                                            "block": "text",
                                            "mods": { "size": "l" }
                                        }
                                    ]
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
                    },
                    { 
                        "block": "text",
                        "mods": { "size": "l" }
                    }
                ]
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */  

        it('no warning block with non-equal text sizes', () => {  
            const inputJson = `
            { 
                "block": "not-a-warning-block",
                "content": {  
                    "elem": "content",
                    "content": 
                        [
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
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */  

        it('no warning block with not set text sizes', () => {  
            const inputJson = `
            { 
                "block": "not-a-warning-block",
                "content": {  
                    "elem": "content",
                    "content": 
                        [
                            { 
                                "block": "text",
                                "mods": { "size": "" }
                            },
                            {  
                                "block": "text",
                                "mods": { "prop": "l" }
                            },
                            {  
                                "block": "text"
                            }
                        ]
                }
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */  
        
        it('Separate nested warning blocks with different text sizes', () => {  
            const inputJson = `{ 
                "block": "warning",
                "content": [
                    {"block": "text", "mods": { "size": "s" } },
                    { 
                        "block": "warning", 
                        "content": [
                            {
                                "block": "warning",
                                "content": [
                                    { "block": "text", "mods": { "size": "m" } },
                                    { "block": "text", "mods": { "size": "m" } },
                                    { "block": "text", "mods": { "size": "m" } }
                                ]
                            },
                            { "block": "text", "mods": { "size": "l" } }
                        ]
                    }
                ]
            }`;
            
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */  

    }) /* describe: VALID */

}) /* WARNING.TEXT_SIZES_SHOULD_BE_EQUAL */
