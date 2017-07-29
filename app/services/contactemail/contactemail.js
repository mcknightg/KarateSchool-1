'use strict';

//  Karateschool Contactemail Service
catwalkApp.factory('KarateschoolContactemail', ['KarateschoolBaseService',function (KarateschoolBaseService) {
    var entityUrl = KarateschoolBaseService.getEntityUrl('contactemail');
    return KarateschoolBaseService.getResource(entityUrl,{},{
        'columns':{method: 'POST', params:{},url:entityUrl + 'columns'},
        'api':{method: 'POST', params:{},url:entityUrl + 'api'},
        'schema':{method: 'POST', params:{},url:entityUrl + 'schema'}
    });
}
]);
