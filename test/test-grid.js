var lint = require('../build/linter.js');
var chai = require('chai');
var expect = chai.expect;

describe('GRID.TOO_MUCH_MARKETING_BLOCKS', () => {

    describe('INVALID', () => {

        it('Payment 2 and Offer 8', () => {
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
                    "error": "Маркетинговые блоки занимают больше половины или ровно половину от всех колонок блока grid",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 15, "line": 32 }
                    }
                }
            ]);
        }) /* it */       

        it('3 warning and 3 marketings', () => {
            const inputJson = `{
                "block": "grid",
                "mods": {
                    "m-columns": "6"
                },
                "content": [
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "3"
                        },
                        "content": [
                            {
                                "block": "warning"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "offer"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "commercial"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
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
                    "error": "Маркетинговые блоки занимают больше половины или ровно половину от всех колонок блока grid",
                    "location": {
                        "start": { "column": 1, "line": 1 },
                        "end": { "column": 15, "line": 56 }
                    }
                }
            ]);
        }) /* it */       

    }) /* describe: INVALID */
    


    
    describe('VALID', () => {

        it('Payment 8 and Offer 2', () => {
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

        it('8 different and 2 commercial', () => {
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
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "warning"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "product"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "history"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "cover"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "collect"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "articles"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "subscribtion"
                            }
                        ]
                    },
                    {
                        "block": "grid",
                        "elem": "fraction",
                        "elemMods": {
                            "m-col": "1"
                        },
                        "content": [
                            {
                                "block": "event"
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
                                "block": "commercial"
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
