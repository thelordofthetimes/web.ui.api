(function (angular) {
    angular.module('web.ui.api').
        constant('datePickerConst', {
            DAY_LENGTH: 42, // 7x6
            MONTHS: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }).
    /**
     * provide date picker controller
     * internal api:
     *  - ngModel {DateTime}: value of date picker
     *  - model {DateTime}: copy value of date picker
     *  - ctrl {object}: component controller. todo parse that
     *  - years {Array}: array[16] of int, contains years
     *  - months: {Array}: array{0..11} of int, contains month
     *  - days: {Array}: array[DAY_LENGTH] of {object}
     *   - date {int}: 1..31
     *   - month {int}: current month, next/prev month
     */
        controller('WebDatePickerCtrl', ['$scope', '$injector', function ($scope, $injector) {
            var $filter = $injector.get('$filter');
            var datePickerConst = $injector.get('datePickerConst');

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
                for (var index = 1; index < dayInWeek; index++) {
                    days.unshift({
                        month: month - 1,
                        date: numberOfDayPreMonth - index
                    });
                }

                // add days in next month
                var index = 1;
                while (days.length < datePickerConst.DAY_LENGTH) {
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
             * @returns {Array<int>} DAY_LENGTH year in current year page
             */
            function currentYearPage(year) {
                var startYear = year - year % datePickerConst.DAY_LENGTH;
                var years = [];
                for (var index = 0; index < datePickerConst.DAY_LENGTH; index++) {
                    years.push(startYear + index);
                }
                return years;
            }

            /**
             *
             * @param value {Date}
             */
            function applyModel(value) {
                $scope.ngModel.setFullYear(value.getFullYear());
                $scope.ngModel.setMonth(value.getMonth());
                $scope.ngModel.setDate(value.getDate());
            }

            /**
             * get current year
             * {int} base 0, get/set current year
             */
            Object.defineProperty($scope, 'year', {
                get: function () {
                    return $scope.model.getFullYear();
                },
                set: function (value) {
                    $scope.model.setFullYear(value);
                }
            });

            /**
             * get current month
             * {int} base 0, get/set current month
             */
            Object.defineProperty($scope, 'month', {
                get: function () {
                    return $scope.model.getMonth();
                },
                set: function (value) {
                    $scope.model.setMonth(value);
                }
            });

            /**
             * get current date
             * {int} base 1, get/set current date
             */
            Object.defineProperty($scope, 'date', {
                get: function () {
                    return $scope.model.getDate();
                },
                set: function (value) {
                    $scope.model.setDate(value);
                }
            });

            /**
             * get years in current year page
             * {Array<int>} years in current year page
             */
            Object.defineProperty($scope, 'years', {
                get: function () {
                    return currentYearPage($scope.model.getFullYear());
                }
            });

            /**
             * get months in year
             * {Array<int>} base 0, months in year
             */
            Object.defineProperty($scope, 'months', {
                get: function () {
                    return datePickerConst.MONTHS;
                }
            });

            /**
             * get {object} description day in current/next/prev month
             * {Array<object>}
             *  - date {int}: 1..31
             *  - month {int}: current month, next/prev month
             */
            $scope.days = [];

            /**
             * observer [model] changed year, month to update [$scope.days]
             */
            $scope.$watch('model', function (nv, ov) {
                // check same date
                var sameDate = nv.getFullYear() == ov.getFullYear() &&
                    nv.getMonth() == ov.getMonth();
                if ($scope.days.length > 0 && sameDate) {
                    return;
                }

                // generate new days
                $scope.days.length = 0;
                var year = $scope.model.getFullYear();
                var month = $scope.model.getMonth();
                var daysMatrix = $filter('chunk')(daysInMonth(year, month), 7);

                // apply to days
                daysMatrix.forEach(function (d) {
                    $scope.days.push(d);
                });
            }, true);

            // public method to scope
            $scope.applyModel = applyModel;
        }]).
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
     * public api:
     *  - ngModel {DateTime}: same as internal api
     *  - ctrl {obj}: same as internal api
     */
        directive('webDatePicker', [function () {
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
                scope.model = angular.copy(scope.ngModel);
            }

            // define directive
            return {
                restrict: 'E',
                templateUrl: 'web.ui.template/date-picker.html',
                scope: {
                    ngModel: '=?'
                },
                link: link,
                controller: 'WebDatePickerCtrl'
            }
        }]);
})(angular);