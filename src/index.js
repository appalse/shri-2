'use strict'
const parse = require('json-to-ast');
const utils = require('./utils.js');
const blocks = require('./blocks.js');
const checkTextSize = require('./warning/checkTextSize.js');
const checkButtonsSizes = require('./warning/checkButtonsSizes.js');
const checkButtonPosition = require('./warning/checkButtonPosition.js');
const checkPlaceholderSize = require('./warning/checkPlaceholderSize.js');
const checkTextH1 = require('./text/checkTextH1.js');
const checkTextH2 = require('./text/checkTextH2.js');
const checkTextH3 = require('./text/checkTextH3.js');
const Parents = require('./Parents.js');
const ErrorList = require('./ErrorList.js');
const Processor = require('./Processor.js');


function updateParents(nodeLocation, blockType, parents) {
	if (blockType === 'warning') {
        return parents.updateWarning(nodeLocation);
    }
}

function processArray(contentArray, parents, errorsList) {
	/* Вызываем обработку дальше в грубину */
	contentArray.forEach(node => {
		processObject(node, parents, errorsList);
	});
}

function processObject(node, parents, errorsList) {
	const blockName = blocks.getBlockName(node);
	let previousParent = updateParents(node.loc, blockName, parents);
	
	if (parents.hasWarning()) {
        if (blockName === 'button') {
            const modsSize = utils.extractModsSize(node);
            parents.addWarningPreceding(node.loc, 'button', modsSize);
        }
	    if (blockName === 'text') {
            const modsSize = utils.extractModsSize(node);
		    parents.addWarningEtalonTextSize(modsSize);
        }

        // Проверяем текущий узел 
        checkTextSize(node, parents, errorsList);
    	checkButtonPosition(node, parents, errorsList);
	    checkPlaceholderSize(node, errorsList);
    }
    const previousH2 = parents.getPreviousH2List();
    const previousH3 = parents.getPreviousH3List();
    if (blockName === 'text') {
        const textType = utils.extractModsType(node);
        if (textType === 'h2' || textType === 'h3') {
            parents.addHeadingInList(node.loc, textType);
        }
		checkTextH1(node, textType, parents, errorsList);
		checkTextH2(node, textType, parents, errorsList);
		checkTextH3(node, textType, parents, errorsList);
    }
    
    // Идем в глубину 
	const contentField = utils.extractContent(node.children);
	if (contentField) {
		processNode(contentField, parents, errorsList);
	}

    // Перед выходом из функции проверяем размеры button'ов на соответствие эталону 
    if (parents.hasWarning()) {
        checkButtonsSizes(node, parents, errorsList);
    }

	// Возвращаем предыдущее значение перед выходом их функции 
	if (blockName === 'warning' && previousParent) {
        parents.setWarningParent(previousParent);
    }
    if (blockName === 'text') {
        parents.setHeadingList('h2', previousH2);
        parents.setHeadingList('h3', previousH3);
    }   
}	

function processNode(contentField, parents, errorsList) {
	if (contentField.type === 'Object') {
		processObject(contentField, parents, errorsList);
	} else if (contentField.type === 'Array') {
		processArray(contentField.children, parents, errorsList);
	} else {
		throw 'Object or Array is expected, but ' + contentField.type + ' is found';
	}
}

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
    
	/*let parents = {
        'warning': undefined,
        'headingH2List': undefined,
        'headingH3List': undefined
    };*/

    // class with objects in order to collect information about nodes while going through ast
    let parents = new Parents();
    // output array
    let errorsList = new ErrorList();
    /* use Processor class */
    processNode(parsedInput, parents, errorsList);
	return errorsList.get();
}

module.exports = lint;
/*
let r = lint(`{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "s" } },
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`);

console.log(r[0]);*/