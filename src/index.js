'use strict'

const parse = require('json-to-ast');
const Processor = require('./Processor.js');


function lint(jsonString) {
	if (typeof jsonString !== 'string' || jsonString.length === 0) {
		return [];
    }
    // use json-to-ast for parsing of input data
    // ast = abstract syntax tree
    const settings = {
        loc: true, // save location during parsing
    };
    const parsedInput = parse(jsonString, settings);
    let processor = new Processor();
    processor.processNode(parsedInput);
    return processor.getErrors();
}

module.exports = lint;
