(function (angular) {
    angular.module('web.ui.api').
        constant('yearPickerConst', {
            PAGE_SIZE: 12
        }).
        service('web.ui.api.yearPaging', [function () {
            /**
             * get page of year
             * @param pageSize {int}
             * @param pageIndex {int}
             * @returns {Array<int>}
             */
            function yearPaging(pageSize, pageIndex) {
                var startYear = (pageIndex - 1) * pageSize;
                var years = [];
                for (var index = 0; index < pageSize; index++) {
                    years.push(startYear + index);
                }
                return years;
            }

            // define service
            return yearPaging;
        }]).
        controller('WebYearPickerCtrl', ['$scope', '$injector', function ($scope, $injector) {
            var $filter = $injector.get('$filter');
            var yearPaging = $injector.get('web.ui.api.yearPaging');
            var yearPickerConst = $injector.get('yearPickerConst');

            // initialize value
            $scope.years = [];
            if (!$scope.pageSize) {
                $scope.pageSize = yearPickerConst.PAGE_SIZE;
            }
            if (!$scope.pageIndex) {
                $scope.pageIndex = 1;
            }

            $scope.applyModel = function (value) {
                console.log(value);
                $scope.ngModel = value;
            };

            $scope.$watch('[pageSize, pageIndex]', function (nv) {
                var pageIndex = nv[1];
                if (pageIndex == -1) {
                    var date = new Date();
                    var year = date.getFullYear();
                    pageIndex = Math.ceil(year / $scope.pageSize);
                }
console.log(nv, pageIndex);
                $scope.pageIndex = pageIndex;
                $scope.years = yearPaging(nv[0], pageIndex);
            }, true);

            var model = angular.copy($scope.ngModel);
            Object.defineProperty($scope, 'model', {
                get: function () {
                    return model;
                },
                set: function (value) {
                    model = value;
                }
            });
        }]).
        directive('webYearPicker', [function () {
            return {
                restrict: 'AE',
                templateUrl: 'web.ui.template/year-picker.html',
                scope: {
                    ngModel: '=?'
                },
                controller: 'WebYearPickerCtrl',
                link: function (scope, elem, attrs) {
                }
            }
        }])
})(angular);