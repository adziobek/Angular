/**
 * Created by adziobek on 05.10.2016.
 */

var myapp = angular.module("myapp", ['ngRoute']);

myapp.value('VALIDATION_MESSAGES',
    {
        'required': 'To pole jest wymagane!',
        'pattern': 'To pole ma niewłaściwy format!',
        'duplicate': 'Nowe i stare hasło nie mogą być identyczne !'
    });
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
        .when('/studentFormValidation',
            {
                templateUrl: 'studentFormValidation.html'
            }
        )
        .otherwise(
            {
                redirectTo: ''
            }
        );
});


myapp.controller('SimpleController', function ($scope) {

    $scope.greeting = "Hello from AngularJS";
    $scope.countries = ['Polska', 'Niemcy', 'Dania'];
    $scope.name = "Andrzej";
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

myapp.controller('ValidationController', function ($scope) {
    //Minimum 8 znaków, 1 duża i mała litera, 1 liczba i znak specjalny
    $scope.passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    $scope.password ;
    $scope.errorMessage ;
    $scope.submitForm = function() {
        if($scope.changePasswordForm.$invalid) {
            console.log("Not submit form. Form invalid !!!");
            $scope.changePasswordForm.oldPassword.$setDirty();
            $scope.changePasswordForm.newPassword.$setDirty();
            return;
        }
        if(($scope.password.oldPassword == $scope.password.newPassword)){
            $scope.changePasswordForm.newPassword.$error = {'duplicate': true};
            console.log("Not submit form. Old and new password must not be the same !!!");
            return;
        }

        console.log("Form is submit successfully!!!");
    };
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

myapp.directive('localValidationMsg', localValidationMsg);
function localValidationMsg(VALIDATION_MESSAGES) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            formField: '=',
        },
        template: [
            '<span style="color:red">',
            '<span class="message" ng-repeat="(errName, errState) in formField.$error" ng-if="formField.$dirty">',
            '<span ng-bind="messages[errName]"></span><br>',
            '</span>',
            '</span>',
        ].join(''),
        link: function(scope, element) {
            scope.messages = VALIDATION_MESSAGES;
        }
    }
};

