(function (angular) {
    angular.module('app', ['web.ui.api']).
        controller('MainCtrl', ['$scope', function ($scope) {
            $scope.opt = {name: 'what'};
            $scope.outClick = function (e) {
                console.log('called out of click function', e);
            };
            $scope.toggleDropdown = function (event) {
                event.preventDefault();
                event.stopPropagation();
                $scope.dropdownOne = !$scope.dropdownOne;
            };
            $scope.date = new Date('2008-02-25');
        }]);
})(angular);