angular.module('steam')

  .config(function ($provide) {
    $provide.decorator('editorOptions', ['$delegate', function (editorOptions) {
      editorOptions.bold.iconclass = "fa fa bold";
      editorOptions.italics.iconclass = "fa fa italic";
      editorOptions.underline.iconclass = "fa fa underline";
      editorOptions.ul.iconclass = "fa fa list";
      editorOptions.ol.iconclass = "fa fa list-ol";
      editorOptions.undo.iconclass = "fa fa undo";
      editorOptions.redo.iconclass = "fa fa repeat";
      editorOptions.justifyLeft.iconclass = "fa fa-align-left";
      editorOptions.justifyCenter.iconclass = "fa fa-align-justify";
      editorOptions.justifyRight.iconclass = "fa fa-align-right";
      return editorOptions;
    }])
  })

  .controller('workspaceListCtrl', ['$rootScope', '$scope', 'handler', 'localStorageService',
    function ($rootScope, $scope, handler, localStorageService) {
    $scope.invokeObj = function (itemClass, itemPath, itemMimeType) {
      while(itemPath.charAt(0) === '/') {
        itemPath = itemPath.substr(1)
      }
      handler.stateHandler(itemClass, itemPath, itemMimeType)
    }
    handler.breadcrumbFunc()
    if ($rootScope.navigationTrack.length == 1) {
      handler.get('/home/' + $rootScope.user).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
      })
    } else {
      handler.get('/home/' + localStorageService.get('currentObjPath')).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
      })
    }
  }])

  .controller('workspaceDetailedCtrl', ['$http', '$scope', 'handler', 'localStorageService', 'PDFViewerService', '$sce',
   function ($http, $scope, handler, localStorageService, pdf, $sce) {
    $scope.dataSrc = localStorageService.get('baseurl') + 'home/' + localStorageService.get('currentObjPath')

    $scope.mimeTypeHandler = function () {
      if(localStorageService.get('currentObjMimeType') == 'application/x-unknown-content-type') {
        return 'unknown'
      } else if (localStorageService.get('currentObjMimeType').match(/image\/*/)) {
        return 'image'
      } else if (localStorageService.get('currentObjMimeType') == 'application/pdf') {
        return 'pdf'
      } else if (localStorageService.get('currentObjMimeType').match(/audio\/*/)) {
        return 'audio'
      } else if (localStorageService.get('currentObjMimeType').match(/video\/*/)) {
        return 'video'
      } else if (localStorageService.get('currentObjMimeType').match(/text\/*/) ||
        localStorageService.get('currentObjMimeType') == 'application/x-javascript' ||
        localStorageService.get('currentObjMimeType') == 'application/x-pike') {
          return 'text'
      } else { return 'notfound' }
    }

    // Trusting the resource
    $scope.source = $sce.trustAsResourceUrl($scope.dataSrc)

    // Text
    $scope.txtSrc = function() {
      handler.get($scope.dataSrc, true).then(function (response) {
        $scope.data = response
      })
    }

    // Pdf
    $scope.pdfURL = $scope.dataSrc
    $scope.instance = pdf.Instance("viewer");
    $scope.nextPage = function() {
      $scope.instance.nextPage()
    }
    $scope.prevPage = function() {
      $scope.instance.prevPage()
    }
    $scope.gotoPage = function(page) {
      $scope.instance.gotoPage(page)
    }
    $scope.pageLoaded = function(curPage, totalPages) {
      $scope.currentPage = curPage
      $scope.totalPages = totalPages
    }
    $scope.loadProgress = function(loaded, total, state) {
    }
  }])

  .controller('workSpaceEditorCtrl', ['$scope', 'handler', 'localStorageService', 'textAngularManager', '$document',
   function ($scope, handler, localStorageService, textAngularManager, $document) {
    $scope.data = {
      empty: '<small>Please enter text</small>',
      full: ''
    }
    $scope.editable = true;

    $scope.submit = function () {
      console.log("The document has been submitted");
    }
    $scope.clear = function () {
      console.log("The document has been reset");
    }
    $scope.resetEditor = function () {
      textAngularManager.resetToolsDisplay();
    }
  }])

