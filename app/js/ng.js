/* global angular */

//--------------------------------------------|
// ANGULAR
//--------------------------------------------|
'use strict';

// INIT
//--------------------------------------------|
angular.module('app', [
	// inject ng deps
])

// DIRECTIVE
//--------------------------------------------|
.directive('exDirective', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ngModel) {
			// lets go!
		}
	};
})

// CONTROLLER
//--------------------------------------------|
.controller('ExController', ['$scope', function($scope) {
	// let's go!
}]);

// BOOTSTRAP
//--------------------------------------------|
angular.bootstrap(document, ['app']);
