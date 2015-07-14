(function (angular) {
    angular.module('web.ui.api').
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