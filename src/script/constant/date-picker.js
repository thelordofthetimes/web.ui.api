(function(angular) {
    angular.module('web.ui.api').
        constant('web.ui.api.datePickerConst', {
            DAY_LENGTH: 42, // 7x6
            MONTHS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        });
})(angular);