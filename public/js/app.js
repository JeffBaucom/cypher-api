angular.module('myApp', ['ngMap'])

.controller('mainController', function() {
	var vm = this;

	vm.message = 'hello';

	vm.pos = 'Georgia Institute of Technology';

	vm.list = [
	{pos : '', title: 'Home'},
	{pos : 'Georgia Institute of Technology', title: 'School'},
	{pos : 'Univeristy of California, Berkeley', title: 'other school'}];

});