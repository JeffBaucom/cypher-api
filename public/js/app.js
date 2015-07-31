//ngMap dependency for Angular maps directives
angular.module('myApp', ['ngMap'])

.controller('mainController', function() {
	var vm = this;

	vm.message = 'hello';

	vm.pos = 'Georgia Institute of Technology';

	vm.list = [
	{lat : '37.853843', lng:'-122.278776', title: 'Open House Bay Area'},
	{lat : '37.772953', lng:'-122.419598', title: 'GroovMekanex HQ'},
	{lat : '37.807780', lng:'-122.272723', title: 'thePeople Party'}];

	vm.addMarker = function() {
		vm.list.push({
			lat: vm.newLat, lng: vm.newLng, title: vm.newTitle
		});
		vm.newLat = "";
		vm.newLng = "";
		vm.newTitle = "";
	}

});