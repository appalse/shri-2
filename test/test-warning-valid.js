var lint = require('../build/linter.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Valid input of warning block', () => {

    describe('WARNING. NO TEXT_SIZES_SHOULD_BE_EQUAL', () => {
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
        })
        
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
        })

    }) /* describe: Same size of text blocks */
    
 
});
