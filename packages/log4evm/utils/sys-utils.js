'use strict';
const path = require('path');
const localAppenderMap = new Map();
localAppenderMap.set('console', '../appenders/console');
localAppenderMap.set('kafka', '../appenders/kafka');


const localLayoutMap = new Map();
localLayoutMap.set('basic', '../layouts/basic-layout');
localLayoutMap.set('coloured', '../layouts/coloured-layout');
localLayoutMap.set('json', '../layouts/json-layout');
localLayoutMap.set('detail', '../layouts/detail-layout');

class SysUtil {
    static loadAppender(name) {
        if (localAppenderMap.has(name)) {
            return require(localAppenderMap.get(name));
        }
        return false;
    }

    static loadLayout(name) {
        if (localLayoutMap.has(name)) {
            return require(localLayoutMap.get(name));
        }
        return false;
    }

 
    static parseStack(stack, type) {
        const list = [];
        if (typeof stack !== 'string') {
            return [];
        }
        const typeSet = new Set(['error', 'local', 'system']);
        const isFilterType = typeSet.has(type);
        const trimSurplusRe = /\s+at\s{1,4}/;
        const asFuncRe = /\s\[as\s.*\]/;
        const lineRowRe = /(.*)(:\d+:\d+$)/;
        const stackList = stack.split('\n');
        for (let i = 0; i < stackList.length; i++) {
            let current = stackList[i];
            if (!trimSurplusRe.test(current)) {
                continue;
            }
            const stack = {
                className: '-',
                methodName: '-',
                mode: 'o',
                file: '',
                line: '',
                row: '',
                type: 'error',
                source: current
            };
            current = current.replace(trimSurplusRe, '');
            let fileLineRow;
            if (current[current.length - 1] !== ')') {
                stack.mode = 'n.no.nf';
                fileLineRow = current;
            } else {
                const split = current.split(' (');
                if (split.length !== 2) {
                    continue;
                }
                const o = split[0];
                fileLineRow = split[1].substring(0, split[1].length - 1);

                const a = o.split('.');
                if (a.length === 1) {
                    if (/^new\s/.test(a[0])) {
                        stack.mode = 'n.hc.ht';
                        stack.className = a[0].substring(4, a[0].length);
                        stack.methodName = 'constructor';
                    } else {
                        stack.mode = 'n.no.hf';
                        stack.methodName = a[0];
                    }
                } else if (a.length === 2) {
                    if (o === 'Object.<anonymous>') {
                        stack.mode = 'n.ho.hf';
                        stack.className = 'Object';
                    } else if (a[0] === 'Object') {
                        stack.mode = 'n.ho.hf';
                        stack.className = 'Object';
                        stack.methodName = a[1];
                    } else if (a[0] === 'Function') {
                        stack.mode = 'n.nc.hs';
                        stack.className = 'Function';
                        stack.methodName = a[1];
                    } else {
                        stack.mode = 'n.hc.hs';
                        stack.className = a[0];
                        stack.methodName = a[1].replace(asFuncRe, '');
                    }

                } else if (a.length === 3) {
                    stack.mode = a[0] === 'Object' ? 's.ho.hp' : 'p.hc.hp';
                    stack.className = a[1];
                    stack.methodName = a[2].replace(asFuncRe, '');
                } else {
                    stack.mode = 'o';
                }
            }
            const match = fileLineRow.match(lineRowRe);
            if (match && match.length === 3) {
                stack.file = match[1];
                const split = match[2].split(':');
                stack.line = split[1];
                stack.row = split[2];
                stack.type = path.isAbsolute(stack.file) ? 'local' : 'system';
            }
            if (!isFilterType || stack.type === type) {
                list.push(stack);
            }
        }

        return list;
    }
}
module.exports = SysUtil;
