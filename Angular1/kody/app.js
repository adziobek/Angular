/**
 * Created by adziobek on 05.10.2016.
 */

var myapp = angular.module("myapp", []);
myapp.controller('SimpleController', function ($scope) {

    $scope.greeting = "Hello from AngularJS";
    $scope.countries = ['Polska', 'Niemcy', 'Dania'];
});

myapp.controller('StudentController', function ($scope) {

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
});
myapp.controller('FormController', function ($scope) {

    $scope.firstName = '';
    $scope.email = '';
    $scope.resetForm = function () {
        $scope.firstName = '';
        $scope.email = '';
    }
})



