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


function getParentsCopy(parents) {
	return JSON.parse(JSON.stringify(parents));
}

function copyLocation(source, dest) {
	dest.start.line = source.start.line;
	dest.start.column = source.start.column;
	dest.end.line = source.end.line;
	dest.end.column = source.end.column;
}

function updateWarningParent(nodeLocation, parents) {
	const previousParent = parents.warning ? getParentsCopy(parents.warning) : undefined;
	if (parents.warning) {
		parents.warning['etalonTextSize'] = undefined;
		parents.warning['preceding'] = [];
		copyLocation(nodeLocation, parents.warning.loc);		
	} else {
		let newParent = {
			'etalonTextSize': undefined,
			'preceding': [],
			'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
		};
		copyLocation(nodeLocation, newParent.loc)
		parents.warning  = newParent;
	}
	return previousParent;
}

function updateTextParent(nodeLocation, blockType, parents) {
}

function updateParents(nodeLocation, blockType, parents) {
	if (blockType === 'warning') {
		return updateWarningParent(nodeLocation, parents);
    }
}

function addPreceding(node, blockName, parent) {
	let newPreceding = {
		'block': blockName,
		'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
	};
	copyLocation(node.loc, newPreceding.loc);
	newPreceding['size'] = utils.extractModsSize(node);
	parent['preceding'].push(newPreceding);
}

function addEtalonTextSize(node, parent) {
	if (parent.etalonTextSize) {
		return; /* эталонный размер текста уже задан */
	}
	let modsSize = utils.extractModsSize(node);
	if (modsSize) {
		parent['etalonTextSize'] = modsSize;
	} 
}

function addHeadingInList(nodeLocation, headingListName, parents) {
    if (!parents[headingListName]) {
        parents[headingListName] = [];
    }
    parents[headingListName].push({
        'loc': { 
            'start': { 'line': nodeLocation.start.line, 'column': nodeLocation.start.column }, 
            'end': { 'line': nodeLocation.end.line, 'column': nodeLocation.end.column }
        }
    });
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
	
	if (parents.warning) {
        if (blockName === 'button') {
            addPreceding(node, 'button', parents.warning);
        }
	    if (!parents.warning.etalonTextSize && blockName === 'text') {
		    addEtalonTextSize(node, parents.warning);
        }

        // Проверяем текущий узел 
        checkTextSize(node, parents, errorsList);
    	checkButtonPosition(node, parents, errorsList);
	    checkPlaceholderSize(node, parents, errorsList);
    }
    const previousH2 = parents.headingH2List ? getParentsCopy(parents.headingH2List) : undefined;
    const previousH3 = parents.headingH3List ? getParentsCopy(parents.headingH3List) : undefined;
    if (blockName === 'text') {
        const textType = utils.extractModsType(node);
        if (textType === 'h2') {
            addHeadingInList(node.loc, 'headingH2List', parents);
        } else if (textType === 'h3') {
            addHeadingInList(node.loc, 'headingH3List', parents);
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
    if (parents.warning) {
        checkButtonsSizes(node, parents, errorsList);
    }

	// Возвращаем предыдущее значение перед выходом их функции 
	if (blockName === 'warning' && previousParent) {
		parents[blockName] = previousParent;
    }
    if (blockName === 'text') {
        parents['headingH2List'] = previousH2;
        parents['headingH3List'] = previousH3;
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
    
	let parents = {
        'warning': undefined,
        'headingH2List': undefined,
        'headingH3List': undefined
    };

    // class with objects in order to collect information about nodes while going through ast
    //let parents = new Parents();
    // output array
    let errorsList = new ErrorList();
    processNode(parsedInput, parents, errorsList);
	return errorsList.get();
}

module.exports = lint;

let r = lint(`{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "s" } },
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`);

console.log(r[0]);