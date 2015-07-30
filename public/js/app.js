angular.module('myApp', ['ngMap'])

.controller('mainController', function() {
	var vm = this;

	vm.message = 'hello';

	vm.pos = 'Georgia Institute of Technology';

	vm.list = [
	{pos : '2045 Lockridge Place', title: 'Home'},
	{pos : 'Georgia Institute of Technology', title: 'School'},
	{pos : 'Univeristy of California, Berkeley', title: 'other school'}];

});