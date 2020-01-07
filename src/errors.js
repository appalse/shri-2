'use strict'

const WARNING_EQUAL_TEXT_SIZE = 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL';
const INVALID_BUTTON_SIZE = 'WARNING.INVALID_BUTTON_SIZE';
const INVALID_BUTTON_POSITION = 'WARNING.INVALID_BUTTON_POSITION';
const INVALID_PLACEHOLDER_SIZE = 'WARNING.INVALID_PLACEHOLDER_SIZE';
const SEVERAL_H1 = 'TEXT.SEVERAL_H1';
const INVALID_H2_POSITION = 'TEXT.INVALID_H2_POSITION';
const INVALID_H3_POSITION = 'TEXT.INVALID_H3_POSITION';
const TOO_MUCH_MARKETING_BLOCKS = 'GRID.TOO_MUCH_MARKETING_BLOCKS';

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
    } else if (errorType === INVALID_BUTTON_SIZE) {
		return {
			"code": INVALID_BUTTON_SIZE,
			"error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
			"location": {
				"start": { "column": loc.start.column, "line": loc.start.line },
				"end": { "column": loc.end.column, "line": loc.end.line }
			}
		}
	} else if (errorType === INVALID_BUTTON_POSITION) {
		return {
			"code": INVALID_BUTTON_POSITION,
			"error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
			"location": {
				"start": { "column": loc.start.column, "line": loc.start.line },
				"end": { "column": loc.end.column, "line": loc.end.line }
			}
		}
    } else if (errorType === INVALID_PLACEHOLDER_SIZE) {
		return {
			"code": INVALID_PLACEHOLDER_SIZE,
			"error": "Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l",
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
    INVALID_BUTTON_SIZE,
    INVALID_BUTTON_POSITION,
    INVALID_PLACEHOLDER_SIZE,
    SEVERAL_H1,
    INVALID_H2_POSITION,
    INVALID_H3_POSITION,
    TOO_MUCH_MARKETING_BLOCKS,
    getError
}