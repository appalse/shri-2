var lint = require('../build/linter.js');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();


describe('Invalid input of warning block', () => {

 /*   describe('Incorrect input data types',() => {
        it('invalid input as character', () => {        
            const result = lint('1');
            expect(result).to.be.an('array').that.is.empty;
        })
    })
*/
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
            expect(result).to.be.an('array').that.is.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 2, "line": 22 }
                    }
                }
            ]);
            console.log('FINISHED');
        }) /* it */
/*
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
            expect(result).to.be.an('array').that.is.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 2, "line": 26 }
                    }
                }
            ]);
        }) /* it */
        
  /*      it('size is not set', () => {
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
                            }
                        ]
                    }
                ]
            }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 2, "line": 17 }
                    }
                }
            ]);
        }) /* it */
/*
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
            expect(result).to.be.an('array').that.is.equal([
                {
                    "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
                    "error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
                    "location": {
                        "start": { "column": 28, "line": 3 },
                        "end": { "column": 18, "line": 22 }
                    }
                }
            ]);
        }) /* it */

    }) /* describe */
}) /* outer (main) describe */




