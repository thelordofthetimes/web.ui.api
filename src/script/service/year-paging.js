(function (angular) {
    angular.module('web.ui.api').
    /**
     * todo: describe web.ui.api.yearPaging service
     */
        service('web.ui.api.yearPaging', [function () {
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

            // define service
            return yearPaging;
        }]);
})(angular);