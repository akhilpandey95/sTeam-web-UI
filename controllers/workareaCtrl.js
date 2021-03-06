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
    $scope.createcontainer = function () {
      $uibModal.open({
        templateUrl: 'views/createcontainer.html',
        controller: 'createContainerCtrl'
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

  .controller('createDocCtrl', ['$rootScope', '$scope', '$location', 'localStorageService', 'handler',
    function ($rootScope, $scope, $location, localStorageService, handler) {

      $scope.submit = function (name) {
        var uploadUrl = '/home/' + $scope.user + '/' + name
        var docObj = {
          class: "Document",
          content: "",
          name: name
        }
        handler.put(uploadUrl, docObj).then(function () {
          $rootScope.loading = false;
          swal("created an empty Document")
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $rootScope.loading = false;
          swal('Unable to create an empty Document')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })

        $rootScope.loading = true;
      }

      $scope.cancel = function () {
        if (localStorageService.get('currentObjPath') != null) {
          location.href = '/'
          localStorageService.remove('currentObjPath')
        }
      }
  }])

  .controller('uploadCtrl', ['$rootScope', '$scope', '$location', 'localStorageService', 'handler',
    function ($rootScope, $scope, $location, localStorageService, handler) {

      $scope.docDetails = {}
      $scope.submit = function (name) {
        var uploadUrl = '/home/' + $scope.user + '/' + name
        var fileObj = {
          class: "Document",
          content: $rootScope.myfile,
          name: name
        }
        handler.put(uploadUrl, fileObj).then(function () {
          $rootScope.loading = false;
          swal('File uploaded successfully')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $rootScope.loading = false;
          swal('Unable to upload your file')
        })
        $rootScope.loading = true;
      }

      $scope.cancel = function () {
        if (localStorageService.get('currentObjPath') != null) {
          location.href = '/'
          localStorageService.remove('currentObjPath')
        }
      }
  }])

  .controller('createRoomCtrl', ['$rootScope', '$scope', '$location', 'localStorageService', 'handler',
    function ($rootScope, $scope, $location, localStorageService, handler) {

      $scope.submit = function (name, description) {
        var uploadUrl = '/home/' + $scope.user + '/' + name
        var roomObj = {
          class: "Room",
          name: name,
          description: description
        }
        handler.put(uploadUrl, roomObj).then(function () {
          $rootScope.loading = false;
          swal("created a room")
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $rootScope.loading = false;
          swal('Unable to create a room')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })

        $rootScope.loading = true;
      }

      $scope.cancel = function () {
        if (localStorageService.get('currentObjPath') != null) {
          location.href = '/'
          localStorageService.remove('currentObjPath')
        }
      }
  }])

  .controller('createContainerCtrl', ['$rootScope', '$scope', '$location', 'localStorageService', 'handler',
    function ($rootScope, $scope, $location, localStorageService, handler) {

      $scope.submit = function (name, description) {
        var uploadUrl = '/home/' + $scope.user + '/' + name
        var contObj = {
          class: "Container",
          name: name,
          description: description
        }
        handler.put(uploadUrl, contObj).then(function () {
          $rootScope.loading = false;
          swal("created a container")
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })
        .catch(function () {
          $rootScope.loading = false;
          swal('Unable to create a container')
          location.href = '/'
          localStorageService.remove('currentObjPath')
        })

        $rootScope.loading = true;
      }

      $scope.cancel = function () {
        if (localStorageService.get('currentObjPath') != null) {
          location.href = '/'
          localStorageService.remove('currentObjPath')
        }
      }
  }])
