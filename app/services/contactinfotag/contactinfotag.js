'use strict';

//  Karateschool Contactinfotag Service
catwalkApp.factory('KarateschoolContactinfotag', ['KarateschoolBaseService',function (KarateschoolBaseService) {
    var entityUrl = KarateschoolBaseService.getEntityUrl('contactinfotag');
    return KarateschoolBaseService.getResource(entityUrl,{},{
        'columns':{method: 'POST', params:{},url:entityUrl + 'columns'},
        'api':{method: 'POST', params:{},url:entityUrl + 'api'},
        'schema':{method: 'POST', params:{},url:entityUrl + 'schema'}
    });
}
]);
