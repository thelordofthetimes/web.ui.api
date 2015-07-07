(function(angular) {
    angular.module('web.ui.api').
        directive('webOutClick', ['$document', '$parse', function($document, $parse) {
            /**
             * link function
             * @param scope
             * @param elem
             * @param attrs
             */
            function link(scope, elem, attrs) {
                var callbackExpression = attrs['webOutClick'];

                // with each click to document, check target contain directive element
                // if not contain then execute callback expression
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
        }]).
        directive('webOutClickRemove', [function() {

            // define directive
            return {
                restrict: 'A',
                require: '^webOutClick'
            }
        }]);
})(angular);