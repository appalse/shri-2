'use strict'

function isSomeBlock(nodeChildren, blockName) {
	return nodeChildren.some(element => 
								element.key.value === 'block' 
								&& element.value.value === blockName);
}

function isTextBlock(node) {
	return isSomeBlock(node.children, 'text');
}

function isButtonBlock(node) {
	return isSomeBlock(node.children, 'button');
}

function isPlaceholderBlock(node) {
	return isSomeBlock(node.children, 'placeholder');
}

function isWarningBlock(node) {
	return isSomeBlock(node.children, 'warning');
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
    isSomeBlock,
	isTextBlock,
	isButtonBlock,
	isPlaceholderBlock,
    isWarningBlock,
	extractModsSize,
	getTextBlockSize,
	getButtonSize,
    extractContent
}