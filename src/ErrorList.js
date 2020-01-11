'use strict'


Array.prototype.inArray = function(element, comparer) { 
    for (let i = 0; i < this.length; i++) { 
        if (comparer(element, this[i])) {
            return true; 
        }
    }
    return false; 
}; 

Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(element, comparer)) {
        this.push(element);
    }
};

function errorComparer(newError, error) {
    return error.code === newError.code 
            && error.error === newError.error
            && error.location.start.column === newError.location.start.column
            && error.location.start.line === newError.location.start.line
            && error.location.end.column === newError.location.end.column
            && error.location.end.line === newError.location.end.line;
};


class ErrorList {
    constructor() {
        this.errorList = [];
    }

    push(newError) {
        this.errorList.push(newError);
    }

    pushIfNotExist(newError) {
        this.errorList.pushIfNotExist(newError, errorComparer);
    }

    get() {
        return this.errorList;
    }

};

module.exports = ErrorList;