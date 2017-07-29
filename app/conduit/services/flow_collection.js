(function () {
    var FlowService =  PagedCollection.extend({
        init:function() {
            if(!base_url){
                base_url = '../';
            }
            this._super(base_url + 'conduit/flows');//'mongo/' +  app_name + '/flows'
        }
    });
    window.flows = new FlowService();
})(jQuery);