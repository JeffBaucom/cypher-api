//ngMap dependency for Angular maps directives
angular.module('myApp', ['ngMap'])

.controller('mainController', function($scope) {
	var vm = this;

	vm.message = 'hello';

	vm.pos = 'Georgia Institute of Technology';

	vm.center = [37.853843, -122.278776];
	var map = $scope.map;

	vm.list = [
	{lat : '37.853843', lng:'-122.278776', title: 'Open House Bay Area'},
	{lat : '37.772953', lng:'-122.419598', title: 'GroovMekanex HQ'},
	{lat : '37.807780', lng:'-122.272723', title: 'thePeople Party'}];

	vm.newList = [];

	vm.addMarker = function() {
		vm.newList.push({
			pos:vm.newAddress, title: vm.newTitle
		});
		$scope.map.setCenter(vm.newAddress);
		vm.newAddress = "";
		vm.newTitle = "";
	}

	$scope.getCenter = function() {
		return $scope.map.getCenter();
	}

});