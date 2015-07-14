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