var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('GRID.TOO_MUCH_MARKETING_BLOCKS', () => {

    describe('INVALID', () => {

        it('', () => {
            const inputJson = `{
                "block": "grid",
                "mods": {
                    "m-columns": "10"
                },
                "content": [
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "2"
                        },
                        "content": [
                            {
                                "block": "payment"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "8"
                        },
                        "content": [
                            {
                                "block": "offer"
                            }
                        ]
                    }
                ]
             }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.deep.equal([
                {
                    "code": "GRID.TOO_MUCH_MARKETING_BLOCKS",
                    "error": "",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 1, "line": 1 }
                    }
                }
            ]);
        }) /* it */       

    }) /* describe: INVALID */
    


    
    describe('VALID', () => {

        it('', () => {
            const inputJson = `{
                "block": "grid",
                "mods": {
                    "m-columns": "10"
                },
                "content": [
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "8"
                        },
                        "content": [
                            {
                                "block": "payment"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "2"
                        },
                        "content": [
                            {
                                "block": "offer"
                            }
                        ]
                    }
                ]
             }`;
            const result = lint(inputJson);
            expect(result).to.be.an('array').that.is.empty;
        }) /* it */
       
    }) /* describe: VALID */
        
}) /* describe: GRID.TOO_MUCH_MARKETING_BLOCKS */
