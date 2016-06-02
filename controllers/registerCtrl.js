angular.module('steam')

  .controller('registerCtrl', ['$rootScope', '$scope', 'handler', '$state', 'localStorageService',
    function ($rootScope, $scope, handler, $state, localStorageService) {
    $scope.signUp = function () {
      $rootScope.loading = true
      handler.signup($scope.signUpUsername, $scope.signUpPasswd, $scope.signUpEmailid).then(function (response) {
        $state.go('workarea.list')
      })
    }
  }])