'use strict'
const parse = require('json-to-ast');
const utils = require('./utils.js');
const warningBlock = require('./warningBlock.js');


const inputJson = `{
	"block": "warning",
	"content": [
		{ "block": "text", "mods": { "size": "l" } },
		{ "block": "button", "mods": { "size": "xl" } }
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

function updateParent(nodeLocation, blockName, parents) {
	if (parents[blockName]) {
		copyLocation(nodeLocation, parents[blockName].loc);
	} else {
		let newParent = {
			'preceding': [],
			'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
		};
		copyLocation(nodeLocation, newParent.loc)
		parents[blockName]  = newParent;
	}
}

function addPreceding(nodeLocation, blockName, parent) {
	let newPreceding = {
		'block': blockName,
		'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
	};
	copyLocation(nodeLocation, newPreceding.loc);
	parent['preceding'].push(newPreceding);
}

function processArrayOfNodes(contentArray, parents, errorsList) {

	warningBlock.checkEqualTextSizes(contentArray, parents, errorsList);
	warningBlock.checkButtonSize(contentArray, parents, errorsList);
	
	/* Вызываем обработку дальше в грубину */
	contentArray.forEach(node => processNode(node, parents, errorsList));
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
	const currentParents = getParentsCopy(parents);
	if (utils.isWarningBlock(node)) {
		updateParent(node.loc, 'warning', parents);
	} else if (utils.isPlaceholderBlock(node)) {
		updateParent(node.loc, 'placeholder', parents);
	}
	
	if (parents['warning'] && utils.isButtonBlock(node)) {
		addPreceding(node.loc, 'button', parents['warning']);
	}

	warningBlock.checkPlaceholderSize(node, parents, errorsList);
	warningBlock.checkButtonPosition(node, parents, errorsList);

	const contentField = utils.extractContent(node.children);
	if (contentField) {
		processContent(contentField, parents, errorsList);
	}
	parents = getParentsCopy(currentParents);
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
	console.log(errorsList[0]);
	return errorsList;
}

module.exports = lint;

lint(inputJson);