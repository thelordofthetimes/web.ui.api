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
            var yearPickerConst = $injector.get('yearPickerConst');
            var $filter = $injector.get('$filter');
            var yearPaging = $injector.get('web.ui.api.yearPaging');

            $scope.years = [];
            $scope.pageSize = yearPickerConst.PAGE_SIZE;
            $scope.pageIndex = 1;

            $scope.updateModel = function (value) {
                $scope.ngModel = value;
            };

            $scope.$watch('[pageSize, pageIndex]', function (nv) {
                $scope.years.length = 0;
                var rows = $filter('chunk')(yearPaging(nv[0], nv[1]), 4);
                rows.forEach(function (row) {
                    $scope.years.push(row);
                });
            }, true);
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
                    if (!scope.ngModel) {
                        scope.ngModel = 0;
                    }
                    scope.model = angular.copy(scope.ngModel);
                }
            }
        }])
})(angular);