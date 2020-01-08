'use strict'

function getBlockName(node) {
    let blockName = undefined;
    node.children.forEach(element =>  {
        if (element.key.value === 'block') {
                blockName = element.value.value;
            }
    });
    return blockName;
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

module.exports = {
    getBlockName,
    isSomeBlock,
    isTextBlock,
    isButtonBlock,
    isWarningBlock,
    isPlaceholderBlock
}
