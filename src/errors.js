'use strict'

const WARNING_EQUAL_TEXT_SIZE = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';

function getError(errorType, loc) {
	
	if (errorType === WARNING_EQUAL_TEXT_SIZE) {
		return {
			"code": WARNING_EQUAL_TEXT_SIZE,
			"error": "Тексты в блоке warning должны быть одного размера и должны быть заданы",
			"location": {
				"start": { "column": loc.start.column, "line": loc.start.line },
				"end": { "column": loc.end.column, "line": loc.end.line }
			}
		}
	}
	throw 'Uncatched error type: ' + errorType;
}

module.exports = {
    WARNING_EQUAL_TEXT_SIZE,
    getError
}