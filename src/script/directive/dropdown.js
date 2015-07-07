(function(angular) {
    angular.module('web.ui.api').
        directive('webDropdown', function() {
            // define directive
            return {
                restrict: 'AE',
                scope: {
                    ngModel: '=?'
                },
                templateUrl: 'web.ui.template/dropdown.html'
            }
        });
})(angular);