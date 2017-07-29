'use strict';

//  Karateschool Contactinfo Service
catwalkApp.factory('KarateschoolContactinfo', ['KarateschoolBaseService',function (KarateschoolBaseService) {
    var entityUrl = KarateschoolBaseService.getEntityUrl('contactinfo');
    return KarateschoolBaseService.getResource(entityUrl,{},{
        'columns':{method: 'POST', params:{},url:entityUrl + 'columns'},
        'api':{method: 'POST', params:{},url:entityUrl + 'api'},
        'schema':{method: 'POST', params:{},url:entityUrl + 'schema'}
    });
}
]);
