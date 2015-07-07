(function(angular) {
    angular.module('web.ui.api').
        directive('webDropdown', [function() {
            /**
             * link function
             * @param scope
             * @param elem
             * @param attrs
             */
            function link(scope, elem, attrs) {

            }

            // define directive
            return {
                restrict: 'E',
                templateUrl: 'web.ui.template/dropdown.html',
                scope: {},
                link: link
            }
        }]);
})(angular);