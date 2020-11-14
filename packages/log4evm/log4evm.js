'use strict';
const Configuration = require('./libs/configuration');
const Logger = require('./libs/logger');
const Levels = require('./libs/levels');

// @dev define configuration file format 
let config;

const sendLogEventToAppender = (logEvent) => {
    let categoryName = logEvent.categoryName;
    if (!config.categories.has(categoryName)) {
        categoryName = 'default';
    }
    const catObject = config.categories.get(categoryName);
    catObject.appenders.forEach((appender) => {
        if (Levels.isConsole(catObject.level, logEvent.level)) appender.exec(logEvent);
    });
};
class Log4evm2 {
    /**
     * json configuration file 
     */
    static configure(_config) {
        config = new Configuration(_config);
    }

    static configureXML() {

    }

    /**
     *
     * @param category
     */
    static getLogger(category) {
        const cat = category || 'default';
        return new Logger(sendLogEventToAppender, cat);
    }
}
const def = {
    "appenders": {
        "console":{"type":"console"}
    },
    "categories": {
        "default": {"appenders": ["console"], "level": "trace"}
    }
};

Log4evm2.configure(def);

module.exports = Log4evm2;
