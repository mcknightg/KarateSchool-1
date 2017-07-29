'use strict';

//  Karateschool Company Controller
catwalkApp.controller('KarateschoolCompanyController', ['$scope','$location','$stateParams','$global.services', 'KarateschoolCompany',
    function ($scope,location,$stateParams,$services, service) {
        $scope.name = "Company";
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
            location.path('/karateschool/company/');
        };

        $scope.update= function(id){
            location.path('/karateschool/company/' + id);
        };

        $scope.back = function () {
            window.history.back();
        };

        if($stateParams.id){ $scope.get($stateParams.id);}
        else{ $scope.list();}
    }
]);

//  Karateschool Company Routing
catwalkApp.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function ($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider
        .state('karateschool.company', {
            url: "/company",
            templateUrl: "components/model/company/companyTable.html",
            controller: 'KarateschoolCompanyController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
        .state('karateschool.companyForm', {
            url: "/company/:id",
            templateUrl: "components/model/company/companyForm.html",
            controller: 'KarateschoolCompanyController',
            access: {
                authorizedRoles: [USER_ROLES.all]
            }
        })
     }
]);
