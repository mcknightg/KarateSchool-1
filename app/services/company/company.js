'use strict';

//  Karateschool Company Service
catwalkApp.factory('KarateschoolCompany', ['KarateschoolBaseService',function (KarateschoolBaseService) {
    var entityUrl = KarateschoolBaseService.getEntityUrl('company');
    return KarateschoolBaseService.getResource(entityUrl,{},{
        'columns':{method: 'POST', params:{},url:entityUrl + 'columns'},
        'api':{method: 'POST', params:{},url:entityUrl + 'api'},
        'schema':{method: 'POST', params:{},url:entityUrl + 'schema'}
    });
}
]);
