/**
 * Created by adziobek on 05.10.2016.
 */

var myapp = angular.module("myapp", []);
myapp.controller('SimpleController', function ($scope) {

    $scope.greeting = "Hello from AngularJS";
    $scope.countries = ['Polska', 'Niemcy', 'Dania'];
});

myapp.controller('StudentController', function ($scope, $http) {

    $scope.students = [
        {
            name: 'Andrzej',
            mark: 1
        },
        {
            name: 'Kasia',
            mark: 6
        },
        {
            name: 'Marta',
            mark: 2
        }
    ];

    var url="data.txt";
    $http.get(url).success(function (response) {
        $scope.studentsFromDatabase = response;
    })
});
myapp.controller('FormController', function ($scope) {

    $scope.firstName = '';
    $scope.email = '';
    $scope.resetForm = function () {
        $scope.firstName = '';
        $scope.email = '';
    }
})



