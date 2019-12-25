'use strict'

function lint(jsonString) {
	let result = [
		{
			"code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
			"error": "Тексты в блоке warning должны быть одного размера",
			"location": {
				"start": { "column": 1, "line": 1 },
				"end": { "column": 2, "line": 22 }
			}
		}
	];

	return result;
}

module.exports = lint;