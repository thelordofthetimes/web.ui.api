(function (angular) {
    angular.module('web.ui.api').
        filter('chunk', [function () {
            return function (input, length) {
                if (!angular.isArray(input)) {
                    return;
                }

                // chunk
                var result = [];
                var i, j;
                for (i = 0, j = input.length; i < j; i += length) {
                    result.push(input.slice(i, i + length));
                }

                // result
                return result;
            }
        }]);
})(angular);