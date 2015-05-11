'use strict';
define(['app'], function (app) {
    app.controller('itemController',
    [
        '$scope',
        'itemService',
        '$routeParams',
        '$location',
        function ($scope, service, $routeParams, $location) {
            $scope.message = {
                text: '',
                type: '',
                messageClass: '',
                errors: null
            };

            $scope.page =
            {
                title: 'Items'
            }

            //GET LIST
            var getList = function () {
                $scope.isCollapsed = true;
                $scope.loading = true;
                $scope.predicate = 'name';
                $scope.reverse = false;
                service.getList()
                .success(function (data, status, headers, config) {
                    $scope.items = data;
                    $scope.loading = $scope.isCollapsed = false;
                })
                .error(function (data, status, headers, config) {
                    setMessage(data, 'error', data.errors);
                    $scope.loading = $scope.isCollapsed = false;
                });

            }
            $scope.sort = {
                active: '',
                descending: false
            }

            $scope.changeSorting = function (column) {

                var sort = $scope.sort;

                if (sort.active == column) {
                    sort.descending = !sort.descending;
                }
                else {
                    sort.active = column;
                    sort.descending = false;
                }
            };

            $scope.getIcon = function (column) {

                var sort = $scope.sort;

                if (sort.active == column) {
                    return sort.descending
                      ? 'glyphicon-chevron-up'
                      : 'glyphicon-chevron-down';
                }

                return ''; //glyphicon-star
            }


            //GET
            var get = function (id) {
                if (id != null) {
                    $scope.loading = true;
                    service.get(id)
                    .success(function (data, status, headers, config) {
                        $scope.item = data;
                        $scope.loading = false;
                    })
                    .error(function (data, status, headers, config) {
                        setMessage(data, 'error', data.errors);
                        $scope.loading = false;
                    });
                }
            }

            //UPDATE
            var update = function () {
                var action;
                if ($scope.form.$valid) {
                    if ($routeParams.id == 'new') {
                        action = service.insert($scope.item);
                    } else {
                        action = service.update($routeParams.id, $scope.item);
                    }
                }

                if (action) {
                    $scope.loading = true;
                    action.success(function (data, status, headers, config) {
                        if (data.message) {
                            setMessage(data.message, 'error', data.errors);
                        } else {
                            setMessage('Saved successfully', 'success', null);
                            $location.url('/item/' + data._id);
                        }
                        $scope.loading = false;
                    })
                    .error(function (data, status, headers, config) {
                        setMessage(data, 'error', data.errors);
                        $scope.loading = false;
                    });
                }
            }

            //DELETE
            var deleteRecord = function () {
                var action;
                action = service.delete($routeParams.id, $scope.item)
                .success(function (data, status, headers, config) {
                    if (data!=null && data.message!=null) {
                        setMessage(data.message, 'error', data.errors);
                    } else {
                        setMessage('Deleted successfully', 'success', null);
                        $location.url('/item/');
                    }
                })
                .error(function (data, status, headers, config) {
                    setMessage(data, 'error', data.errors);
                });
            }

            //TODO: move it to some util class
            //private methods
            var setMessage = function (message, type, errors) {
                $scope.message = {
                    text: message,
                    type: type,
                    messageClass: type == 'error' ? 'alert alert-danger' : (type == 'success' ? 'alert alert-success' : ''),
                    errors: errors
                };
            }
            

            //init
            if ($routeParams.id == null) {
                getList();
            } else {
                if ($routeParams.id == 'new') {
                    get();
                } else {
                    get($routeParams.id);
                }
            }

            //public method
            $scope.update = update;
            $scope.delete = deleteRecord;
        }
    ]);
});