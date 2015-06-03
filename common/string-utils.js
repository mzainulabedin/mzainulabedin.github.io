﻿
if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str){
        return this.slice(-str.length) == str;
    };
}

if (typeof String.prototype.trimStart != 'function') {
    String.prototype.trimStart = function (str) {
        return this.replace('^' + str);
    };
}

if (typeof String.prototype.trimEnd != 'function') {
    String.prototype.trimEnd = function (str) {
        return this.replace(str + '$');
    };
}


