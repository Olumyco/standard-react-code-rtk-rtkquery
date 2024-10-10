export const slugify = (str = '') => {
    return str.replace(/\s/g, '-').toLowerCase();
};

export function isEmptyObject(obj) {
    return !!obj && !Object.keys(obj).length && obj.constructor === Object;
}

/**
 * 
 * @param {string} str 
 * @returns {boolean}
 */

export function isEmptyOrWhiteSpace(str) {
    return (str.match(/^\s*$/) || []).length > 0;
}

export function filterObject(obj) {
    const newObj = {};
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && obj[i]) {
            newObj[i] = obj[i];
        }
    }
    
    return newObj;
}

/**
 * 
 * @returns {string}
 */

export function uid() {
    return (Math.random()).toString(32).slice(2, 12);
}