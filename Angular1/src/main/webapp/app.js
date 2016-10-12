/**
 * Created by adziobek on 05.10.2016.
 */

var myapp = angular.module("myapp", ['ngRoute']);

myapp.config(function ($routeProvider) {
    $routeProvider
        .when('',
            {
                templateUrl: 'index.html'
            })
        .when('/addStudent',
            {
                templateUrl: 'addStudent.html',
                controller: 'StudentController'
            })
        .when('/viewStudents',
            {
                templateUrl: 'viewStudents.html',
                controller: 'StudentController'
            })
        .when('/scopetest',
            {
                templateUrl: 'scopetest.html'
            }
            )
        .when('/addNumber',
            {
                templateUrl: 'addNumber.html'
            }
        )
        .when('/customStudentDirective',
            {
                templateUrl: 'customStudentDirective.html'
            }
        )
        .otherwise(
            {
                redirectTo: ''
            }
        );
});

myapp.value("defaultName", "Defautl Name")
myapp.controller('SimpleController', function ($scope, defaultName) {

    $scope.greeting = "Hello from AngularJS";
    $scope.countries = ['Polska', 'Niemcy', 'Dania'];
    $scope.name = defaultName;
});

myapp.controller('StudentController', function ($scope, $http) {
    //Dane do uzycia w dyrektywie
    $scope.Kamil = {};
    $scope.Kamil.name = "Kamil Calek";
    $scope.Kamil.rollno = 1;
    $scope.Kasia = {};
    $scope.Kasia.name = "Kasia";
    $scope.Kasia.rollno = 2;

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

    var url = "data.txt";
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

myapp.directive("student", function () {

    var directive = {};
    directive.restrict = 'E';
    directive.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";
    directive.scope = {
        student: "=name"
    }

    //compile is called during application initialization. AngularJS calls it once when html page is loaded.
    directive.compile = function(element, attributes) {
        element.css("border", "2px solid #cccccc");

        //linkFunction is linked with each element with scope to get the element specific data.
        var linkFunction = function($scope, element, attributes) {
            element.html("Student: <b>"+$scope.student.name +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
            element.css("background-color", "yellow");
        }
        return linkFunction;
    }
    return directive;

})

