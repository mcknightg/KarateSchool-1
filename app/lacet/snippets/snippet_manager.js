(function () {
    function SnippetManager() {
        this.snippets = [];
    }
    SnippetManager.prototype.registerSnippet = function(snippet){
        console.log('Registered Snippet ' + snippet.name);
        console.log(snippet);
        this.snippets.push(snippet);
    };
    window.snippetManager = new SnippetManager();

    jQuery(function () {

    });
    return( window.snippetManager );
})(jQuery);