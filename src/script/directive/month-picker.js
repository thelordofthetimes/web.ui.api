(function (angular) {
    angular.module('web.ui.api').
        constant('web.ui.api.monthPickerConst', {
            MONTHS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }).
        controller('WebMonthPickerCtrl', ['$scope', '$injector', function ($scope, $injector) {
            var monthPickerConst = $injector.get('web.ui.api.monthPickerConst');
            var _model = angular.copy($scope.ngModel);

            /**
             * Array<int> get months in year
             */
            Object.defineProperty($scope, 'months', {
                get: function () {
                    return monthPickerConst.MONTHS
                }
            });

            /**
             * get/set model
             */
            Object.defineProperty($scope, 'model', {
                get: function () {
                    return _model;
                },
                set: function (value) {
                    if (value >= 0 && value < 12) {
                        _model = value;
                    }
                }
            });

            /**
             * apply value for [$scope.ngModel]
             * @param value
             */
            function applyModel(value) {
                $scope.ngModel = value;
            }

            // public method to scope
            $scope.applyModel = applyModel;
        }]).
        directive('webMonthPicker', [function () {
            return {
                restrict: 'AE',
                templateUrl: 'web.ui.template/month-picker.html',
                scope: {
                    ngModel: '=?'
                },
                controller: 'WebMonthPickerCtrl'
            }
        }])
})(angular);