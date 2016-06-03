angular.module('steam')

  .controller('registerCtrl', ['$rootScope', '$scope', 'handler', '$state', 'localStorageService',
    function ($rootScope, $scope, handler, $state, localStorageService) {
    $scope.signUp = function () {
      $rootScope.loading = true
      $scope.steamGrp = "techgrind"
      handler.signup($scope.signUpEmailid, $scope.signUpPasswd, $scope.signUpPasswd2, $scope.steamGrp).then(function (response) {
        $state.go('workarea.list')
      })
    }
  }])