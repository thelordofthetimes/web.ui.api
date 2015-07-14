(function(angular) {
    angular.module('web.ui.api').
    /**
     * todo: describe WebDayPickerCtrl controller
     */
        controller('WebDayPickerCtrl', ['$scope', '$injector', function ($scope, $injector) {
            var dayInMonth = $injector.get('web.ui.api.dayInMonth');
            var _days;
            var _model;

            /**
             * {Array<int>} get array of days in year-month
             */
            Object.defineProperty($scope, 'days', {
                get: function () {
                    return _days;
                }
            });

            /**
             * {int} get/set model (date)
             */
            Object.defineProperty($scope, 'model', {
                get: function() {
                    return _model;
                },
                set: function(value) {
                    _model = value;
                }
            });

            /**
             * apply value to [ngModel]
             * @param value
             */
            function applyModel(value) {
                $scope.ngModel = value;
            }

            // public method to scope
            $scope.applyModel = applyModel;

            // observer year, month to regenerate days
            $scope.$watch('[year, month]', function (nv) {
                _days = dayInMonth(nv[0], nv[1]);
            }, true);

        }]);
})(angular);