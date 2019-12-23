'use strict'

const lint = require('./build/linter');

const json = `{
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

console.log('Start linter. Input:');
console.log(json);

const result = lint(json);

console.log('Exit from linter. Output:');
console.log(result);