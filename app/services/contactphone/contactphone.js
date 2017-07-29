'use strict';

//  Karateschool Contactphone Service
catwalkApp.factory('KarateschoolContactphone', ['KarateschoolBaseService',function (KarateschoolBaseService) {
    var entityUrl = KarateschoolBaseService.getEntityUrl('contactphone');
    return KarateschoolBaseService.getResource(entityUrl,{},{
        'columns':{method: 'POST', params:{},url:entityUrl + 'columns'},
        'api':{method: 'POST', params:{},url:entityUrl + 'api'},
        'schema':{method: 'POST', params:{},url:entityUrl + 'schema'}
    });
}
]);
