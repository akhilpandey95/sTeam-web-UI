angular.module('steam')

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
        console.log($scope.data)
      })
    } else {
      handler.get('/home/' + localStorageService.get('currentObjPath')).then(function (response) {
        $scope.data = response
        $scope.items = $scope.data.inventory
        console.log($scope.data)
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
      console.log('loaded =', loaded, 'total =', total, 'state =', state)
    }
  }])

.controller('workSpaceEditorCtrl', ['$scope', 'handler', 'localStorageService', 'textAngularManager', '$document', '$sce',
 function ($scope, handler, localStorageService, textAngularManager, $document, $sce) {

  $scope.editable = true;
  $scope.dataSrc = localStorageService.get('baseurl') + 'home/' + localStorageService.get('currentObjPath')
  $scope.source = $sce.trustAsResourceUrl($scope.dataSrc)

  $scope.txtSrc = function() {
    handler.get($scope.dataSrc, true).then(function (response) {
      $scope.data = response
    })
  }


  $scope.allh1 = function() {
    textAngularManager.updateToolDisplay('h1', {
      buttontext: 'Heading 1'
    });
  }

  $scope.allh2 = function() {
    textAngularManager.updateToolDisplay('h2', {
      buttontext: 'Heading 2'
    });
  }

  $scope.allh3 = function() {
    textAngularManager.updateToolDisplay('h3', {
      buttontext: 'Heading 3'
    });
  }

  $scope.allh4 = function() {
    textAngularManager.updateToolDisplay('h4', {
      buttontext: 'Heading 4'
    });
  }

  $scope.allh5 = function() {
    textAngularManager.updateToolDisplay('h5', {
      buttontext: 'Heading 5'
    });
  }

  $scope.allh6 = function() {
    textAngularManager.updateToolDisplay('h6', {
      buttontext: 'Heading 6'
    });
  }

  $scope.submit = function () {
    console.log("The document has been submitted");
  }

  $scope.resetEditor = function () {
    textAngularManager.resetToolsDisplay();
  }
}])

.controller('workSpaceImgviewerCtrl', ['$scope', 'handler', 'localStorageService', 'Lightbox', '$sce',
 function ($scope, handler, localStorageService, Lightbox, $sce) {

    $scope.imgSrc = localStorageService.get('baseurl') + 'home/' + localStorageService.get('currentObjPath')
    $scope.source = $sce.trustAsResourceUrl($scope.imgSrc)
    $scope.imgData = function() {
      handler.get($scope.imgSrc, true).then(function (response) {
        $scope.data = response
      })
    }
    $scope.imgViewer = function (index) {
      Lightbox.openModal($scope.imgSrc, index);
    }

  }])

.value("workspaceAudio",{})
.controller('workspaceAudioResourceCtrl', function($scope, ngAudio) {
  $scope.audios = [
  ngAudio.load('audio/test.mp3'),
  ]
})

.controller('workspaceAudioCtrl', ['$scope', 'ngAudio', 'workspaceAudio', 'localStorageService', '$sce',
  function($scope, ngAudio, workspaceAudio, localStorageService, $sce) {

    $scope.dataSrc = localStorageService.get('baseurl') + 'home/' + localStorageService.get('currentObjPath')
    $scope.source = $sce.trustAsResourceUrl($scope.dataSrc)
    var url = $scope.dataSrc;

    if (workspaceAudio[url]) {
      $scope.audio = workspaceAudio[url];
    }
    else {
      $scope.audio = ngAudio.load(url);
      $scope.audio.volume = 0.8;
      workspaceAudio[url] = $scope.audio;
    }
}])

.controller('workspaceVideoCtrl', ['$scope', '$timeout', 'video', 'localStorageService', '$sce',
  function($scope, $timeout, video, localStorageService, $sce) {

  $scope.dataSrc = localStorageService.get('baseurl') + 'home/' + localStorageService.get('currentObjPath')
  $scope.source = $sce.trustAsResourceUrl($scope.dataSrc)
  $scope.interface = {};
  $scope.playlistopen = false;
  var url = $scope.dataSrc;
  $scope.getVideoName = url.substr(41);

  $scope.$on('$videoReady', function videoReady() {
    $scope.interface.options.setAutoplay(true);
  });

  $scope.playVideo = function playVideo(sourceUrl) {
    video.addSource('mp4', sourceUrl, true);
  }


  video.addSource('mp4', url);
}])
