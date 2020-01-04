var lint = require('../build/linter.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('VALID input of WARNING block', () => {


    describe('NO - WARNING.TEXT_SIZES_SHOULD_BE_EQUAL', () => {

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
        
        it('3 text blocks of size-m, 2nd level children,content is object', () => {  
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
        
        it('Nested warning blocks with different text sizes', () => {  
            const inputJson = `
            { 
                "block": "warning",
                "content": 
                    [
                        { 
                            "block": "text",
                            "mods": { "size": "s" }
                        },
                        { 
                            "block": "warning", 
                            "elem": "content",
                            "content": 
                                [
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

    }) /* describe: NO - WARNING.TEXT_SIZES_SHOULD_BE_EQUAL */




    describe('NO - WARNING.INVALID_BUTTON_SIZE', () => {

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

        it('Valid button size xxxl', () => {  
            const inputJson = `{
                "block": "warning",
                "content": 
                    {
                        "block": "warning",
                        "content": [
                            { "block": "text", "mods": { "size": "xxl" } },
                            { "block": "button", "mods": { "size": "xxxl" } },
                            { "block": "button", "mods": { "size": "xxxl" } }
                        ]
                    }
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

    }) /* describe: NO - WARNING.INVALID_BUTTON_SIZE */




    describe('NO - WARNING.INVALID_BUTTON_POSITION', () => {

        it('Placeholder and button on the same level', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { "block": "placeholder", "mods": { "size": "m" } },
                    { "block": "button", "mods": { "size": "m" } }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */

        it('Placeholder and button on the different levels', () => {  
            const inputJson = `{
                "block": "warning",
                "content": [
                    { 
                        "block": "placeholder", 
                        "mods": { "size": "m" } 
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

    }) /* describe: NO - WARNING.INVALID_BUTTON_POSITION */




    describe('NO - WARNING.INVALID_PLACEHOLDER_SIZE', () => {

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

        it('no warning block with non-valid placeholder size', () => {  
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

    }) /* describe: NO - WARNING.INVALID_PLACEHOLDER_SIZE */
    
 


}); /* describe: VALID input of WARNING block */
