angular.module('MyApp', ['ngMaterial'])
.controller('AppCtrl', ['$scope','$http',function($scope,$http) {
$scope.showAll=function(){
    $scope.IsVisible = true;
    var request=$http.get('http://localhost:8081/data').then(function(response){
    
      $scope.employees=response.data;
    
    });

  }();
  function AppCtrl ( $scope ) {
    $scope.data = {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
  }

  $scope.IsVisible = false;

  // displaying all data
  
  
  //delete operation
  $scope.delete = function(id) {
          var verify = confirm('Are you sure to delete?');
          $http.delete('http://localhost:8081/data/' + id, $scope.employees).then(function(response) {
              if (response.data && (verify == true)) {
                  var index = getSelectedIndex(id);
                  $scope.employees.splice(index, 1);
                  alert('Row Data deleted Successfully');
              }
          });
      }
   function getSelectedIndex(id) {
            for (var i = 0; i < $scope.employees.length; i++)
                if ($scope.employees[i].id == id)
                    return i;
            return -1;
        }

  //update operation
  //Add operation
  //Search operation
        
}]);
