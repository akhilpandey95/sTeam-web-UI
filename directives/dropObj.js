 angular.module('steam')

 .directive('dropObj', ['$rootScope', function ($rootScope) {
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

		  var id = angular.element(element).attr("id")
	      if(!id) {
	      	id = uuid.create()
	      	angular.element(element).attr("id", id)
	      }

	      element.bind("dragenter", function (data) {
	      	angular.element(data.target).addClass('drag-over');
	      });

	      element.bind("dragleave", function (data) {
	      	angular.element(data.target).removeClass('drag-over');
	      });

	      element.bind("drop", function (e) {
      		if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            if (e.stopPropagation) {
                e.stopPropagation(); // Necessary. Allows us to drop.
            }
            var data = e.originalEvent.dataTransfer.getData("text");
            var dest = document.getElementById(id);
            var src = document.getElementById(data);

			 scope.onDrop({dragEl: data, dropEl: id});
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