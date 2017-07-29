'use strict';

//  Karateschool Tag Controller
catwalkApp.controller('KarateschoolTagController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolTag',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Tag";
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
            location.path('/karateschool/tag/');
        };

        $scope.update= function(id){
            location.path('/karateschool/tag/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Tag Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.tag', {
            url: "/tag",
            templateUrl: "components/model/tag/tagTable.html",
            controller: 'KarateschoolTagController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.tagForm', {
            url: "/tag/:id",
            templateUrl: "components/model/tag/tagForm.html",
            controller: 'KarateschoolTagController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
