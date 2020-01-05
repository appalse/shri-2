'use strict'
const parse = require('json-to-ast');
const utils = require('./utils.js');
const blocks = require('./blocks.js');
const warningBlock = require('./warningBlock.js');


const inputJson = `{
	"block": "warning",
	"content": [
		{ "block": "text", "mods": { "size": "m" } },
		{ "block": "button", "mods": { "size": "" } }
	]
}`;

function getParentsCopy(parents) {
	return JSON.parse(JSON.stringify(parents));
}


function copyLocation(source, dest) {
	dest.start.line = source.start.line;
	dest.start.column = source.start.column;
	dest.end.line = source.end.line;
	dest.end.column = source.end.column;
}

function updateParents(nodeLocation, blockType, parents) {
	if (blockType !== blocks.BLOCK_TYPE_WARNING
		&& blockType !== blocks.BLOCK_TYPE_PLACEHOLDER) {
			return null;
		}
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

function addPreceding(nodeLocation, blockName, parent) {
	let newPreceding = {
		'block': blockName,
		'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
	};
	copyLocation(nodeLocation, newPreceding.loc);
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
	const blockType = blocks.getBlockType(node);
	let currentParents = updateParents(node.loc, blockType, parents);
	
	if (parents['warning'] && blockType === blocks.BLOCK_TYPE_BUTTON) {
		addPreceding(node.loc, 'button', parents['warning']);
	}
	if (parents['warning'] && !parents.warning['etalonTextSize'] && blockType === blocks.BLOCK_TYPE_TEXT) {
		addEtalonTextSize(node, parents['warning']);
	}

	warningBlock.checkTextSize(node, parents, errorsList);
	warningBlock.checkButtonSize(node, parents, errorsList);
	warningBlock.checkButtonPosition(node, parents, errorsList);
	warningBlock.checkPlaceholderSize(node, parents, errorsList);	

	const contentField = utils.extractContent(node.children);
	if (contentField) {
		processContent(contentField, parents, errorsList);
	}
	if (currentParents !==  null) {
		parents[blockType] = currentParents;
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

lint(inputJson);