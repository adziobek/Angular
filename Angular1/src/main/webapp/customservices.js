/**
 * Created by Andrzej on 06.10.2016.
 */

myapp.controller("CalcController", function ($scope, MathService) {
    $scope.add = function () {
        return MathService.addNumber($scope.a, $scope.b);
        
    }
})
myapp.factory("AddService", function () {
    var factory =  {};
    
    factory.add = function (a, b) {
        return Number(a)+ Number(b)
    }
    return factory;
})

myapp.service("MathService", function (AddService) {
    this.addNumber = function(a, b) {
        return AddService.add(a, b);
    };
})