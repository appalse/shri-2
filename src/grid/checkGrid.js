'use strict'

const errors = require('./../errors.js');

function checkGrid(parents, errorsList) {
    const marketingWidth = parents.getGridMarketingWidth();
    const containerWidth = parents.getGridContainerWidth();
	if (marketingWidth >= containerWidth / 2) {
		errorsList.push(errors.getError(errors.ER_GRID_MUCH_MARKETING, parents.getGridLocation()));
	}
}

module.exports = checkGrid;