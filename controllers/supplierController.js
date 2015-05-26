'use strict';
define(['app'], function (app) {
    app.controller('supplierController',
    [
        '$scope',
        'supplierService',
        '$routeParams',
        '$location',
        '$window',
        function ($scope, service, $routeParams, $location, $window) {
            $scope.message = {
                text: '',
                type: '',
                messageClass: '',
                errors: null
            };

            $scope.page =
            {
                title: 'Supplier'
            }

            //GET LIST
            var getList = function (search, orderBy, pageNumber) {
                $scope.isCollapsed = true;
                $scope.loading = true;

                $scope.pageSize = 5;
                $scope.pageNumber = pageNumber || 0;

                $scope.search = search || "";
                $scope.orderBy = orderBy || "";

                //Filter
                $scope.filter = function () {
                    getList($scope.search, $scope.orderBy, $scope.pageNumber, $scope.pageSize);
                };

                //Page 
                $scope.pageChanged = function () {
                    getList($scope.search, $scope.orderBy, $scope.pageNumber, $scope.pageSize);
                };

                //Sort
                $scope.changeSorting = function ($event, column) {
                    
                    if (column != null && column != "") {
                        var sortColumn = column;
                        if (sortColumn.indexOf("-") == 0) {
                            sortColumn = sortColumn.replace(/^-/, '');
                        }
                        if ($scope.orderBy == sortColumn) {
                            if (column.indexOf("-") == 0) {
                                column = sortColumn;
                            } else {
                                column = "-" + column;
                            }
                        }
                        $scope.orderBy = column;
                        getList($scope.search, $scope.orderBy, $scope.pageNumber, $scope.pageSize);
                    }
                };

                //Sort Icon
                $scope.getIcon = function ($event, column) {
                    var sortDirectionClass = "";
                    if (column != null && column != "") {
                        var sortColumn = $scope.orderBy;
                        if (sortColumn.indexOf("-") == 0) {
                            sortColumn = sortColumn.replace(/^-/, '');
                        }
                        if (column == sortColumn) {
                            if ($scope.orderBy.indexOf("-") == 0) {
                                sortDirectionClass = 'glyphicon-chevron-up';
                            } else {
                                sortDirectionClass = 'glyphicon-chevron-down';
                            }
                        }
                    }
                    return sortDirectionClass;
                }


                service.getList($scope.search, $scope.orderBy, $scope.pageNumber, $scope.pageSize)
                .success(function (data, status, headers, config) {
                    $scope.suppliers = data.data;
                    $scope.totalCount = data.total_count;
                    $scope.pageNumber = data.page_number;
                    $scope.loading = $scope.isCollapsed = false;                     
                })
                .error(function (data, status, headers, config) {
                    setMessage(data, 'error', data.errors);
                    $scope.loading = $scope.isCollapsed = false;
                    $scope.suppliers = [];
                });

            }


            //GET
            var get = function (id) {
                if (id != null) {
                    $scope.loading = true;
                    service.get(id)
                    .success(function (data, status, headers, config) {
                        $scope.supplier = data;
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
                        action = service.insert($scope.supplier);
                    } else {
                        action = service.update($routeParams.id, $scope.supplier);
                    }
                }

                if (action) {
                    $scope.loading = true;
                    action.success(function (data, status, headers, config) {
                        if (data.message) {
                            setMessage(data.message, 'error', data.errors);
                        } else {
                            setMessage('Saved successfully', 'success', null);
                            $location.url('/supplier/' + data._id);
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
                action = service.delete($routeParams.id, $scope.supplier)
                .success(function (data, status, headers, config) {
                    if (data!=null && data.message!=null) {
                        setMessage(data.message, 'error', data.errors);
                    } else {
                        setMessage('Deleted successfully', 'success', null);
                        $location.url('/supplier/');
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
            $scope.back = function () {
                $window.history.back();
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
            $scope.getList = getList;
            $scope.update = update;
            $scope.delete = deleteRecord;
        }
    ]);
});