angular.module('MyApp', ['ngMaterial'])
.controller('AppCtrl', ['$scope','$http',function($scope,$http) {
  $scope.IsVisible = false;

  $scope.showAll=function(){
    $scope.IsVisible = true;

    var request=$http.get('http://localhost:8081/data').then(function(response){
    
      $scope.employees=response.data;
    
    });

  };

}]);
