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
                service.getList()
                .success(function (data, status, headers, config) {
                    $scope.items = data;
                })
                .error(function (data, status, headers, config) {
                    setMessage(data, 'error', data.errors);
                });
            }

            //GET
            var get = function (id) {
                if (id!=null){
                    service.get(id)
                    .success(function (data, status, headers, config) {
                        $scope.item = data;
                    })
                    .error(function (data, status, headers, config) {
                        setMessage(data, 'error', data.errors);
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
                    action.success(function (data, status, headers, config) {
                        if (data.message) {
                            setMessage(data.message, 'error', data.errors);
                        } else {
                            setMessage('Saved successfully', 'success', null);
                            $location.url('/item/' + data._id);
                        }
                    })
                    .error(function (data, status, headers, config) {
                        setMessage(data, 'error', data.errors);
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