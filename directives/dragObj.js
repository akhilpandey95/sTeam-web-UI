 angular.module('steam')

 .directive('dragObj', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      // get the element first
      angular.element(element).attr("isDraggable": true)
      var id = angular.element(element).attr("id")

      // emit events
      element.bind("startDrag", function (data) {
        console.log("Starting to drag")
        $rootScope.emit("STEAM-DRAG-STRT")
      });

      element.bind("stopDrag", function (data) {
        console.log('Stopping to drag')
        $rootScope.emit("STEAM-DRAG-STOP")
      });

    }
  }
}])