(function (angular) {
    angular.module('web.ui.api').
    /**
     * todo: describe WebYearPickerCtrl controller
     */
        controller('WebYearPickerCtrl', ['$scope', '$injector', function ($scope, $injector) {
            var $filter = $injector.get('$filter');
            var yearPaging = $injector.get('web.ui.api.yearPaging');
            var yearPickerConst = $injector.get('yearPickerConst');
            var _pageIndex;
            var _pageSize;
            var _model = angular.copy($scope.ngModel);

            /**
             * {int} get/set pageSize
             */
            Object.defineProperty($scope, 'pageSize', {
                get: function () {
                    return _pageSize;
                },
                set: function (value) {
                    if (value > 0) {
                        _pageSize = value;
                    }
                }
            });

            /**
             * {int} get/set pageIndex
             */
            Object.defineProperty($scope, 'pageIndex', {
                get: function () {
                    return _pageIndex;
                },
                set: function (value) {
                    if (value >= -1) {
                        _pageIndex = value;
                    }
                }
            });

            /**
             * {int} get/set model
             */
            Object.defineProperty($scope, 'model', {
                get: function () {
                    return _model;
                },
                set: function (value) {
                    _model = value;
                }
            });

            /**
             * {int} get now date
             */
            Object.defineProperty($scope, 'now', {
                get: function () {
                    return new Date();
                }
            });


            /**
             * apply model to ngModel
             * @param value {int}
             */
            function applyModel(value) {
                $scope.ngModel = value;
            }

            /**
             * get now page index
             * @param pageSize {int}
             * @returns {number} now page index
             */
            function nowPageIndex(pageSize) {
                var date = new Date();
                var year = date.getFullYear();
                return Math.ceil(year / pageSize);
            }

            // observer pageSize, pageIndex to regenerate year page
            $scope.$watch('[pageSize, pageIndex]', function (nv) {
                var pageIndex = nv[1];
                if (pageIndex == -1) {
                    pageIndex = nowPageIndex($scope.pageSize);
                }

                $scope.pageIndex = pageIndex;
                $scope.years = yearPaging(nv[0], pageIndex);
            }, true);

            // public method to scope
            $scope.applyModel = applyModel;
            $scope.nowPageIndex = nowPageIndex;

            // initialize
            if (!$scope.pageSize) {
                $scope.pageSize = yearPickerConst.PAGE_SIZE;
            }
            if (!$scope.pageIndex) {
                $scope.pageIndex = 1;
            }
        }]);
})(angular);