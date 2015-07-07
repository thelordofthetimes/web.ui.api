(function(angular) {
    angular.module('web.ui.api').
    /**
     * provide out of element click event callback.
     * use <tag web-out-click="expression"></tag>.
     * when click out of <tag> will be call expression
     */
        directive('webOutClick', ['$document', '$parse', function($document, $parse) {
            /**
             * link function
             * @param scope
             * @param elem
             * @param attrs
             */
            function link(scope, elem, attrs) {
                var callbackExpression = attrs['webOutClick'];

                $document.on('click', function(event) {
                    if (!elem[0].contains(event.target)) {
                        scope.$apply(function() {
                            scope.$eval(callbackExpression);
                        });
                    }
                });
            }

            // define directive
            return {
                restrict: 'A',
                scope: false,
                link: link
            }
        }]);
})(angular);