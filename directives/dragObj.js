 angular.module('steam')

 .directive('dragObj', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {

      // create uuid
      var uuid = {
        create: function () {
          function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
          }
          return _p8() + _p8(true) + _p8(true) + _p8();
        }
      }

      // get the element first
      angular.element(element).attr("isDraggable": true)
      var id = angular.element(element).attr("id")

      if(!id) {
        id = uuid.create()
        angular.element(element).attr("id", id)
      }

      // emit events
      element.bind("startDrag", function (send) {
        data.originalEvent.dataTransfer.setData('text', id);
        console.log("Starting to drag")
        $rootScope.emit("STEAM-DRAG-STRT")
      });

      element.bind("stopDrag", function (send) {
        console.log('Stopping to drag')
        $rootScope.emit("STEAM-DRAG-STOP")
      });

    }
  }
}])