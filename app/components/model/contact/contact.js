'use strict';

//  Karateschool Contact Controller
catwalkApp.controller('KarateschoolContactController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolContact',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Contact";
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
            location.path('/karateschool/contact/');
        };

        $scope.update= function(id){
            location.path('/karateschool/contact/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Contact Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.contact', {
            url: "/contact",
            templateUrl: "components/model/contact/contactTable.html",
            controller: 'KarateschoolContactController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.contactForm', {
            url: "/contact/:id",
            templateUrl: "components/model/contact/contactForm.html",
            controller: 'KarateschoolContactController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
