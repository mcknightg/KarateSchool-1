'use strict';

//  Karateschool Contactweb Controller
catwalkApp.controller('KarateschoolContactwebController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolContactweb',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Contactweb";
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
            location.path('/karateschool/contactweb/');
        };

        $scope.update= function(id){
            location.path('/karateschool/contactweb/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Contactweb Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.contactweb', {
            url: "/contactweb",
            templateUrl: "components/model/contactweb/contactwebTable.html",
            controller: 'KarateschoolContactwebController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.contactwebForm', {
            url: "/contactweb/:id",
            templateUrl: "components/model/contactweb/contactwebForm.html",
            controller: 'KarateschoolContactwebController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
