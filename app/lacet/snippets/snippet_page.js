var SnippetPage = SnippetContainer.extend( {
    init: function ( name,kind) {
        this._super(name,kind );
        this.klass = "SnippetPage";
        this.type = 'SnippetPage';
    },
    schema:function(){
        return $.extend(true ,{
            'properties': {
                'secured': {'type': 'boolean', 'default': false}
            }
        },this._super());
    }
});
