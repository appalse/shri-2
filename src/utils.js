'use strict'


function getBlockElemName(node) {
    let block = '';
    let elem = '';
    if (!node.children) return undefined;
    node.children.forEach(element =>  {
        if (element && element.key && element.value) {
            if (element.key.value === 'block') {
                block = element.value.value;
            }
            if (element.key.value === 'elem') {
                elem = element.value.value;
            }
        }
    });
    return (block && elem) 
                ? block + '__' + elem
                : (block ? block : undefined); 
}

function isSomeBlock(nodeChildren, blockName) {
    if (!nodeChildren) return false;
	return nodeChildren.some(element => {
        return element && element.key && element.value 
                ? (element.key.value === 'block' && element.value.value === blockName) 
                : false;
    });
}

function isTextBlock(node) {
	return isSomeBlock(node.children, 'text');
}

function isButtonBlock(node) {
	return isSomeBlock(node.children, 'button');
}

function extractModsField(node, fieldKey, fieldValue) {
    if (!node.children) return undefined;
	let modsIndex = node.children.findIndex(field => {
        return field && field.key
                ? (field.key.value === fieldKey) 
                : false;
    });
    if (modsIndex === -1 
        || !node.children[modsIndex].value 
        || !node.children[modsIndex].value.children ) return undefined;
	let fieldName = node.children[modsIndex].value.children.find(modsField => {
        return modsField && modsField.key
                    ? (modsField.key.value === fieldValue)
                    : false
    });
    if (fieldName) {
		return fieldName.value.value;
	}
}

function extractModsType(node) {
	return extractModsField(node, 'mods', 'type');
}

function extractModsSize(node) {
	return extractModsField(node, 'mods', 'size');
}

function getTextBlockSize(node) {
	if (node.type !== 'Object') return undefined;
	if (isTextBlock(node)) {
		return extractModsSize(node);
	}
}

function getButtonSize(node) {
	if (node.type !== 'Object') return undefined;
	if (isButtonBlock(node)) {
		return extractModsSize(node);
	}
}

function getGridMColumns(blockType, node) {
	if (node.type !== 'Object') return undefined;
	if (blockType === 'grid') {
		return extractModsField(node, 'mods', 'm-columns');
	}
}

function extractContent(nodeFields) {
    if (!nodeFields) return undefined;
    let contentFields = nodeFields.filter(element => {
        return element && element.key
                    ? (element.key.value === 'content')
                    : false
    });
	if (contentFields.length !== 1) return undefined;
	return contentFields[0].value;
}

function getElemModsMCol(node) {
    return extractModsField(node, 'elemMods', 'm-col');
}

module.exports = {
    getBlockElemName,
	extractModsType,
	extractModsSize,
	getTextBlockSize,
	getButtonSize,
	getGridMColumns,
	extractContent,
	getElemModsMCol
}