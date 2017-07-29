'use strict';

//  Karateschool Contactemail Controller
catwalkApp.controller('KarateschoolContactemailController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolContactemail',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Contactemail";
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
            location.path('/karateschool/contactemail/');
        };

        $scope.update= function(id){
            location.path('/karateschool/contactemail/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Contactemail Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.contactemail', {
            url: "/contactemail",
            templateUrl: "components/model/contactemail/contactemailTable.html",
            controller: 'KarateschoolContactemailController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.contactemailForm', {
            url: "/contactemail/:id",
            templateUrl: "components/model/contactemail/contactemailForm.html",
            controller: 'KarateschoolContactemailController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
