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


function getParentsCopy(parents) {
	return JSON.parse(JSON.stringify(parents));
}


function copyLocation(source, dest) {
	dest.start.line = source.start.line;
	dest.start.column = source.start.column;
	dest.end.line = source.end.line;
	dest.end.column = source.end.column;
}

function updateWarningParent(nodeLocation, blockType, parents) {
	const previousParent = parents[blockType] ? getParentsCopy(parents[blockType]) : undefined;
	if (parents[blockType]) {
		parents[blockType]['etalonTextSize'] = undefined;
		parents[blockType]['preceding'] = [];
		copyLocation(nodeLocation, parents[blockType].loc);		
	} else {
		let newParent = {
			'etalonTextSize': undefined,
			'preceding': [],
			'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
		};
		copyLocation(nodeLocation, newParent.loc)
		parents[blockType]  = newParent;
	}
	return previousParent;
}

function updateParents(nodeLocation, blockType, parents) {
	if (blockType === 'warning') {
		return updateWarningParent(nodeLocation, blockType, parents);
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
	if (parent['etalonTextSize']) {
		return; /* эталонный размер текста уже задан */
	}
	let modsSize = utils.extractModsSize(node);
	if (modsSize) {
		parent['etalonTextSize'] = modsSize;
	} 
}

function processArrayOfNodes(contentArray, parents, errorsList) {
	/* Вызываем обработку дальше в грубину */
	contentArray.forEach(node => {
		processNode(node, parents, errorsList);
	});
}

function processContent(contentField, parents, errorsList) {
	if (contentField.type === 'Object') {
		processNode(contentField, parents, errorsList);
	} else if (contentField.type === 'Array') {
		processArrayOfNodes(contentField.children, parents, errorsList);
	} else {
		throw 'Object or Array is expected, but ' + contentField.type + ' is found';
	}
}

function processNode(node, parents, errorsList) {
	const blockName = blocks.getBlockName(node);
	let currentParents = updateParents(node.loc, blockName, parents);
	
	if (parents['warning'] && blockName === 'button') {
		addPreceding(node, 'button', parents.warning);
	}
	if (parents['warning'] && !parents.warning['etalonTextSize'] && blockName === 'text') {
		addEtalonTextSize(node, parents.warning);
	}

	checkTextSize(node, parents, errorsList);
	checkButtonPosition(node, parents, errorsList);
	checkPlaceholderSize(node, parents, errorsList);
	if (blockName === 'text') {
		const textType = utils.extractModsType(node);
		checkTextH1(node, textType, parents, errorsList);
		checkTextH2(node, parents, errorsList);
		checkTextH3(node, parents, errorsList);
	}

	const contentField = utils.extractContent(node.children);
	if (contentField) {
		processContent(contentField, parents, errorsList);
	}

	/* Перед выходом из функции проверяем размеры button'ов на соответствие эталону */
	checkButtonsSizes(node, parents, errorsList);

	/* Возвращаем предыдущее значение перед выходом их функци */
	if (currentParents !==  null) {
		parents[blockName] = currentParents;
	}
}			

function lint(jsonString) {
	if (jsonString.length === 0) {
		return [];
	}
	/* TODO check if input json is valid in terms of json syntax */
	/* if not valid - throw expection or return special result */
	const settings = {
		loc: true,
	};
	const parsed = parse(jsonString, settings);
	let parents = {};
	let errorsList = [];
	if (parsed.type === 'Object') {
		processNode(parsed, parents, errorsList);
	}
	return errorsList;
}

module.exports = lint;
