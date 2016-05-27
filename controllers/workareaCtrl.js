angular.module('steam')

  .controller('optionsCtrl', ['$state', '$scope', '$modal', '$location', 'localStorageService', 'handler',
    function ($state, $scope, $modal, $location, localStorageService, handler) {
    $scope.createdoc = function (docDetails) {
      $scope.docDetails = docDetails;
      $modal.open({
        templateUrl: 'views/createdoc.html',
        controller: 'createDocCtrl',
        resolve: {
          docDetails: function () {
            return $scope.docDetails;
          }
        }
      })
    }
    $scope.createroom = function () {
      $modal.open({
        templateUrl: 'views/createroom.html',
        controller: 'createRoomCtrl'
      })
    }
    $scope.delete = function () {
      if (localStorageService.get('currentObjPath') != null) {
        handler.delete('/' + localStorageService.get('currentObjPath')).then(function () {
          swal('Object deleted successfully')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          swal('Unable to delete your current selection')
        })
      }
    }
  }])

  .controller('commentsCtrl', ['$scope', function ($scope) {
    $scope.comment = [];
    $scope.addComment = function () {
      if($scope.commentContent != "") {
        $scope.comment.push($scope.commentContent);
        $scope.commentContent = "";
      }
    }
    $scope.removeComment = function ($index) {
      $scope.comment.splice($index, 1);
    }
  }])

  .controller('createDocCtrl', ['$scope', '$location', '$modalInstance', 'fileUpload',
    function ($scope, $location, $modalInstance, fileUpload) {
      $scope.uploadFile = function (){
        var file = $scope.myFile;
        var uploadUrl = $location.path();
        console.log('file is ' );
        console.dir(file);
        fileUpload.uploadFileToUrl(file, uploadUrl);
      }
      $scope.submit = function () {
        // body...
      }
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      }
  }])

  .controller('createRoomCtrl', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    }
  }])
