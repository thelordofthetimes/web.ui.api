(function(angular) {
    angular.module('web.ui.api').
    /**
     * todo: describe web.ui.api.dayInMonth service
     */
        service('web.ui.api.dayInMonth', ['web.ui.api.datePickerConst',function (datePickerConst) {
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
        }]);
})(angular);