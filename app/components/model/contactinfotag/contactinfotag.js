'use strict';

//  Karateschool Contactinfotag Controller
catwalkApp.controller('KarateschoolContactinfotagController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolContactinfotag',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Contactinfotag";
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
            location.path('/karateschool/contactinfotag/');
        };

        $scope.update= function(id){
            location.path('/karateschool/contactinfotag/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Contactinfotag Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.contactinfotag', {
            url: "/contactinfotag",
            templateUrl: "components/model/contactinfotag/contactinfotagTable.html",
            controller: 'KarateschoolContactinfotagController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.contactinfotagForm', {
            url: "/contactinfotag/:id",
            templateUrl: "components/model/contactinfotag/contactinfotagForm.html",
            controller: 'KarateschoolContactinfotagController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
