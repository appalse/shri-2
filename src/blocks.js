'use strict'

function getBlockName(node) {
    let block = '';
    let elem = '';
    node.children.forEach(element =>  {
        if (element.key.value === 'block') {
            block = element.value.value;
        }
        if (element.key.value === 'elem') {
            elem = element.value.value;
        }
    });
    return (block && elem) 
                        ? block + '__' + elem
                        : (block ? block : undefined); 
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
