'use strict';

//  Karateschool Contactphone Controller
catwalkApp.controller('KarateschoolContactphoneController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolContactphone',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Contactphone";
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
            location.path('/karateschool/contactphone/');
        };

        $scope.update= function(id){
            location.path('/karateschool/contactphone/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Contactphone Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.contactphone', {
            url: "/contactphone",
            templateUrl: "components/model/contactphone/contactphoneTable.html",
            controller: 'KarateschoolContactphoneController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.contactphoneForm', {
            url: "/contactphone/:id",
            templateUrl: "components/model/contactphone/contactphoneForm.html",
            controller: 'KarateschoolContactphoneController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
