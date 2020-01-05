'use strict'

const BLOCK_TYPE_BUTTON = 'button';
const BLOCK_TYPE_TEXT = 'text';
const BLOCK_TYPE_PLACEHOLDER = 'placeholder';
const BLOCK_TYPE_WARNING = 'warning';

function getBlockTypeByName(blockName) {
	if (blockName === 'button') {
		return BLOCK_TYPE_BUTTON;
	} else if (blockName === 'text') {
        return BLOCK_TYPE_TEXT;
	} else if (blockName === 'placeholder') {
        return BLOCK_TYPE_PLACEHOLDER;
	} else if (blockName === 'warning') {
        return BLOCK_TYPE_WARNING;
	}
	return undefined;
}

function getBlockType(node) {
    let blockName = undefined;
	node.children.forEach(element =>  {
		if (element.key.value === 'block') {
            blockName = element.value.value;
        }
	});
	return getBlockTypeByName(blockName);
}

module.exports = {
    BLOCK_TYPE_BUTTON,
    BLOCK_TYPE_TEXT,
    BLOCK_TYPE_PLACEHOLDER,
    BLOCK_TYPE_WARNING,
    getBlockType
}