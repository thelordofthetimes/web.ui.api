(function(angular) {
    angular.module('web.ui.api').
    /**
     * todo: describe WebMonthPickerCtrl controller
     */
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
        }]);
})(angular);