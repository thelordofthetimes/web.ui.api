(function(angular) {
    angular.module('web.ui.api').
        controller('WebYearPickerCtrl', ['$scope', function($scope) {
            $scope.years = [];

        }]).
        directive('webYearPicker', [function() {
            return {
                restrict: 'AE',
                templateUrl: 'web.ui.template/year-picker.html',
                scope: {
                    ngModel: '=?'
                },
                controller: 'WebYearPickerCtrl',
                link: function(scope, elem, attrs) {
                    if (!scope.ngModel) {}
                    scope.ngModel = 0;
                }
            }
        }])
})(angular);