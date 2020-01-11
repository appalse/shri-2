'use strict'


function extractModsField(node, fieldName) {
	let modsIndex = node.children.findIndex(field => field.key.value === 'mods');
	if (modsIndex === -1) return undefined;
	let fieldValue = node.children[modsIndex].value.children.find(modsField => 
														modsField.key.value === fieldName);
    if (fieldValue) {
		return fieldValue.value.value;
	}
}

function extractModsType(node) {
	return extractModsField(node, 'type');
}

function extractModsSize(node) {
	return extractModsField(node, 'size');
}

function getTextBlockSize(node) {
	if (node.type !== 'Object') throw 'Object is expected, but ' + node.type + ' is found';
	if (isTextBlock(node)) {
		return extractModsSize(node);
	}
}

function getButtonSize(node) {
	if (node.type !== 'Object') throw 'Object is expected, but ' + node.type + ' is found';
	if (isButtonBlock(node)) {
		return extractModsSize(node);
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

module.exports = {
	extractModsType,
	extractModsSize,
	getTextBlockSize,
	getButtonSize,
	extractContent
}