'use strict'


function getFullDeepCopy(jsonObject) {
	return JSON.parse(JSON.stringify(jsonObject));
}

function copyLocation(source, dest) {
	dest.start.line = source.start.line;
	dest.start.column = source.start.column;
	dest.end.line = source.end.line;
	dest.end.column = source.end.column;
}


class Parents {
    constructor() {
        this.warning = undefined;
        this.heading = {
            'h1': undefined,
            'h2': [],
            'h3': []
        };
        this.grid = undefined;
    }

    setWarningParent(parentValue) {
        this.warning = parentValue;
    }

    setH1Heading(name) {
        if (typeof name !== 'string') {
            throw 'Invalid h1 heading type: ' + (typeof name);
        }
        return this.heading.h1 = name;
    }

    setHeadingList(headingListName, listValue) {
        this.heading[headingListName] = listValue;
    }

	getWarningDeepCopy() { return this.warning ? getFullDeepCopy(this.warning) : undefined; }
	getH2ListDeepCopy() { return getFullDeepCopy(this.heading.h2); }
	getH3ListDeepCopy() { return getFullDeepCopy(this.heading.h3); }
	getGridDeepCopy() { return this.grid ? getFullDeepCopy(this.grid) : undefined; }
    getWarningEtalonTextSize() { return this.warning.etalonTextSize; }
    getWarningPreceding() { return this.warning.preceding; }
	getWarningLocation() { return this.warning.loc; }
    getH2Headings() { return this.heading.h2; }
    getH3Headings() { return this.heading.h3; }
    getGridLocation() { return this.grid.loc; }
    getGridContainerWidth() { return this.grid.mColumns; }
    getGridMarketingWidth() { return this.grid.marketingWidth; }

    hasWarning() { return this.warning !== undefined; }

    hasWarningPreceding() {
        return this.warning.preceding && this.warning.preceding.length > 0;
    }

    hasH1Heading() { return this.heading.h1 !== undefined; }
    hasH2Headings() { return this.heading.h2.length > 0; }
    hasH3Headings() { return this.heading.h3.length > 0; }

    updateWarning(nodeLocation) {
        if (this.warning) {
            this.warning['etalonTextSize'] = undefined;
            this.warning['preceding'] = [];
            copyLocation(nodeLocation, this.warning.loc);		
        } else {
            let newParent = {
                'etalonTextSize': undefined,
                'preceding': [],
                'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
            };
            copyLocation(nodeLocation, newParent.loc)
            this.warning  = newParent;
        }
    }

    updateGrid(modsMColumns, jsonNode) {
        if (this.grid) {
            this.grid['mColumns'] = modsMColumns;
            this.grid['marketingWidth'] = 0;
            copyLocation(jsonNode.loc, this.grid.loc);		
        } else {
            let newParent = {
                'mColumns': modsMColumns,
                'marketingWidth': 0,
                'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
            };
            copyLocation(jsonNode.loc, newParent.loc)
            this.grid  = newParent;
		}
	}

	addGridFraction(elemModsMCol, fractionBlockType) {
		if (!this.grid || !fractionBlockType) return;
		const info = 'info';
		const marketing = 'marketing';
		const fractionType = {
			payment: info, warning: info, product: info, 
			history: info, cover: info, collect: info, 
			articles: info, subscribtion: info, event: info,
			commercial: marketing, offer: marketing
        }
        if (fractionType[fractionBlockType] === marketing) {
            const width = parseInt(elemModsMCol, 10);
            this.grid.marketingWidth += width;
        }
	}

    addWarningPreceding(nodeLocation, blockName, modSize) {
        if(!this.warning) return; // TODO а надо ли?
        let newPreceding = {
            'block': blockName,
            'loc': { 'start': {'line': 0, 'column': 0}, 'end': {'line': 0, 'column': 0}}
        };
        copyLocation(nodeLocation, newPreceding.loc);
        newPreceding['size'] = modSize;
        this.warning['preceding'].push(newPreceding);
    }
    
    addWarningEtalonTextSize(modsSize) {
        if (this.warning.etalonTextSize) {
            return; // etalon text size has already set
        }
        if (modsSize) {
            this.warning['etalonTextSize'] = modsSize;
        } 
    }

    addHeadingInList(nodeLocation, headingListName) {
        if (!this.heading[headingListName]) {
            this.heading[headingListName] = [];
        }
        this.heading[headingListName].push({
            'loc': { 
                'start': { 'line': nodeLocation.start.line, 'column': nodeLocation.start.column }, 
                'end': { 'line': nodeLocation.end.line, 'column': nodeLocation.end.column }
            }
        });
    }
}

module.exports = Parents;