(function () {
    function FileBrowser() {
        this.editor = null;
    }
    FileBrowser.prototype.getBaseUrl = function(){
         if(!base_url){base_url = '../';}
         return base_url;
     };
    FileBrowser.prototype.browseFiles = function (cb) {
        var that = this;
        var editor = $('<div></div>');
        editor.load("lacet/editor/file_browser.html", function (responseTxt, statusTxt, xhr) {
            bootbox.dialog({
                    title: "File Manager",
                    message: editor,
                    size: 'large',
                    className: 'FileBrowse',
                    onEscape: function (result) {
                    },
                    buttons: {
                        success: {
                            label: "Choose",
                            className: "btn-success",
                            callback: function () {
                                if(cb){
                                    cb('assets/get?file=' + $('#dir').html());
                                }
                                //alert($('#dir').html());
                            }
                        }
                    }
                }
            );

            //File Upload
            that.refreshTree();
            $("#upload-files").fileinput({
                uploadUrl:  that.getBaseUrl() + 'assets/multi_upload',
                uploadExtraData: function (previewId, index) {
                    var info = {"dir": $('#path').html()};
                    return info;
                }
            });
            $('#newFolder').unbind('click').bind('click',function(){
                that.newFolder();
            });
        });
    };
    FileBrowser.prototype.refreshTree = function () {
        var that = this;
        //File Browser
        var fileTree =$('#file-tree-holder');
        fileTree.html('');
        fileTree.html('<div id="jsfiletree" ></div>');
        $('#jsfiletree').fileTree({
            script: that.getBaseUrl() + 'assets'
        },function(file) {
            $('#fileDetail').html('<img style="width:256px" src="' + that.getBaseUrl() + "assets/get?file=" + file + '"></img>');
        }).on('filetreeexpand filetreecollapse filetreeclicked', function(e, data) {
            $('#dir').html(data.rel);
            that.listenForDelete();
        });
        setInterval(function(){ that.listenForDelete(); }, 525);
        //Folder Browser
        var folderTree =$('#folder-tree-holder');
        folderTree.html('');
        folderTree.html('<div id="jsfoldertree" ></div>');
        $('#jsfoldertree').fileTree({
            script: that.getBaseUrl() + 'assets/folders'
        }).on('filetreeexpand filetreecollapse', function(e, data) {
            $('#path').html(data.rel);
        });

    };
    FileBrowser.prototype.listenForDelete = function () {
        var self = this;
          $('.remove-directory').unbind('click').bind('click',function () {
              // alert('Remove Directory ' + $(this).prev().attr('rel'));
              var api = new RestCollection(self.getBaseUrl() + 'assets');
              api.call('remove?file='+ $(this).prev().attr('rel') ,'','post',function(data){

                  self.refreshTree();
              });
          });
        $('.remove-file').unbind('click').bind('click',function () {
           // alert('Remove File ' + $(this).prev().attr('rel'));
            var api = new RestCollection(self.getBaseUrl() + 'assets');
            api.call('remove?file='+ $(this).prev().attr('rel') ,'','post',function(data){

                self.refreshTree();
            });

        })
    };

    FileBrowser.prototype.newFolder = function () {
         var that = this;
        bootbox.dialog({
                title: "New Folder",
                message:
                '<div class="row">  ' +
                '<div class="col-md-12"> ' +
                '<form class="form-horizontal"> ' +
                '<div class="form-group"> ' +
                '<label class="col-md-2 control-label" for="propPageName">Name</label> ' +
                '<div class="col-md-8"> ' +
                '<input id="propFolderName" name="propFolderName" type="text" placeholder="New Folder Name" class="form-control input-md"> ' +
                '</div>' +
                '</div>' +
                '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-default",
                        callback: function () {
                            var newDirName = $('#path').html() + $('#propFolderName').val() ;
                            var api = new RestCollection(that.getBaseUrl() + 'assets');
                             api.call('mkdirs?dir='+ newDirName,'','get',function(){
                                 that.refreshTree();
                             });
                        }
                    }
                }
            }
        );
    };


    window.fileBrowser = new FileBrowser();
    // When the DOM is ready, run the application.
    jQuery(function () {

    });
    // Return a new application instance.
    return( window.fileBrowser );
})(jQuery);
