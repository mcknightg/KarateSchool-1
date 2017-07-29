'use strict';

//  Karateschool Address Controller
catwalkApp.controller('KarateschoolAddressController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolAddress',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Address";
        $scope.listParams = {rows:12,page:1,defaultsearchoper:"icn"};
        $scope.srchterm = '';

        $scope.get = function(id){
            $scope.modelData = service.get({id: id});
        };
        $scope.setPage = function(page){
            $scope.listParams.page = page;
            $scope.list();
        };
        $scope.search = function(){
            if($scope.srchterm && $scope.srchterm !== '' ){
                $scope.listParams['filterByFields'] =  {'name':$scope.srchterm};
            }else{
                $scope.listParams['filterByFields'] = {};
            }
            $scope.list();
        };
        $scope.save = function(){
            service.save($scope.modelData,function(){
                  $scope.back();
            });
        };

        $scope.list = function(){
            $scope.modelList = service.query($scope.listParams);
        };

        $scope.remove = function(id){
            service.delete({id: id}, function () {

            });
        };

        $scope.new= function(){
            location.path('/karateschool/address/');
        };

        $scope.update= function(id){
            location.path('/karateschool/address/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Address Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.address', {
            url: "/address",
            templateUrl: "components/model/address/addressTable.html",
            controller: 'KarateschoolAddressController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.addressForm', {
            url: "/address/:id",
            templateUrl: "components/model/address/addressForm.html",
            controller: 'KarateschoolAddressController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
