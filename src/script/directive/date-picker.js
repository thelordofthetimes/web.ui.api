(function(angular) {
    angular.module('web.ui.api').
        directive('webDatePicker', [function() {
            /**
             * link function
             * @param scope
             * @param elem
             * @param atrrs
             */
            function link(scope, elem, atrrs) {

            }

            // define directive
            return {
                restrict: 'E',
                templateUrl: 'web.ui.template/date-picker.html',
                scope: {},
                link: link
            }
        }]);
})(angular);