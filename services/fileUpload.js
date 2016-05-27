angular.module('steam')

  .service('fileUpload', ['$rootScope', '$http', function ($rootScope, $http) {
    this.uploadFileToUrl = function(file, uploadUrl){
      var fd = new FormData();
      $rootScope.loading = true;
      $rootScope.uploadComplete = false;
      fd.append('file', file);
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function (){
        $rootScope.loading = false;
        $rootScope.uploadComplete = true;
        console.log("it is done");
      })
      .error(function (){
        console.log(status);
        $rootScope.loading = false;
        $rootScope.uploadComplete = false;
      });
    }
  }])