(function (angular) {
    angular.module('web.ui.api').
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