'use strict'
const parse = require('json-to-ast');
const {
    WARNING_EQUAL_TEXT_SIZE,
    getError
} = require('./errors.js');


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
				},
				{
					"block": "warning",
					"mods": { "size": "m" }
				}
            ]
        }
    ]
}`;

function isSomeBlock(nodeChildren, blockName) {
	return nodeChildren.some(element => 
								element.key.value === 'block' 
								&& element.value.value === blockName);
}

function isTextBlock(node) {
	return isSomeBlock(node.children, 'text');
}


function isWarningBlock(node) {
	return isSomeBlock(node.children, 'warning');
}

function copyLocation(source, dest) {
	dest.start.line = source.start.line;
	dest.start.column = source.start.column;
	dest.end.line = source.end.line;
	dest.end.column = source.end.column;
}

function updateWarningParent(nodeLocation, parents) {
	if (parents['warning']) {
		copyLocation(nodeLocation, parents['warning'].loc);
	} else {
		let newParent = {
			'block': 'warning', /* НЕ ИСПОЛЬЗУЕТСЯ - ? */
			'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
		};
		copyLocation(nodeLocation, newParent.loc)
		parents['warning']  = newParent;
	}
}

function extractContent(nodeFields) {
	let contentFields = nodeFields.filter(element => 
								element.key.value === 'content');
	if (contentFields.length === 0) return undefined;
	if (contentFields.length > 1) {
		throw 'Block has more than 1 "content" field';
	}
	return contentFields[0].value;
}

function extractModsSize(node) {
	let modsIndex = node.children.findIndex(field => field.key.value === 'mods');
	if (modsIndex === -1) return undefined;
	let size = node.children[modsIndex].value.children.find(modsField => 
														modsField.key.value === 'size');
    if (size) {
		return size.value.value;
	}	
}

function processArrayOfNodes(contentArray, parents, errors) {
	/* Заполняем структуры */
	let textBlocks = {
		count: 0,
		sizes: new Set(),
		currentArrayIndex: -1
	};
	contentArray.forEach((node, index) => {
		if (node.type !== 'Object') throw 'Object is expected, but ' + node.type + ' is found';
		if (isTextBlock(node)) {
			let modsSize = extractModsSize(node);
			if (modsSize) {
				textBlocks.count += 1;
				textBlocks.currentArrayIndex = index;
				textBlocks.sizes.add(modsSize);
			}
		}
	});

	/* Проверяем структуры и дополняем errors */
	/* set.size олжен быть = 1 или 0 */
	if (parents['warning'] && textBlocks.count > 1 && textBlocks.sizes.size > 1) {
		errors.push(getError(WARNING_EQUAL_TEXT_SIZE, parents['warning'].loc));
	}

	/* Вызываем обработку дальше в грубину */
	contentArray.forEach(node => processNode(node, parents, errors));
}

function processContent(contentField, parents, errors) {
	if (contentField.type === 'Object') {
		processNode(contentField, parents, errors);
	} else if (contentField.type === 'Array') {
		processArrayOfNodes(contentField.children, parents, errors);
	} else {
		throw 'Object or Array is expected, but ' + contentField.type + ' is found';
	}
}

function processNode(node, parents, errors) {
	const currentParents = JSON.parse(JSON.stringify(parents));
	if (isWarningBlock(node)) {
		updateWarningParent(node.loc, parents);
	}
	const contentField = extractContent(node.children);
	if (contentField) {
		processContent(contentField, parents, errors);
	}
	parents = JSON.parse(JSON.stringify(currentParents));
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
	let errors = [];
	if (parsed.type === 'Object') {
		processNode(parsed, parents, errors);
	}
	return errors;
}

module.exports = lint;

lint(inputJson);