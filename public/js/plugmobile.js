var app = angular.module('plug', ['ngRoute'])
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  $routeProvider.when('/', {
    templateUrl: '/views/principal.html',
    controller: 'PrincipaltCtrl'
  }).when('/plugdash', {
    templateUrl: '/views/dash.html',
    controller: 'DashCtrl'
  }).when('/plugfoods', {
    templateUrl: '/views/foods.html',
    controller: 'FoodsCtrl'
  }).when('/plugsales', {
    templateUrl: '/views/sales.html',
    controller: 'SalesCtrl'
  }).when('/conversao_geral', {
    templateUrl: '/views/conversao/geral.html',
    controller: 'PrincipaltCtrl'
  }).when('/conversao_plugfoods', {
    templateUrl: '/views/conversao/foods.html',
    controller: 'FoodsCtrl'
  }).when('/conversao_plugsales', {
    templateUrl: '/views/conversao/sales.html',
    controller: 'SalesCtrl'
  }).when('/conversao_plugdash', {
    templateUrl: '/views/conversao/dash.html',
    controller: 'DashCtrl'
  }).otherwise({
    redirectTo: '/'
  })
})

app.controller('PrincipaltCtrl', function ($scope, $rootScope, $http, Api) {
  // Api.facebookFotos((err, resposta) => {
  //   $scope.facebook = resposta
  // })
  Api.ultimasNoticias((err, noticias) => {
    $scope.noticias = noticias.data
  })
})

app.controller('Inicio', function ($scope, $http, Api) {
  window.scrollTo(0, 0)
  // Api.facebookFotos((err, resposta) => {
  //   $scope.facebook = resposta
  // })
  Api.ultimasNoticias((err, noticias) => {
    $scope.noticias = noticias.data
  })
})

app.controller('DashCtrl', function ($scope, $http, Api) {
  window.scrollTo(0, 0)
  // Api.facebookFotos((err, resposta) => {
  //   $scope.facebook = resposta
  // })
})

app.controller('FoodsCtrl', function ($scope, $rootScope, $http, Api) {
  window.scrollTo(0, 0)
  // Api.facebookFotos((err, resposta) => {
  //   $scope.facebook = resposta
  // })
  this.refresh = function () {
    $rootScope.$emit('lazyImg:refresh')
  }
})

app.controller('SalesCtrl', function ($scope, $rootScope, $http, Api) {
  window.scrollTo(0, 0)
  // Api.facebookFotos((err, resposta) => {
  //   $scope.facebook = resposta
  // })
  this.refresh = function () {
    $rootScope.$emit('lazyImg:refresh')
  }
})

app.directive('lazyLoad', lazyLoad)

function lazyLoad () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      const observer = new IntersectionObserver(loadImg)
      const img = angular.element(element)[0]
      observer.observe(img)

      function loadImg (changes) {
        changes.forEach(change => {
          if (change.intersectionRatio > 0) {
            if (change.target.id === 'header-gif') {
              change.target.src = '/images/plugmobile/header.gif'
              change.target.classList.remove('img-blur')
            }
            if (change.target.id === 'oquee-gif') {
              change.target.src = '/images/plugmobile/header-gif.gif'
              change.target.classList.remove('img-blur')
            }
            if (change.target.id === 'foods-header') {
              change.target.src = '/images/foods/header.png'
              change.target.classList.remove('img-blur')
            }
          }
        })
      }
    }
  }
}
