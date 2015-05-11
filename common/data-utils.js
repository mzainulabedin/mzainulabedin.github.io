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


