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
     * internal api:
     *  - ngModel {DateTime}: value of date picker
     *  - ctrl {object}: component controller. todo parse that
     *  - years {Array}: array[16] of int, contains years
     *  - months: {Array}: array{0..11} of int, contains month
     *  - days: {Array}: array[35] of {object}
     *   - date {int}: 1..31
     *   - month {int}: current month, next/prev month
     * public api:
     *  - ngModel {DateTime}: same as internal api
     *  - ctrl {obj}: same as internal api
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

                scope.$watch('ngModel', function(nv, ov) {
                    console.log('ngModel', nv, ov);
                });

                /**
                 * {Array<int>} years in current year page
                 */
                Object.defineProperty(scope, 'years', {
                    get: function () {
                        return currentYearPage(scope.ngModel.getFullYear());
                    }
                });

                /**
                 * {Array<object>}
                 *  - date {int}: 1..31
                 *  - month {int}: current month, next/prev month
                 */
                scope.days = [];
                scope.$watch('ngModel', function() {
                    scope.days.length = 0;
                    var year = scope.ngModel.getFullYear();
                    var month = scope.ngModel.getMonth();
                    (daysInMonth(year, month)).forEach(function(d) {
                        scope.days.push(d);
                    });
                }, true);

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
             * @returns {Array<object>} 
             *  - date {int}: 1..31
             *  - month {int}: current month, prev/next month
             */
            function daysInMonth(year, month) {
                // generate days in month
                var date = new Date(year, month + 1, 0);
                var numberOfDay = date.getDate();
                var days = [];
                for (var index = 1; index <= numberOfDay; index++) {
                    days.push({
                        month: month,
                        date: index
                    });
                }

                // add days in prev month
                var dayInWeek = date.getDay();
                date.setMonth(month);
                var numberOfDayPreMonth = date.getDate();
                for (var index = 0; index < dayInWeek; index++) {
                    days.unshift({
                        month: month - 1,
                        date: numberOfDayPreMonth - index
                    });
                }

                // add days in next month
                var index = 1;
                while (days.length < 35) {
                    days.push({
                        month: month + 1,
                        date: index
                    });
                    index++;
                }

                // result
                return days;
            }

            /**
             * get array year in current year page
             * @param year
             * @returns {Array<int>} 35 year in current year page
             */
            function currentYearPage(year) {
                var startYear = year - year % 35;
                var years = [];
                for (var index = 0; index < 35; index++) {
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