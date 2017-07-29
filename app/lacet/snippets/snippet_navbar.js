var SnippetNavBarItem =   Snippet.extend({
    init:function(name,kind){
        this._super( name,kind);
        this.klass="SnippetNavBarItem";
    },
    schema:function(){
        return {
            'title':'Navigation Bar Item',
            'id':'bootstrap.navItem',
            'extends':this._super(),
            'properties': {
                'label': {'type': 'string', default: 'Link'},
                'link':{'type': 'string',format:'link',default:'http://bluntsoftware.com'},
                'type': {'type': 'string',enum: ['link','button','search','divider'], options: { enum_titles: ["link","button","search","divider"]},'default':'link'},
                'icon':{ 'type': 'string','format':'icon','default':''},
                'container':{'type': 'string',format:'containerChooser',default:'None'},
                'fillPage':{'type': 'string',format:'pageChooser',default:'None'},
                'location': {'type': 'string',enum: ['navbar-left','', 'navbar-right'], options: { enum_titles: ["Left","Center","Right"]},'default':''},
                'menuItems':{ title: "Menu Items",type: "array",  format:'form',uniqueItems: false,
                    disable_collapse:false,
                    items: {
                        type: "object",
                        title: "Menu Item",
                        headerTemplate: "{{ i1 }}",
                        properties:{
                            'label': {'type': 'string', default: 'Link'},
                            'link':{'type': 'string',format:'link',default:'http://bluntsoftware.com'},
                            'type': {'type': 'string',enum: ['link','button','search','divider'], options: { enum_titles: ["link","button","search","divider"]},'default':'link'},
                            'icon':{ 'type': 'string','format':'icon','default':''},
                            'container':{'type': 'string',format:'containerChooser',default:'none'},
                            'fillPage':{'type': 'string',format:'pageChooser',default:'None'}
                        }
                    },default:[
                        
                    ]
                }
            }

        }
    },
    /**
     *
     <ul href="" class="dropdown-menu">
        <li><a ui-sref="admin.docs.intro"><span class="fa fa-gear"></span>&nbsp;{{account.firstName}}</a></li>
     */
    render:function(){
        var lineItem = jQuery('<li></li>');
        var component = jQuery('<a></a>');
        if(this.properties.type === 'divider'){
            lineItem.addClass('nav-divider')
        }else {
            if (this.properties.icon) {
                component.append('<span class="fa ' + this.properties.icon + '"></span>')
            }
            component.append('&nbsp;' + this.properties.label);
            lineItem.append(component);

         if(this.properties.menuItems  && this.properties.menuItems.length > 0){
             component.addClass("dropdown-toggle");
             component.attr('data-toggle','dropdown');
             component.attr('role','button');
             component.append('<span class="caret"></span>');
             var menu = jQuery('<ul class="dropdown-menu"></ul>');

             $.each(this.properties.menuItems,function(idx,item){
                 var menuLineItem = jQuery('<li></li>');
                 var menuComponent = jQuery('<a></a>');
                  if(item.type === 'divider'){
                      menuLineItem.addClass('nav-divider')
                  }else{
                      if(item.icon){
                          menuComponent.append('<span class="fa '+item.icon + '"></span>')
                      }
                      menuComponent.append('&nbsp;' + item.label);
                      if(item.fillPage && item.fillPage !== 'None' && item.container && item.container !== 'None'){
                          menuComponent.addClass("fillPage").attr('fillPage',item.fillPage).attr('container',item.container);
                      }else if(item.link){
                          menuComponent.attr('href',item.link);
                      }
                      menuLineItem.append(menuComponent);
                  }

                 menu.append(menuLineItem);
             });
             lineItem.append(menu);
         }else{
             if (!this.edit_mode) {

                 if (this.properties.fillPage && this.properties.fillPage !== 'None' && this.properties.container && this.properties.container !== 'None') {
                     component.addClass("fillPage").attr('fillPage', this.properties.fillPage).attr('container', this.properties.container);
                 } else if (this.properties.link) {
                     component.attr('href', this.properties.link);
                 }
             }
         }
        }
        if(this.edit_mode){
            lineItem.addClass('sortable');
            component.attr('id',this.snip_id).addClass('selectable');
        }

        return  lineItem;
    },
    afterRender:function(){
        var self = this;
        this._super();
         $('.fillPage').unbind('click').bind('click',function(){
             var containerName =  $(this).attr('container');
             window.pages.getById($(this).attr('fillPage'),function(data){
                 var container = self.findContainer(containerName);
                 if(container){
                     var obj = container.loadObject(data);
                     obj.setEditMode(self.edit_mode);
                     obj.render($('#'+ container.snip_id));
                 }
             });
         });
    }
});

