'use strict';

const ER_WARN_TXT_NOT_EQ = 'ER_WARN_TXT_NOT_EQ';
const ER_WARN_BTN_SIZE = 'ER_WARN_BTN_SIZE';
const ER_WARN_BTN_POS = 'ER_WARN_BTN_POS';
const ER_WARN_PLACEHOLDER_SIZE = 'ER_WARN_PLACEHOLDER_SIZE';
const ER_TXT_H1 = 'ER_TXT_H1';
const ER_TXT_H2 = 'ER_TXT_H2';
const ER_TXT_H3 = 'ER_TXT_H3';
const ER_GRID_MUCH_MARKETING = 'ER_GRID_MUCH_MARKETING';

const CODES = {
    ER_WARN_TXT_NOT_EQ: {
        id: ER_WARN_TXT_NOT_EQ,
        type: 'WARNING',
        code: 'TEXT_SIZES_SHOULD_BE_EQUAL',
        text: 'Тексты в блоке warning должны быть одного размера и должны быть заданы'
    },
    ER_WARN_BTN_SIZE: {
        id: ER_WARN_BTN_SIZE,
        type: 'WARNING',
        code: 'INVALID_BUTTON_SIZE',
        text: 'Размер кнопки блока warning должен быть на 1 шаг больше эталонного'
    },
    ER_WARN_BTN_POS: {
        id: ER_WARN_BTN_POS,
        type: 'WARNING',
        code: 'INVALID_BUTTON_POSITION',
        text: 'Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности'
    },
    ER_WARN_PLACEHOLDER_SIZE: {
        id: ER_WARN_PLACEHOLDER_SIZE,
        type: 'WARNING',
        code: 'INVALID_PLACEHOLDER_SIZE',
        text: 'Некорретный размер блока placeholder в блоке warning, допустимые значения: s, m, l'
    },
    ER_TXT_H1: {
        id: ER_TXT_H1,
        type: 'TEXT',
        code: 'SEVERAL_H1',
        text: 'Заголовок первого уровня должен быть единственным на странице'
    },
    ER_TXT_H2: {
        id: ER_TXT_H2,
        type: 'TEXT',
        code: 'INVALID_H2_POSITION',
        text: 'Заголовок второго уровня не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности'
    },
    ER_TXT_H3: {
        id: ER_TXT_H3,
        type: 'TEXT',
        code: 'INVALID_H3_POSITION',
        text: 'Заголовок третьего уровня не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности'
    },
    ER_GRID_MUCH_MARKETING: {
        id: ER_GRID_MUCH_MARKETING,
        type: 'GRID',
        code: 'TOO_MUCH_MARKETING_BLOCKS',
        text: 'Маркетинговые блоки занимают больше половины или ровно половину от всех колонок блока grid'
    }
};

function getError(errorCode, loc) {
    const e = CODES[errorCode];
    if (!e) {
        throw new Error('This error code: ' + errorCode + ' was not processed in getError function');
    }
    const fullErrorCode = e.type + '.' + e.code;
    return {
        code: fullErrorCode,
        error: e.text,
        location: {
            start: { column: loc.start.column, line: loc.start.line },
            end: { column: loc.end.column, line: loc.end.line }
        }
    };
}

module.exports = {
    ER_WARN_TXT_NOT_EQ,
    ER_WARN_BTN_SIZE,
    ER_WARN_BTN_POS,
    ER_WARN_PLACEHOLDER_SIZE,
    ER_TXT_H1,
    ER_TXT_H2,
    ER_TXT_H3,
    ER_GRID_MUCH_MARKETING,
    getError
};
