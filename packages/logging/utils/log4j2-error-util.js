'use strict';

class Log4j2Error extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = 'Log4j2Error';
    }


    static isJson(o, message) {
        if (typeof o === 'object' && !Array.isArray(o)) {
            return true;
        }
        throw new Log4j2Error(message, 1);
    }


    static isObject(o, message) {
        if (typeof o === 'object') {
            return true;
        }
        throw new Log4j2Error(message, 2);
    }


    static isArray(o, message) {
        if (Array.isArray(o)) {
            return true;
        }
        throw new Log4j2Error(message, 3);
    }

   
    static keyExist(o, key, message) {
        if (key in o) {
            return true;
        }
        throw new Log4j2Error(message, 4);
    }
}

module.exports = Log4j2Error;
