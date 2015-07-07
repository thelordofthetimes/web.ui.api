(function (angular) {
    angular.module('web.ui.api').
    /**
     * provide background api for date picker
     * use:
     *  - <tag ngModel="dateModel" ctrl="controller"></tag>
     * descriptions:
     *  - components:
     *   - date toggle: click to toggle picker show/hide
     *   - year picker: select year, change to month picker
     *   - month picker: select month in year, change to day picker
     *   - day picker: select day in month, hide picker
     *   - year panel: next/prev year page
     *   - month panel: next/prev year
     *   - day panel: next/prev month
     * api:
     *  - ngModel {DateTime}: value of date picker
     *  - ctrl {object}: component controller. todo parse that
     *  - years {Array}: array[16] of int, contains years
     *  - months: {Array}: array{0..11} of int, contains month
     *  - days: {Array}: array[36] of int, contains day in current month,
     *    prev/next month
     */
        directive('webDatePicker', [function () {
            var MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

            /**
             * link function
             * @param scope
             * @param elem
             * @param atrrs
             */
            function link(scope, elem, atrrs) {
                if (!scope.ngModel) {
                    scope.ngModel = new Date();
                }

                /**
                 * {Array<int>} years in current year page
                 */
                Object.defineProperty(scope, 'years', {
                    get: function () {
                        return currentYearPage(scope.ngModel.getFullYear());
                    }
                });

                /**
                 * {Array<int>} days in month, next/prev month
                 * todo add days in next/prev month
                 */
                Object.defineProperty(scope, 'days', {
                    get: function () {
                        var year = scope.ngModel.getFullYear();
                        var month = scope.ngModel.getMonth();
                        return daysInMonth(year, month);
                    }
                });

                /**
                 * {Array<int>} base 0, months in year
                 */
                Object.defineProperty(scope, 'months', {
                    get: function () {
                        return MONTHS;
                    }
                });

                /**
                 * {int} base 0, get/set current month
                 */
                Object.defineProperty(scope, 'month', {
                    get: function () {
                        return scope.ngModel.getMonth();
                    },
                    set: function (value) {
                        scope.ngModel.setMonth(value);
                    }
                });

                /**
                 * {int} base 1, get/set current date
                 */
                Object.defineProperty(scope, 'date', {
                    get: function () {
                        return scope.ngModel.getDate();
                    },
                    set: function (value) {
                        scope.ngModel.setDate(value);
                    }
                });

                /**
                 * {int} base 0, get/set current year
                 */
                Object.defineProperty(scope, 'year', {
                    get: function () {
                        return scope.ngModel.getFullYear();
                    },
                    set: function (value) {
                        scope.ngModel.setFullYear(value);
                    }
                });
            }

            /**
             * get array day in month
             * @param year {int} base 0
             * @param month {int} base 0
             * @returns {Array<int>} 36 days in month, prev/next month
             */
            function daysInMonth(year, month) {
                var numberOfDay = new Date(year, month + 1, 0).getDate();
                var days = [];
                for (var index = 1; index <= numberOfDay; index++) {
                    days.push(index);
                }
                return days;
            }

            /**
             * get array year in current year page
             * @param year
             * @returns {Array<int>} 36 year in current year page
             */
            function currentYearPage(year) {
                var startYear = year - year % 36;
                var years = [];
                for (var index = 0; index < 36; index++) {
                    years.push(startYear + index);
                }
                return years;
            }

            // define directive
            return {
                restrict: 'E',
                templateUrl: 'web.ui.template/date-picker.html',
                scope: {
                    ngModel: '=?'
                },
                link: link
            }
        }]);
})(angular);