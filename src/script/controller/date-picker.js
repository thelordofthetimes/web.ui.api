(function(angular) {
    angular.module('web.ui.api').
    /**
     * provide date picker controller
     * internal api:
     *  - ngModel {DateTime}: value of date picker
     *  - model {DateTime}: copy value of date picker
     *  - ctrl {object}: component controller. todo: describe this
     *  - years {Array}: array[16] of int, contains years
     *  - months: {Array}: array{0..11} of int, contains month
     *  - days: {Array}: array[DAY_LENGTH] of {object}
     *   - date {int}: 1..31
     *   - month {int}: current month, next/prev month
     *  - month {int}: get/set month
     *  - applyModel {function}: update ngModel
     */
        controller('WebDatePickerCtrl', ['$scope', '$injector', function ($scope, $injector) {
            var $filter = $injector.get('$filter');
            var datePickerConst = $injector.get('web.ui.api.datePickerConst');
            console.log('const', datePickerConst);
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
             * apply [$scope.model] to [$scope.ngModel]
             * @param value {Date}
             */
            function applyModel(value) {
                $scope.ngModel.setFullYear(value.getFullYear());
                $scope.ngModel.setMonth(value.getMonth());
                $scope.ngModel.setDate(value.getDate());
            }

            /**
             * modify date in month to resolve jump month
             * @param oldValue {Date}
             * @param newYear {int} base 0
             * @param newMonth {int} base 0
             * @returns {number}
             */
            function modifyDate(oldValue, newYear, newMonth) {
                var newDate = new Date(newYear, newMonth + 1, 0);
                return Math.min(oldValue.getDate(), newDate.getDate());
            }

            /**
             * get page of year
             * @param pageSize {int}
             * @param pageIndex {int}
             * @returns {Array<int>}
             */
            function yearPaging(pageSize, pageIndex) {
                var startYear = (pageIndex - 1) * pageSize;
                var years = [];
                for (var index = 0; index < pageSize; index++) {
                    years.push(startYear + index);
                }
                return years;
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
                    var monthDay = modifyDate($scope.model, value, $scope.model.getMonth());
                    $scope.model.setDate(monthDay);
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
                    var monthDay = modifyDate($scope.model, $scope.model.getFullYear(), value);
                    $scope.model.setDate(monthDay);
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
            $scope.yearPageIndex = 0;
            $scope.yearPageSize = 12;
            $scope.years = [];
            $scope.$watch('[yearPageSize, yearPageIndex]', function (nv) {
                $scope.years.length = 0;
                console.log(nv);
                var rows = $filter('chunk')(yearPaging(nv[0], nv[1]), 4);
                rows.forEach(function(row) {
                    $scope.years.push(row);
                });
            }, true);
            /**
             *
             * @param nv {Date}
             * @param ov {Date}
             */
            function modelYear(nv, ov) {
                var yearOutRange = nv.getFullYear() != ov.getFullYear();
                if ($scope.yearPageIndex == 0 || yearOutRange) {
                    $scope.yearPageIndex = Math.ceil((nv.getFullYear() + 1)/12);
                }
            }
            $scope.$watch('model', modelYear, true);

            /**
             * get months in year
             * {Array<int>} base 0, months in year
             */
            $scope.months = $filter('chunk')(datePickerConst.MONTHS, 4);

            /**
             * get {object} description day in current/next/prev month
             * {Array<object>}
             *  - date {int}: 1..31
             *  - month {int}: current month, next/prev month
             */
            $scope.days = [];

            /**
             * observer [model] changed year, month to update [$scope.days].
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
        }]);
})(angular);