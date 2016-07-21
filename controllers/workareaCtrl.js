angular.module('steam')

  .controller('optionsCtrl', ['$state', '$scope', '$uibModal', '$location', 'localStorageService', 'handler',
    function ($state, $scope, $uibModal, $location, localStorageService, handler) {
    $scope.createdoc = function (docDetails) {
      $scope.docDetails = docDetails;
      $uibModal.open({
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
      $uibModal.open({
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

  .controller('createDocCtrl', ['$scope', '$state', '$location', '$uibModalInstance', 'fileUpload', 'handler',
    function ($scope, $state, $location, $uibModalInstance, fileUpload, handler) {
      var uploadUrl = '/home/' + $scope.user + '/test'
      var fileObj = {
        class: "Document",
        content: $scope.myfile,
        name: "test"
      }
      $scope.submit = function () {
        handler.put(uploadUrl, fileObj).then(function () {
          $uibModalInstance.dismiss('cancel')
          swal("created a document")
          $state.go('workarea.list')
        })
        .catch(function () {
          $uibModalInstance.dismiss('cancel')
          swal('Unable to create a document')
          $state.go('workarea.list')
        })
      }
      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      }
  }])

  .controller('createRoomCtrl', ['$scope', '$state', '$uibModalInstance', 'handler',
    function ($scope, $state, $uibModalInstance, handler) {
      var uploadUrl = '/home/' + $scope.user + '/test'
      var roomObj = {
        class: "Room",
        name: "test",
        description: "this is a test description"
      }
      $scope.submit = function () {
        handler.put(uploadUrl, roomObj).then(function () {
          $uibModalInstance.dismiss('cancel')
          swal("created a room")
          $state.go('workarea.list')
        })
        .catch(function () {
          $uibModalInstance.dismiss('cancel')
          swal('Unable to create a room')
          $state.go('workarea.list')
        })
      }
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  }])
