(function(angular) {
    angular.module('web.ui.api').
        controller('WebDayPickerCtrl', ['$scope', '$injector', function($scope, $injector) {

        }]).
        directive('webDayPicker', [function() {
            return {
                restrict: 'AE',
                scope: {
                    ngModel: '=',
                    year: '=',
                    month: '='
                },
                templateUrl: 'web.ui.template/day-picker.html',
                controller: 'WebDayPickerCtrl'
            }
        }]);
})(angular);