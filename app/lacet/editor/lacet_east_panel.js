(function () {
    function LacetEastPanel() {


    }
    /*
       Initialize East Panel
     */
    LacetEastPanel.prototype.init = function () {
        var self = this;
        var deferred = $.Deferred();
        $('#east-panel').load("lacet/editor/lacet_east_panel.html", function(responseTxt, statusTxt, xhr){
            $('.server_config').unbind('click').bind('click',function(){
                window.serverConfig.showServerConfig();
            });
            self.refreshStockTemplates().done(function(){
                deferred.resolve();
                self.loadPages();
                self.initPageEvents();
            });
            $('#conduit').unbind().bind('click',function(){
                window.location = '#/conduiteditor';
            })
        });
        return deferred.promise();
    };
    LacetEastPanel.prototype.refreshStockTemplates = function(){
        var self = this;
        var deferred = $.Deferred();
        self.loadSnippets('lacet/templates/snippet_templates.hbs').done(function(collection){
            self.templates = collection;
            self.appendSnippets();
            self.refreshCustomTemplates().done(function(){
                deferred.resolve();
            });
        });
        return deferred.promise();
    };
    LacetEastPanel.prototype.refreshCustomTemplates = function(){
        var self = this;
        var deferred = $.Deferred();
        window.snippetBuilder.loadCustomSnippets(function(custom_collection) {
            self.customTemplates = custom_collection;
            self.appendCustomSnippets();
            self.initSnippetEvents();
            deferred.resolve();
        });
        return deferred.promise();
    };
    LacetEastPanel.prototype.getSnippetByName = function(name){
        var snippet =  this.templates.getByName(name);
        if(!snippet){
            snippet = this.customTemplates.getByName(name);
        }
        return snippet;
    };
    LacetEastPanel.prototype.initSnippetEvents = function(){
        this.initDoubleClickSnippet();
        this.initDragSnippet();
        this.initCustomSnippetEvents();
    };

    LacetEastPanel.prototype.appendCustomSnippets = function() {
        var self = this;
        jQuery('#custom-snippet').empty();
        var categories =  self.getCategoryHtml(self.customTemplates.snippets,true);
        jQuery.each(categories,function(index){
            jQuery('#custom-snippet').append(categories[index]);

        });
    };
    LacetEastPanel.prototype.getCustomSnippetMenuItem = function(id,name,icon){
        var listItem = jQuery('<li class="dropbang"></li>').attr('klass',name).attr('id',id);
        var item = jQuery('<a type="button" class="tool"></a>').attr('klass',name).attr('title',name);
        item.append(jQuery('<i></i>').addClass(icon));
        item.append(jQuery('<span></span>').addClass('nav-label').html(name));
        item.append(jQuery('<i class="menuIcon removeCustomSnippet" ></i>').addClass('fa fa-remove fa-lg pull-right'));
        item.append(jQuery('<i class="menuIcon viewCustomSnippet" ></i>').addClass('fa fa-eye fa-lg pull-right'));

        listItem.append(item);
        return listItem;
    };
    LacetEastPanel.prototype.initCustomSnippetEvents = function(){
           var self = this;
        jQuery('#newSnippet').unbind('click').bind('click',function(ev){
            ev.stopPropagation();
            window.snippetBuilder.newCustomSnippet().done(function(){
                self.refreshCustomTemplates();
            });
        });

        jQuery('.removeCustomSnippet').unbind('click').bind('click',function(ev){
            ev.stopPropagation();
            var id = $(this).parent().parent().attr('id');
            window.snippetBuilder.removeCustomSnippet(id,function(){
                self.refreshCustomTemplates();
            });
        });

        jQuery('.viewCustomSnippet').unbind('click').bind('click',function(ev){
            ev.stopPropagation();
            var id = $(this).parent().parent().attr('id');
            console.log(id);
            window.snippetBuilder.editCustomSnippet(id).done(function(){
                self.refreshCustomTemplates();
            });
        });
    };
    /*
       Load Stock Snippets
    */
    LacetEastPanel.prototype.loadSnippets = function(url) {
        var deferred = $.Deferred();
        var self = this;
        var collection = new SnippetContainer('SnippetList');
        collection.setEditMode(false);
        //Lets Load Stock Snippets
        $.each(window.snippetManager.snippets,function(idx,stock_snippet){

            var snippet = self.createSnippet(stock_snippet);
            if(snippet){
                collection.add(snippet);
            }
        });

        jQuery('#temp').load(url,function(){
            jQuery('script[type="text/template"]').each(function(index,template){
                var snippet = self.loadSnippetTemplate(template);
                if(snippet){
                    collection.add(snippet);
                }
            });
            deferred.resolve(collection);
        });
        return deferred.promise();
    };
    LacetEastPanel.prototype.createSnippet = function(stock_snippet){
        try{
            var klass = stock_snippet.klass;
            var kind = stock_snippet.kind;
            var name = stock_snippet.name;
            var snippet = eval("new " + klass + "(\'" + name + "\',\'" + kind + "\')");
            if(snippet){
                snippet.setKlass(klass);
                snippet.setCategory(stock_snippet.category);
                snippet.setIcon(stock_snippet.icon);
                if(stock_snippet.template){
                    snippet.setTemplate(stock_snippet.template);
                }
                return snippet;
            }
        }catch(e){
            console.log(e);
        }
        return null;
    };
    LacetEastPanel.prototype.loadSnippetTemplate = function(template){
        return this.createSnippet({
                kind:template.getAttribute("kind"),
                klass:template.getAttribute("klass"),
                name:template.getAttribute("name"),
                icon:template.getAttribute("icon"),
                category:template.getAttribute("category"),
                template:template.innerHTML
        });
    };
    LacetEastPanel.prototype.appendSnippets = function() {
        jQuery('#side-menu').empty();
        var categories =  this.getCategoryHtml(this.templates.snippets);
        jQuery.each(categories,function(index){
            jQuery('#side-menu').append(categories[index]);
        });
    };
    LacetEastPanel.prototype.getMenuItem = function(name,icon){
        var listItem = jQuery('<li class="dropbang"></li>').attr('klass',name);
        var item = jQuery('<a type="button" class="tool"></a>').attr('klass',name).attr('title',name);
        item.append(jQuery('<i></i>').addClass(icon));
        item.append(jQuery('<span></span>').addClass('nav-label').html(name));

        listItem.append(item);
        return listItem;
    };
    /*
        Common Snippet Code
    */
    LacetEastPanel.prototype.getCategoryHtml = function(snippetList,custom) {
        var that = this;
        var categories = {};
        var searchString = $('#snippetSearch').val();
        jQuery.each(snippetList,function(index,snippet){
            var add = false;
            var name = snippet.name;
            if(!searchString || searchString == ""){
                add = true;
            }
            if(!add && searchString && name.toLowerCase().indexOf(searchString.toLowerCase()) != -1 ){
                add = true;
            }
            if(add){
                var category = snippet.category;
                if(category){
                    var categoryItem = categories[snippet.category];
                    if(!categoryItem){
                        categoryItem = that.getCategory(snippet);
                        categories[snippet.category] = categoryItem;
                    }
                    if(custom){
                        console.log(snippet);
                        categoryItem.find('ul').append(that.getCustomSnippetMenuItem(snippet._id,snippet.name,snippet.icon));
                    }else{
                        categoryItem.find('ul').append(that.getMenuItem(snippet.name,snippet.icon));
                    }
                }
            }
        });
        return categories;
    };
    LacetEastPanel.prototype.initDoubleClickSnippet = function(){
        var that = this;
        jQuery('.dropbang').unbind('dblclick.workit').bind('dblclick.workit',function(){
            var snippet = that.getSnippetByName(jQuery(this).attr('klass'));
            var clonedItem = snippet.clone();
            window.lacetEditor.addSnippet(clonedItem,false);
        }).unbind('click').bind('click',function(eventObject){
            eventObject.preventDefault();
            eventObject.stopPropagation();
        });
    };
    LacetEastPanel.prototype.initDragSnippet = function() {
        var that = this;
        //noinspection JSUnresolvedFunction
        jQuery(".dropbang").draggable({
            opacity: 0.50,
            tolerance: 'pointer',
            connectToSortable: ".sortable",
            cancel: '.editctrl,.controls, table, td, th, tr,.locked',
            helper: function (ev) {
                ev.stopPropagation();
                var snippet = that.getSnippetByName(jQuery(this).attr('klass'));
                return that.getHelper(snippet);
            },
            stop: function (event, ui) {
                ui.helper.fadeOut();
                return true;
            }
        });
    };
    LacetEastPanel.prototype.getCategory = function(snippet){

        var name = snippet.category;
        var icon = snippet.icon;
        var id = 'menu_' + snippet.snip_id;

        var listItem = jQuery('<li data-toggle="collapse" data-target="#' + id+ '" class="collapsed"></li>');
        var item = jQuery('<a></a>');
        item.append(jQuery('<i></i>').addClass(icon));
        item.append(jQuery('<span></span>').addClass('nav-label').html(name));
        item.append(jQuery('<span></span>').addClass('fa arrow').addClass('pull-right'));
        listItem.append(item);
        listItem.append(jQuery('<ul class="sub-menu collapse" id="'+ id + '"></ul>'));
        return listItem;
    };
    LacetEastPanel.prototype.getHelper = function(snippet){
        return jQuery('<div></div>').addClass('snippet_drop')
            .append(jQuery('<i></i>').addClass(snippet.icon).addClass('fa-3x'))
            .append(jQuery('<p></p>').html(snippet.name))
            .appendTo('Body').css('zIndex',500).attr('klass',snippet.klass).attr('id',snippet.snip_id);
    };
    /*
        Load Pages
    */
    LacetEastPanel.prototype.loadPages = function(){
        var that = this;
        window.pages.qry().setRows(500).find(function(data){
            jQuery('#pages').empty();
            jQuery.each(data.rows,function(index,item){
                jQuery('#pages').append(that.getPageMenuItem(item._id,item.name,'fa fa-file-o fa-lg'));
            });

            jQuery('.removePage').unbind('click').bind('click',function(ev){
                ev.stopPropagation();
                var id = $(this).parent().parent().attr('id');
               // alert('Are You Sure');
                that.removePage(id);
            });

            jQuery('.showPage').unbind('click').bind('click',function(ev){
                ev.stopPropagation();
                var id = $(this).attr('id');
                that.showPage(id);
            });

            jQuery('.viewPage').unbind('click').bind('click',function(ev){
                ev.stopPropagation();
                var name = $(this).parent().find('.nav-label').html();
                window.location = './#/lacet/' + name ;
            });

            jQuery('.exportAngular').unbind('click').bind('click',function(ev){
                ev.stopPropagation();
                var id = $(this).parent().parent().attr('id');
                that.renderAngularPage(id);
            });


        });
    };

    LacetEastPanel.prototype.readJsonFiles = function(){
        var deferred = $.Deferred();
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var fileList = jQuery('<input type="file" id="files" name="files[]" multiple />').appendTo("body");
            fileList.click(function() {
                $(this).change(function(evt){
                    var files = evt.target.files;
                    var jsonFiles = [];
                    for (var i = 0, f; f = files[i]; i++) {
                        var reader = new FileReader();
                        reader.onload = (function(theFile) {
                            return function(e) {
                                try{
                                    jsonFiles.push(JSON.parse(e.target.result));
                                    if(i === files.length){
                                        deferred.resolve(jsonFiles);
                                    }
                                }catch(e){
                                   console.log(e);
                                }
                            };
                        })(f);
                        reader.readAsText(f);
                    }
                    $(this).remove();
                });
            })[0].click();
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
        return deferred.promise();
    };
    
    LacetEastPanel.prototype.initPageEvents = function(){
        var self = this;

        $('#newPage').unbind('click').bind('click',function(ev){

            window.lacetEditor.newPage();
            self.updatePageName();
        });
        $('#importPage').unbind('click').bind('click',function(ev){
            self.readJsonFiles().done(function(pages){
                console.log("Importing Pages");
                console.log(pages);
                jQuery.each(pages,function(idx,page){
                    window.pages.save(page,function(data){
                        self.loadPages();
                    });
                });
            });
        });
        $('#browseFiles').unbind('click').bind('click',function(ev){
               
            window.fileBrowser.browseFiles();
        });

        $('#exportHtml').unbind('click').bind('click',function(ev){
            var json = JSON.parse(localStorage["snippetData"]);
            var page = new SnippetPage("Untitled");
            page = page.loadObject(json);
            page.setEditMode(false);
            var html = page.render();
            var data =  prettydiff({
                source: html.html(),
                mode : "beautify",
                lang  : 'html',
                wrap : 150,
                inchar : "\t",
                insize : 1
            });
             data = "data:application/text," + encodeURIComponent(data[0]);
            jQuery("<a />", {"download": json.name +  ".html","href" : data})
                .appendTo("body").click(function() {
                $(this).remove()
            })[0].click();
        });

        $('#exportPage').unbind('click').bind('click',function(ev){
            
            var json = JSON.parse(localStorage["snippetData"]);
            
            var data = "data:application/json," + encodeURIComponent(JSON.stringify(json));
            jQuery("<a />", {"download": json.name +  ".json","href" : data})
                .appendTo("body").click(function() {
                    $(this).remove()
                })[0].click();
        });

        $('#viewCachedPage').unbind('click').bind('click',function(ev){
            ev.stopPropagation();
            window.location = "#/lacetviewer";
        });

        $('#savePage').unbind('click').bind('click',function(ev){
            ev.stopPropagation();
            self.savePage();
        });

        $('#pageName').unbind('click').bind('click',function(ev){
            ev.stopPropagation();
            self.editPageName();
        });
    };
    LacetEastPanel.prototype.removePage = function(pageId) {
        var that = this;
        window.pages.remove(pageId, function () {
            that.loadPages();
        });
    };

    LacetEastPanel.prototype.showPage = function(pageId){
        var that = this;
        window.pages.getById(pageId,function(data){
            window.lacetEditor.showPage(data);
            that.updatePageName();
        });
    };
    LacetEastPanel.prototype.updatePageName = function(){
        var pageName = window.lacetEditor.page.name;
        if(!pageName){
            pageName = "Untitled";
        }
        $('#pageName').html(pageName);
    };
    LacetEastPanel.prototype.savePage = function(){
        var that = this;
        var page = window.lacetEditor.page.saveObject();
        console.log('Save Page');
        console.log(page);
        window.pages.save(page,function(data){
            console.log('Save Page Result');
            console.log(data);
            window.lacetEditor.showPage(data);
            that.updatePageName();
            that.loadPages();
        });
    };
    LacetEastPanel.prototype.editPageName = function () {
        var that = this;
        bootbox.dialog({
                title: "Edit Page Name",
                message:
                '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-2 control-label" for="propPageName">Name</label> ' +
                '<div class="col-md-8"> ' +
                '<input id="propPageName" name="propPageName" type="text" placeholder="Page Name" class="form-control input-md"> ' +
                '</div>' +
                /*'<span class="input-group-btn"> ' +
                 '<button class="btn btn-success btn-sm" data-iconset="fontawesome" role="propiconpicker"></button>'+
                 '</span>' +*/
                '</div>' +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-default",
                        callback: function () {
                            window.lacetEditor.page.name = $('#propPageName').val();
                            $('#pageName').html(window.lacetEditor.page.name);
                            that.savePage();
                        }
                    }
                }
            }
        );
        $('#propPageName').val($('#pageName').html());
    };
    LacetEastPanel.prototype.getPageMenuItem = function(id,name,icon){

        var listItem = jQuery('<li class="showPage"></li>').attr('id',id);
        var item = jQuery('<a></a>');
        item.append(jQuery('<i></i>').addClass(icon));
        item.append(jQuery('<span></span>').addClass('nav-label').html(name));
        item.append(jQuery('<i class="menuIcon removePage" ></i>').addClass('fa fa-remove fa-lg pull-right'));
        item.append(jQuery('<i class="menuIcon viewPage" ></i>').addClass('fa fa-eye fa-lg pull-right'));
        listItem.append(item);
        return listItem;
    };

    window.lacetEastPanel = new LacetEastPanel();
    // When the DOM is ready, run the application.
    jQuery(function () {

    });
    // Return a new application instance.
    return( window.lacetEastPanel );
})(jQuery);