angular.module('steam')

.controller('uploadCtrl', ['$scope', 'handler',
 function ($scope, handler) {

 	handler.breadcrumbFunc()
	console.log("Uploaded file successfully")

}])