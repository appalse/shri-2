'use strict';

const utils = require('./utils.js');
const checkTextSize = require('./warning/checkTextSize.js');
const checkButtonsSizes = require('./warning/checkButtonsSizes.js');
const checkButtonPosition = require('./warning/checkButtonPosition.js');
const checkPlaceholderSize = require('./warning/checkPlaceholderSize.js');
const checkTextH1 = require('./text/checkTextH1.js');
const checkTextH2 = require('./text/checkTextH2.js');
const checkTextH3 = require('./text/checkTextH3.js');
const checkGrid = require('./grid/checkGrid.js');
const Parents = require('./Parents.js');
const ErrorList = require('./ErrorList.js');

class Processor {
    constructor() {
        // class with objects in order to collect information about nodes while going through ast
        this.parents = new Parents();
        this.headingSiblings = this.createHeadingSiblings();
        // output array
        this.errorsList = new ErrorList();
    }

    createHeadingSiblings() {
        return {
            h1: [],
            h2: [],
            h3: []
        };
    }

    getErrors() { return this.errorsList.get(); }

    processNode(jsonNode) {
        if (!jsonNode) return;
        if (jsonNode.type === 'Array') {
            this.processArray(jsonNode.children);
        } else if (jsonNode.type === 'Object') {
            this.processObject(jsonNode, this.createHeadingSiblings());
        } else {
            throw new Error('Object or Array is expected, but ' + jsonNode.type + ' is found');
        }
    }

    processArray(jsonArray) {
        if (!jsonArray) return;
        const headingSiblings = this.createHeadingSiblings();
        // process nodes one by one, going to the deepest level in every node
        jsonArray.forEach(jsonNode => {
            if (!jsonNode) return;
            if (jsonNode.type === 'Array' && jsonNode.children && jsonNode.children.length > 0) {
                this.processObject(jsonNode.children[0], headingSiblings);
            } else {
                this.processObject(jsonNode, headingSiblings);
            }
        });
    }

    processObject(jsonNode, currentHeadingSiblings) {
        // update siblings
        this.headingSiblings = currentHeadingSiblings;
        // blockType can look like 'block'/'block__elem'/undefined
        const blockType = utils.getBlockElemName(jsonNode);
        // update warning parents
        if (blockType === 'warning') { this.parents.updateWarning(jsonNode.loc); }
        // update grid parents
        const modsMColumns = utils.getGridMColumns(blockType, jsonNode);
        if (modsMColumns) { this.parents.updateGrid(modsMColumns, jsonNode); }
        const elemModsMCol = utils.getElemModsMCol(jsonNode);
        if (blockType === 'grid__fraction' && elemModsMCol) {
            const contentField = utils.extractContent(jsonNode.children);
            if (contentField && contentField.children && contentField.children.length > 0) {
                // it is guaranteed that grid fraction has only one block inside its content
                const fractionBlockType = utils.getBlockElemName(contentField.children[0]);
                this.parents.addGridFraction(elemModsMCol, fractionBlockType);
            }
        }
        // save parents before node processing
        const previousParents = this.getPreviousParents();
        // node processing
        this.processBlock(blockType, jsonNode);
        // restore parents from saved value
        this.setPreviousParents(blockType, {
            previousWarning: previousParents.previousWarning,
            previousH2: previousParents.previousH2,
            previousH3: previousParents.previousH3,
            previousGrid: previousParents.previousGrid
        });
    }

    processBlock(blockType, jsonNode) {
        this.findErrorsBefore(blockType, jsonNode);
        this.goDeeper(jsonNode); // Go deeper through ast
        this.findErrorsAfter(blockType, jsonNode);
    }

    goDeeper(jsonNode) {
        if (!jsonNode.children) return;
        const contentField = utils.extractContent(jsonNode.children);
        if (contentField) {
            this.processNode(contentField);
        }
    }

    // SAVING AND RESTORING PARENTS

    getPreviousParents() {
        return {
            previousWarning: this.parents.getWarningDeepCopy(),
            previousH2: this.parents.getH2ListDeepCopy(),
            previousH3: this.parents.getH3ListDeepCopy(),
            previousGrid: this.parents.getGridDeepCopy()
        };
    }

    setPreviousParents(blockType, previousParents) {
        if (blockType === 'warning' && previousParents.previousWarning) {
            this.parents.setWarningParent(previousParents.previousWarning);
        }
        if (blockType === 'text') {
            this.parents.setHeadingList('h2', previousParents.previousH2);
            this.parents.setHeadingList('h3', previousParents.previousH3);
        }
    }

    // FINDING ERRORS

    findErrorsBefore(blockType, jsonNode) {
        const modsSize = utils.extractModsSize(jsonNode);
        this.findWarningErrorsBefore(blockType, modsSize, jsonNode.loc);
        const textType = utils.extractModsType(jsonNode);
        this.findHeadingErrorsBefore(blockType, textType, jsonNode.loc);
    }

    findErrorsAfter(blockType, jsonNode) {
        this.findWarningErrorsAfter(blockType);
        this.findGridErrorsAfter(blockType);
    }

    findWarningErrorsBefore(blockType, modsSize, nodeLocation) {
        if (this.parents.hasWarning()) {
            if (blockType === 'button') {
                this.parents.addWarningPreceding(nodeLocation, 'button', modsSize);
            }
            if (blockType === 'text') {
                this.parents.addWarningEtalonTextSize(modsSize);
                checkTextSize(modsSize,
                    this.parents.getWarningEtalonTextSize(),
                    this.parents.getWarningLocation(),
                    this.errorsList);
            }
            if (blockType === 'placeholder') {
                checkPlaceholderSize(modsSize, nodeLocation, this.errorsList);
                if (this.parents.hasWarningPreceding()) {
                    checkButtonPosition(this.parents.getWarningPreceding(), this.errorsList);
                }
            }
        }
    }

    findWarningErrorsAfter(blockType) {
        // Check buttons sizes before exit from node
        if (blockType === 'warning' && this.parents.hasWarning() && this.parents.hasWarningPreceding()) {
            checkButtonsSizes(this.parents.getWarningEtalonTextSize(),
                this.parents.getWarningPreceding(),
                this.errorsList);
        }
    }

    findHeadingErrorsBefore(blockType, textType, nodeLocation) {
        if (blockType === 'text') {
            if (textType === 'h2' || textType === 'h3') {
                this.parents.addHeadingInList(nodeLocation, textType);
            }
            if (textType === 'h1' || textType === 'h2' || textType === 'h3') {
                this.headingSiblings[textType].push({
                    loc: {
                        start: { line: nodeLocation.start.line, column: nodeLocation.start.column },
                        end: { line: nodeLocation.end.line, column: nodeLocation.end.column }
                    }
                });
            }
            checkTextH1(textType, this.parents, nodeLocation, this.errorsList);
            checkTextH2(textType, this.parents, this.headingSiblings.h2, this.errorsList);
            checkTextH3(textType, this.parents, this.headingSiblings.h3, this.errorsList);
        }
    }

    findGridErrorsAfter(blockType) {
        if (blockType === 'grid' && this.parents.hasGrid()) {
            checkGrid(this.parents, this.errorsList);
        }
    }
}

module.exports = Processor;