var SnippetNavBar =   SnippetContainer.extend({
    init: function (name,kind) {
        this._super(name,kind);
        this.klass = "SnippetNavBar";
        this.type = 'SnippetNavBar';
    },
    schema:function(){
        return {
            'title':'Navigation Bar',
            'id':'bootstrap.nav',
            'extends':this._super(),
            'properties': {
                'Brand': {'type': 'string', default: 'Brand'},
                'Image': {'type': 'string', 'format':'imageChooser',default: null},
                'image_class':{'type':'string',default: null},
                'img_height': {'type': 'number', default: 30},
                'img_width': {'type': 'number', default: 30},
                'link':{'type': 'string',format:'link','default':'http://bluntsoftware.com'},
                'Inverse':{'type': 'boolean', default: false},
                'location': {'type': 'string',enum: ['navbar-fixed-top','navbar-fixed-bottom', 'navbar-static-top','navbar-static'], options: { enum_titles: ["Fixed Top","Fixed Bottom","Static Top","Static"]},'default':'navbar-fixed-top'}
            }
        }
    },
    add : function(snippet,above) {
        try {
            if( snippet.klass === 'SnippetNavBarItem' ){
                this._super(snippet,above);
            }
        }catch(e){
            console.log(e);
            console.log(snippet);
        }
    },
    render:function(){
        var that = this;
        var div = jQuery('<div></div>');

        var navBar = jQuery('<nav role="navigation"></nav>');
       // navBar.addClass('container-padding');
        div.attr('id',this.snip_id);
        navBar.addClass('navbar navbar-default');
        navBar.css('padding-right','25px');
        if(this.properties.Inverse === true){
            navBar.addClass('navbar-inverse');
        }
        var body = $('body');
        body.css('padding-top','0px');
        body.css('padding-bottom','0px');
        if(this.edit_mode){
            div.addClass('container-padding');
            div.addClass('selectable');
            navBar.addClass('sortable');
        }else{
            if(this.properties.location === 'navbar-fixed-top'){
                body.css('padding-top','45px');
            }
            if(this.properties.location === 'navbar-fixed-bottom'){
               body.css('padding-bottom','40px');
            }
            //if(this.properties.location === 'navbar-static'){

            //}
            navBar.addClass(this.properties.location);
        }
        var header = jQuery(
             '<div class="navbar-header">' +
                 '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#top_navbar">' +
                    '<span class="sr-only">Toggle navigation</span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                 '</button>' +
             '</div>');

        
             var brand = jQuery('<a class="navbar-brand"></a>');
             if(this.properties.link && !this.edit_mode){
                   brand.attr('href',this.properties.link);
             }
             if(this.properties.Image){
                 var image = jQuery('<img alt="Brand">');
                 image.addClass(this.properties.image_class);
                 image.attr('src',this.properties.Image).attr('height',this.properties.img_height).attr('width',this.properties.img_width);
                 brand.append(image);
             } else if(this.properties.Brand){
                 brand.append(this.properties.Brand);
             }
        header.append(brand);
         var content = jQuery('<div class="collapse navbar-collapse" id="top_navbar"></div>');
            var navLeft = jQuery('<ul class="nav navbar-nav navbar-left"></ul>');
            var navCenter = jQuery('<ul class="nav navbar-nav"></ul>');
            var navRight = jQuery('<ul class="nav navbar-nav navbar-right"></ul>');
            jQuery.each(this.snippets,function(index,snippet){

                if(snippet.properties.location == 'navbar-left'){
                    navLeft.append(snippet.render());
                } else if(snippet.properties.location == 'navbar-right'){
                    navRight.append(snippet.render());
                } else{
                    navCenter.append(snippet.render());
                }
            });
        content.append(navLeft);
        content.append(navCenter);
        content.append(navRight);
        navBar.append(header);
        navBar.append(content);
        div.append(navBar);
        return div;
    }
});