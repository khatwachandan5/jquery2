var myApp = angular.module('MyApp', ['ngMaterial'])
.controller('AppCtrl', ['$scope','$http',function($scope,$http) {
    var request=$http.get('http://localhost:8081/data').then(function(response){
    
      $scope.employees=response.data;
       $scope.custom = false;
       $scope.cancel=false;
       $scope.activeIndex = -1;
        $scope.toggleCustom = function(index) {
            $scope.activeIndex = index;

            $scope.custom = $scope.custom === false ? true: false;
            $scope.cancel = $scope.cancel === false ? true: false;
        };
        $scope.togglecancel = function() {
            $scope.activeIndex = -1;
            $scope.cancel = $scope.cancel === false ? true: false;
            $scope.custom = $scope.custom === false ? true: false;
        };
    });

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
}]);

