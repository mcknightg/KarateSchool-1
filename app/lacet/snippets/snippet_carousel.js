var SnippetCarousel = Snippet.extend( {
    init: function (name,kind) {
        this._super(name,kind );
        this.klass = "SnippetCarousel";
        this.type = 'SnippetCarousel';
    },
    schema:function(){
        return {
            'id':'bootstrap.carousel',
            'type': "object",
            'title':'Carousel',
            'extends':BootstrapSnippet,
            'properties':{
                'id':{default:'carousel_inSlider'},
                'scale':{'type': 'boolean','default':true},
                'carouselList':{ type: "array", title: " ",format:'tabs', uniqueItems: false,
                    disable_collapse:false,
                    items: {
                        type: "object",
                        title: "Panel",
                        "headerTemplate": "{{ i1 }}",
                        "extends": [BootstrapImage,BootstrapHeader,BootstrapText,BootstrapIcon]
                    },
                    default:[
                        {"image":"img/header_one.png","icon":"fa-edit","header":"<h2>Carousel Panel 1</h2>","text":"Carousel text for Panel 1. Double click to edit"},
                        {"image":"img/header_two.png","icon":"fa-edit","header":"<h2>Carousel Panel 2</h2>","text":"Carousel text for Panel 2. Double click to edit"}
                    ]
                }
            }
        }
    },
    render:function(){

        var root_id = this.properties.id;
        var carousel = jQuery('<div></div>').attr('id',root_id).addClass('carousel').addClass('slide').attr('data-ride','carousel');

        var carouselIndicators = jQuery('<ol></ol>').addClass('carousel-indicators');
        var carouselInner = jQuery('<div></div>').addClass('carousel-inner').attr('role','listbox');
        var scale =  this.properties.scale;
        jQuery.each(this.properties.carouselList,function(index,item){
            var active = index == 0 ? 'active' : '';
           
            var captionDiv = jQuery('<div></div>').addClass('carousel-caption');
            captionDiv.append(jQuery('<h4></h4>').html(item.header));
            captionDiv.append(jQuery('<p></p>').html(item.text));

            var imageDiv =  jQuery('<img />').attr('src',item.image).attr('alt','');
            var itemDiv = jQuery('<div></div>').addClass('item').addClass(active);

            if(!scale){

                var container = jQuery('<div></div>').addClass('container');
                container.append(captionDiv);
                itemDiv.append(container);

                var imageHeader = jQuery('<div></div>').addClass('header-back');
                imageHeader.append(imageDiv);
                itemDiv.append(imageHeader);
            }else{
                itemDiv.append(captionDiv);
                itemDiv.append(imageDiv)
            }
            //Items
            carouselInner.append(itemDiv);
            //Indicators
            carouselIndicators.append(jQuery('<li></li>').attr('data-target','#'+root_id).attr('data-slide-to',index).addClass(active));
        });
        carousel.append(carouselIndicators);
        carousel.append(carouselInner);

        if(this.properties.carouselList.length >1){
            var leftControl = jQuery('<a></a>').addClass('left').addClass('carousel-control')
                .attr('data-target','#'+root_id).attr('role','button').attr('data-slide','prev');
            leftControl.append(jQuery('<span></span>').addClass('glyphicon').addClass('glyphicon-chevron-left').attr('aria-hidden','true'));
            leftControl.append(jQuery('<span></span>').addClass('sr-only').html('Previous'));
            carousel.append(leftControl);

            var rightControl = jQuery('<a></a>').addClass('right').addClass('carousel-control')
                .attr('data-target','#'+root_id).attr('role','button').attr('data-slide','next');
            rightControl.append(jQuery('<span></span>').addClass('glyphicon').addClass('glyphicon-chevron-right').attr('aria-hidden','true'));
            rightControl.append(jQuery('<span></span>').addClass('sr-only').html('Next'));
            carousel.append(rightControl);
        }

        if(this.edit_mode){
            return jQuery('<div></div>').attr('id',this.snip_id).addClass('selectable').addClass('moveable').append(carousel);
        }
        return carousel;
    }
});
window.snippetManager.registerSnippet({kind:'bootstrap.carousel',klass:'SnippetCarousel',name:'Carousel',icon:'fa fa-edit',category:'Media'});
