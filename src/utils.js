'use strict'

Array.prototype.inArray = function(element, comparer) { 
    for (let i = 0; i < this.length; i++) { 
        if (comparer(element, this[i])) {
            return true; 
        }
    }
    return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(element, comparer)) {
        this.push(element);
    }
};

function errorComparer(newError, error) {
    return error.code === newError.code 
            && error.error === newError.error
            && error.location.start.column === newError.location.start.column
            && error.location.start.line === newError.location.start.line
            && error.location.end.column === newError.location.end.column
            && error.location.end.line === newError.location.end.line;
}

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

function isWarningBlock(node) {
	return isSomeBlock(node.children, 'warning');
}

function isPlaceholderBlock(node) {
	return isSomeBlock(node.children, 'placeholder');
}

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
	errorComparer,
	isSomeBlock,
	isTextBlock,
	isButtonBlock,
	isWarningBlock,
	isPlaceholderBlock,
	extractModsType,
	extractModsSize,
	getTextBlockSize,
	getButtonSize,
	extractContent
}