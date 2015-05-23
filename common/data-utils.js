'use strict';

function dataUtils() {

    var getIcon = function (sort, column) {

        //var sort = $scope.sort;

        if (sort.active == column) {
            return sort.descending
              ? 'glyphicon-chevron-up'
              : 'glyphicon-chevron-down';
        }

        return ''; //glyphicon-star
    }
}

var Common = (function (text, type, errors) {

    var static_var; //static private var

    var Message = function (text, type, errors) {
        //private
        var isError;
        var privateFn = function () { };

        //public
        this.text = text;
        this.type = type | "message";
        this.errors = [];

        if (errors) {
            for (var err in errors) {
                if (obj.hasOwnProperty(err) && typeof obj[err] !== 'function') {
                    this.errors.push({ text: err.message, name: err.name, value: err.value });
                }
            }
        }

        this.add = function (text, name, value) {
            this.errors.push({ text: text, name: name, value: value });
        };
    };

    return Message;

})();


//Apple.prototype.getInfo = function () {
//    return this.color + ' ' + this.type + ' apple';
//};


