(function(angular) {
    angular.module('web.ui.api').
    /**
     * provide background api for dropdown component.
     * use:
     *  - <tag web-dropdown="" ng-model="dropdownModel"></tag>
     *  - <web-dropdown ng-model="dropdownModel"></web-dropdown>
     * description:
     *  - component: dropdown-toggle, dropdown-menu.
     *  - click to dropdown-toggle: toggle ngModel.
     *  - click out of dropdown: change ngModel to 'false'
     * api:
     *  ngModel {boolean}:
     *   - true: dropdown is show
     *   - false: dropdown is hide
     */
        directive('webDropdown', function() {
            // define directive
            return {
                restrict: 'AE',
                scope: {
                    ngModel: '=?'
                },
                templateUrl: 'web.ui.template/dropdown.html'
            }
        });
})(angular);