 angular.module('steam')

 .directive('dropObj', ['$rootScope', function ($rootScope) {
 	return {
 		restrict: 'A',
 		link: function (scope, element, attrs, ctrl) {

 			element.bind("dragenter", function (data) {
 				angular.element(data.target).addClass('drag-over');
 			});

 			element.bind("dragleave", function (data) {
 				angular.element(data.target).removeClass('drag-over');
 			});

 			$rootScope.$on("STEAM-DRAG-STRT", function () {
 				var domelm = document.getElementById(id);
 				angular.element(domelm).addClass("drag-target");
 			});

 			$rootScope.$on("STEAM-DRAG-STOP", function () {
 				var domelm = document.getElementById(id);
 				angular.element(domelm).removeClass("drag-target");
 				angular.element(domelm).removeClass("drag-over");
 			});
 		}
 	}
 }])