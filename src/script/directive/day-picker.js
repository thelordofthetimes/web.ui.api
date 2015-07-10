(function(angular) {
    angular.module('web.ui.api').
        service('web.ui.api.dayInMonth', [function() {
            /**
             * get array day in month
             * @param year {int} base 0
             * @param month {int} base 0
             * @returns {Array<object>}
             *  - date {int}: 1..31
             *  - month {int}: current month, prev/next month
             */
            function dayInMonth(year, month) {
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

            // define service
            return dayInMonth;
        }]).
        controller('WebDayPickerCtrl', ['$scope', '$injector', function($scope, $injector) {
            var dayInMonth = $injector.get('web.ui.api.dayInMonth');
            var _days;

            /**
             * {Array<int>} get array of days in year-month
             */
            Object.defineProperty($scope, 'days', {
                get: function() { return _days; }
            });

            // observer year, month to regenerate days
            $scope.$watch('[year, month]', function(nv) {
                _days = dayInMonth(nv[0], nv[1]);
            }, true);

        }]).
        directive('webDayPicker', [function() {
            return {
                restrict: 'AE',
                scope: {
                    ngModel: '=',
                    year: '=',
                    month: '='
                },
                templateUrl: 'web.ui.template/day-picker.html',
                controller: 'WebDayPickerCtrl'
            }
        }]);
})(angular);