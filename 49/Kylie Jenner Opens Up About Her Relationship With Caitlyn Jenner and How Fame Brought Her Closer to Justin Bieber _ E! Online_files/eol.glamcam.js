/**
 * Custom widget for glamcam 360 display.
 */
(function ($) {
    // This jQuery widgetFactory code example is not a standard eol JS library implementation. It's a one-off. Don't copy this when making a new widget. We'll have to refactor it later to: 1) Make it simpler for non-Ajax web developers to use, 2) Fix issues with "var that = this;", 3) use shorthand function names like "function abc(){...}" instead of the long-hand function labels like "abc: function(){...}", 3) Use short functions like "fb()" instead of "that.fb()" or "console.log()".
    $.widget("eol.glamcam", {
        version: "1.1.0",
        debug: {
            all: false,
            animation: false,
            fnTrace: false,
            skipAd: false,
            programName: 'Eonline.com GlamCam',
            webDevTwitterAcct: 'eDevelopers1'
        },
        options: {
            // default settings
            useCanvasTag: true,					// use div based canvas when set to false
            numFrames: 48,						// number of frames contained in sprite map
            canvasWidth: 590,					// canvas size
            canvasHeight: 330,
            spriteFrameWidth: 590,				// image size of each frame in the sprite map
            spriteFrameHeight: 330,
            //zoomSliderHeight: 100,
            zoomSliderMax: 200,					// number of increments in the zoom slider
            maxZoomRatio: 2,					// zoom in ratio supported
            interval: 100,						// milliseconds of animation interval
            //zoomSpinEnabled: false,
            directionForward: false,			// spin direction
            showPlayButton: true,				// show the bottom pane with play button if set to true
            showZoomControl: true,				// show zoom slider if set to true
            autoStart: true,					// auto start animation
            //extendedZoomControl: false,			
            enableMouseSpin: true,				// use mouse drag left/right off center to control spin direction
            enableZoomFunction: false,			// enable zoom function whether using zoom slider or gesture
            // url's
            imageFolderUrl: "",
            largeImageFileExtention: ".jpg",
            largeImageFilePrefix: "",
            smallImageFileExtention: ".jpg",
            smallImageFilePrefix: "image_",
            spriteMapFileName: "",
            linkUrl: "",
            // mobile options
            isMobile: false,					// enable mobile experience
            //vmousedown_time_ref: "",
            //vmousedown_x_ref: "",
            tapToLink: false        			// for V11, tapping on widget should lead user to the glamcam link
        },

        // sub component id's
        identifiers: {
            mobileContentId: 'content',
            canvasId: 'glamcam',
            playButtonId: 'playButton',
            zoomSliderId: 'zoomSlider',
            zoomInButtonId: 'zoomInButton',
            zoomOutButtonId: 'zoomOutButton',
            //overlayButtonId: 'overlayButton',
            bottomPaneId: 'bottomPane',
            loaderId: 'loader'
        },
        
        // class names
        classes: {
            containerClass: 'glamcamContainer',
            canvasClass: 'glamcamCanvas',
            zoomSliderWrapClass: 'zoomSliderWrap',
            zoomSliderClass: 'zoomSlider',
            playButtonClass: 'playButton',
            playButtonImageClass: 'playButtonImage',
            pauseButtonClass: 'pauseButton',
            pauseButtonImageClass: 'pauseButtonImage',
            zoomInButtonClass: 'zoomInButton',
            zoomOutButtonClass: 'zoomOutButton',
            bottomPaneClass: 'bottomPane',
            videoDivClass: 'videoDiv',
//            overlayButtonClass: 'overlayButton',
            zoomContainerClass: 'zoomContainer',
            //extendedZoomControlClass: 'extendedZoomControl',
            loaderClass: 'loader',
            loaderImageClass: 'loaderImage'
        },
        
        /* Since the sprite map is a 6 column by 8 row sprite map image, we don't need to use the <canvas> tag... which IE 7 & 8 can't support.
           Nor do we need any extra libraries to back-hack IE 7 & 8 into using a pseudo-<canvas> tag. All that we need to do is take a <div> & apply the background sprite map image to it. Then we track the column & row values. We move +1 column until we reach the end of the row.
           Then we move +1 row & reset the column to 1. When we reach column 6, row 8, then we reset to column 1, row 1.
        */
        data: {
            // Sprite map coordinates
            spriteCoords: {
                "col": 5, // This is a zero-based number, which = column 6.
                "row": 7, // This is a zero-based number, which = row 8.
                "signX": "-",
                "signY": "-"
            }
        },

        /* webTemplate: "<div class='loader'><div class='loaderImage'></div></div><canvas id='glamcam-gc' class='glamcamCanvas' width='590' height='330'></canvas><div id='adDiv' class='videoDiv'><div id='overlayButton' class='overlayButton'></div><video id='ad'></video></div><div id='bottomPane' class='bottomPane'><div id='playButton-gc' class='pauseButton'><div class='playButtonImage'></div></div></div><div class='zoomContainer extendedZoomControl'><div id='zoomInButton-gc' class='zoomInButton'><span>+</span></div><div class='zoomSliderWrap'><div id='zoomSlider-gc' class='zoomSlider'></div><div id='zoomOutButton' class='zoomOutButton'><span>-</span></div>",

        mobileTemplate: "",*/

        fb: function(obj) {
            var that = this;
            if ((that.debug.all || that.debug.animation || that.debug.fnTrace) && ((typeof(console) !== 'undefined') && (typeof(console.log) !== 'undefined'))
            && obj) {
                console.log(that.debug.programName + ' (Tweet:' + that.debug.webDevTwitterAcct + ') ' + obj);
            }
        },

        _create: function() {
            var that = this;

            var elemId = this.element.attr("id");
            this.glamcam = $("#" + elemId);
            // append elem id to sub component id
            $.each(this.identifiers,function(id, val){that.identifiers[id] = val + '-' + elemId;});

            // canvas support
            this.useCanvas = Modernizr.canvas;
            // glamcam will start spinning only when both of these two status are true
            this.imageLoaded = false;
            this.startRequested = this.options.autoStart;
            
            // check for mobile version
            this.isiPad = navigator.userAgent.match(/iPad/i) !== null;
            this.isAndroid = navigator.userAgent.match(/android/i) !== null;
            
            // initialize display options
            this.options.showZoomControl = this.options.showZoomControl && !this.options.isMobile && !this.isiPad;
            this.options.enableMouseSpin = this.options.enableMouseSpin && !this.isiPad;

            // create sub components
            if (this.options.isMobile) {
                $('#'+this.identifiers.mobileContentId).prepend(this.glamcam);
            } else if ($('#'+elemId) === undefined) {
                $('body').append($("<div/>",{id:elemId}));
            }

            this.glamcam.addClass(this.classes.containerClass);
            this.loader = $("<div/>").addClass(this.classes.loaderClass).appendTo(this.glamcam);
            this.loaderImage = $("<div/>").addClass(this.classes.loaderImageClass).appendTo(this.loader);

            // create main component
            if (this.options.useCanvasTag && this.useCanvas) {
                this.canvasWidget = $("<canvas/>",{id:this.identifiers.canvasId}).addClass(this.classes.canvasClass).appendTo(this.glamcam);
            } else { // if (!this.options.useCanvasTag || is_IE7 || is_IE8) {
                var bkgCoords = this._getBkgCoords();
                this.canvasWidget = $('<div id="' + this.identifiers.canvasId + '" style="background-position:' + bkgCoords + '"/>').addClass(this.classes.canvasClass).appendTo(this.glamcam);
                var strBackgroundUrl = "url('" + this._getSpriteMapUrl() + "') no-repeat 0px 0px";
                var leftOffset = (-1)*Math.round(that.options.canvasWidth/2);
                var scale = (Math.round(that.options.canvasWidth*10/590))/10;
                var scaleString = "scale(" + scale + "," + scale + ")";
                var transformOriginString = "0 0";
                $('#' + this.identifiers.canvasId).css({
                    "background": strBackgroundUrl,
                    "transform": scaleString,
                    "transform-origin": transformOriginString,
                    "-ms-transform": scaleString, /* IE 9 */
                    "-moz-transform": scaleString, /* Firefox */
                    "-webkit-transform": scaleString, /* Safari and Chrome */
                    "-webkit-transform-orgin": transformOriginString,
                    "-o-transform": scaleString, /* Opera */
                    "height": that.options.spriteFrameHeight,
                    "width": that.options.spriteFrameWidth,
                    "-ms-filter": "progid:DXImageTransform.Microsoft.Matrix(M11="+scale+", M12=0, M21=0, M22="+scale+", SizingMethod='auto expand')", /* IE 8 */
                    "filter": "progid:DXImageTransform.Microsoft.Matrix(M11="+scale+",M12=0,M21=0,M22="+scale+",SizingMethod='auto expand')" /* IE 7 */
                });
            }

            // setting main component size
            if (this.options.isMobile) {
                $('#'+this.identifiers.mobileContentId).attr('width', "100%");
                this.glamcam.attr('width','100%');
                this.canvasWidget[0].width = "590";
                this.canvasWidget[0].height = "330";
            } else {
                this.glamcam.attr('width',this.options.canvasWidth).attr('height',this.options.canvasHeight);
                this.canvasWidget.attr('width',this.options.canvasWidth).attr('height',this.options.canvasHeight);
            }

            // create canvas component
            if (this.options.useCanvasTag && this.useCanvas) {
                this.canvas = document.getElementById(this.identifiers.canvasId);
                if (typeof FlashCanvas !== "undefined") {
                    FlashCanvas.initElement(this.canvas);
                }
                this.context = this.canvas.getContext("2d");
            }

            // create controls
            this._addPlayButtonPane();
            this._addZoomControl();
        },

        _addPlayButtonPane: function() {
            var that = this;
            //if (this.options.showPlayButton) {
                this.bottomPane = $("<div/>",{id:this.identifiers.bottomPaneId}).addClass(this.classes.bottomPaneClass).appendTo(this.element);
                if (!this.isiPad && this.options.showPlayButton) {
                    this.bottomPane.hide();
                }
                this.playButton = $("<div/>",{id:this.identifiers.playButtonId}).addClass(this.classes.playButtonClass).appendTo(this.bottomPane);
                $("<div/>").addClass(this.classes.playButtonImageClass).appendTo(this.playButton);

                if (this.playButton !== undefined) {
                    this.playButton.click(function() {
                        if (that.currentZoomRatio > 1) {
                            $.when(that._center(),that._animateZoomOut()).then(function(){
                                that.playOrPause();
                            });
                        } else {
                            that.playOrPause();
                        }
                    });
                }
            //}
        },
        
        _addZoomControl: function() {
            var that = this;
            //if (this.options.showZoomControl && this.options.enableZoomFunction) {
                this.zoomControl = $("<div/>").addClass(this.classes.zoomContainerClass).appendTo(this.glamcam).hide();
//                if (this.options.extendedZoomControl) {
//                    this.zoomControl.addClass(this.classes.extendedZoomControlClass);
//                }
                this.zoomInButton = $("<div/>",{id:this.identifiers.zoomInButtonId} ).button({
                    label: '+'
                }).addClass(this.classes.zoomInButtonClass).appendTo(this.zoomControl);
                this.zoomSliderWrap = $("<div/>").addClass(this.classes.zoomSliderWrapClass).appendTo(this.zoomControl);
                this.zoomSlider = $("<div/>",{id:this.identifiers.zoomSliderId}).slider({
                    orientation: "vertical",
                    range: "min",
                    animate: true,
                    min: 1,
                    max: that.options.zoomSliderMax,
                    value: 1
                }).addClass(this.classes.zoomSliderClass).appendTo(this.zoomSliderWrap);

                this.zoomOutButton = $("<div/>",{id:this.identifiers.zoomOutButtonId} ).button({
                    label: '-'
                }).addClass(this.classes.zoomOutButtonClass).appendTo(this.zoomControl);
                // bind listener
                this.canvasWidget.mousewheel(function(event, delta, deltaX, deltaY) {
//                    event.preventDefault();
                    if (!that.playing && that.option.enableZoomFunction) {
                        $.when(that._center()).then(function() {
                            that._zoom(delta > 0);
                        });
                    }
                });

                if (this.zoomInButton !== undefined) {
                    this.zoomInButton.mousedown(function() {
                        that.zoomInButtonPressed = true;
                        $.when(that._center()).then(function(){
                            if (that.zoomInButtonPressed) {
                                that.zoomTimeout = setInterval(function() {
                                    that._zoom(true);
                                }, 10);    
                            } else {
                                that._zoom(true);
                            }
                        });
                    }).bind('mouseup mousereleave', function() {
                        clearInterval(that.zoomTimeout);
                        that.zoomInButtonPressed = false;
                    });
                }
                if (this.zoomOutButton !== undefined) {
                    this.zoomOutButton.mousedown(function() {
                        that.zoomOutButtonPressed = true;
                        $.when(that._center()).then(function(){
                            if (that.zoomOutButtonPressed) {
                                that.zoomTimeout = setInterval(function() {
                                    that._zoom(false);
                                }, 10);
                            } else {
                                that._zoom(false);
                            }
                        });
                    }).bind('mouseup mousereleave', function() {
                        clearInterval(that.zoomTimeout);
                        that.zoomOutButtonPressed = false;
                    });
                }
            //}    
        },
        
        _init: function() {
            var that = this;

            this.timer = null;
            this.currentDrawFrameWidth = this.options.canvasWidth;
            this.currentDrawFrameHeight = this.options.canvasHeight;
            this.index = 0;
            this.previousZoomRatio = 1;
            this.currentZoomRatio = 1;
            this.imageLoadCount = this.options.numFrames;
            // initialize zoom, pan variables
            this.panStartX = 0;
            this.panStartY = 0;
            this.panDistanceX = 0;
            this.panDistanceY = 0;
            this.currentPanOffsetX = 0;
            this.currentPanOffsetY = 0;
            this.startDragging = false;
            this.zoomTimeout = null;

            this.imageStack = [];
            this.playing = false;

            this.useSpriteMap = (this.options.spriteMapFileName !== undefined && this.options.spriteMapFileName !== "" && !this.isiPad);
            this.useLargeImage = (this.options.largeImageFilePrefix !== undefined && this.options.largeImageFilePrefix !== "" && this.options.largeImageFileExtention !== undefined && this.options.largeImageFileExtention !== "");

            this.zoomSliding = false;
            this.zoomSlider && this.zoomSlider.slider({
                slide: function( event, ui ) {
                    if (!that.zoomSliding) {
                        that.zoomSliding = true;
                        that.currentZoomRatio = 1 + (ui.value)/that.options.zoomSliderMax*(that.options.maxZoomRatio-1);
                        if (that.zoomImage === undefined || that.zoomImage === null|| that.index !== that.zoomIndex) {
                            $.when(that._loadZoomImage(that.index)).then(function() {
                                that._zoomUpdate();
                                that.zoomSliding = false;
                            });
                        } else {
                            that.currentDrawFrameWidth = Math.round(that.options.canvasWidth*that.currentZoomRatio);
                            that.currentDrawFrameHeight = Math.round(that.options.canvasHeight*that.currentZoomRatio);
                            $.when(that._center()).then(function(){
                                that._zoomUpdate();
                                that.zoomSliding = false;
                            });
                        }
                    }
                }
            });
            if (this.useSpriteMap) {
                $.when(this._loadSpriteMap()).then(function() {
                    that.imageLoaded = true;
                    that.readyToStart();
                });
            } else {
                for (var i=0, j=this.options.numFrames; i<j; i++) {
                    $.when(this._loadImage(i)).then(function() {
                        that.imageLoadCount--;
                        if (that.imageLoadCount === 0) {
                            that.loader && that.loader.hide();
                            that.imageLoaded = true;
                            that.readyToStart();
                        }
                    });
                }
            }

            if (this.options.isMobile || this.isiPad) {
                $.mobile && $.mobile.loading('hide');
                $.mobile && $.mobile.hidePageLoadingMsg();

                this.hammer = this.glamcam.hammer({
                    tap_max_interval: 1000,
                    drag_min_distance: 0,
                    transform: true,
                    hold: false,
                    prevent_default: true
                });
                this.hammer.bind("tap", function(e) {
                    if (e.type === "tap") {
                        if (that.options.tapToLink) {
                            window.location = that.options.linkUrl;
                        } else {
                            that.playOrPause();
                        }
                    }
                });
                // enable pinch zoom in and panning only for iPad
                if (this.isiPad) {
                    if (!this.options.tapToLink) {
                        this.hammer.bind("dragstart", function(e) {
                            that._startDragging(e.touches[0].x, e.touches[0].y);
                        });
                        this.hammer.bind("drag", function(e) {
                            that._dragging(e.touches[0].x, e.touches[0].y);
                        });
                        this.hammer.bind("dragend", function(e) {
                            that._stopDragging(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY);
                        });
                    }
                    /*this.hammer.bind("transform", function(e) {
                        //that.fb('transform', e);
                        //that.fb('hammer transform ' + e.scale);
                        that.currentZoomRatio = that.previousZoomRatio * e.scale;
                        //that.fb('transform ratio ' + that.currentZoomRatio);
                        if (!that.playing&& that.currentZoomRatio >= 1 && that.currentZoomRatio <= that.options.maxZoomRatio) {
                            that.currentDrawFrameWidth = Math.round(that.options.canvasWidth*that.currentZoomRatio);
                            that.currentDrawFrameHeight = Math.round(that.options.canvasHeight*that.currentZoomRatio);
                            if (that.zoomImage === undefined || that.zoomImage === null || that.index !== that.zoomIndex) {
                                $.when(that._loadZoomImage(that.index)).then(function() {
                                    //that._panningReset();
                                    that._zoomUpdate();
                                });
                            } else {
                                //that._panningReset();
                                that._zoomUpdate();
                            }
                        }
                    });
                    this.hammer.bind("transformstart", function(e) {
                        //that.fb('hammer transformstart ' + e);
                    });
                    this.hammer.bind("transformend", function(e) {
                        //that.fb('hammer transformend ' + e);
                    // if zoom in, then center the image
                        (that.currentZoomRatio < that.previousZoomRatio) && that._center();
                        that.previousZoomRatio = that.currentZoomRatio;
                    });*/
                }
                if (!this.options.tapToLink) {
                    this.hammer.bind("swipe", function(e) {
                        var direction = e.direction;
                        if (direction === "left" || direction === "right") {
                            direction && that._changeDirection(direction === "right");
                        }
                    });
                }
//                this.canvasWidget.bind('vmousedown',function(e) {
//                    that.options.vmousedown_time_ref = e.timeStamp;
//                });
            }
            if (!this.options.isMobile || this.isiPad) {
                this.canvasWidget.mousedown(function(eventData) {
                    that._startDragging(eventData.clientX, eventData.clientY);
                });  
                this.canvasWidget.mouseover(function() {
                    that.canvasWidget.focus();
                });
                this.canvasWidget.mouseup(function(eventData) {
                    if ((typeof(this.canvas) !== 'undefined') && (typeof(this.canvas.style) !== 'undefined')) {
                        that.canvas.style.cursor = 'default';
                    }
                    if (that.startDragging) {
                        that._stopDragging(eventData.clientX, eventData.clientY);
                    }
                });
                this.canvasWidget.mouseleave(function(eventData) {
                    if (that.startDragging && (eventData.which > 0 || (eventData !== undefined && eventData.buttons > 0))) {
                        that._stopDragging(eventData.clientX, eventData.clientY);
                    }
                });
                this.canvasWidget.mousemove(function(eventData) {
                    // check mouse down and dragging is started
                    if (that.startDragging && (eventData.which > 0 || (eventData !== undefined && eventData.buttons > 0))) {
                        that._dragging(eventData.clientX, eventData.clientY, eventData);
                    }
                });
                this.glamcam.hover(
                    function(eventData) {
                        that.imageLoaded && that.options.showPlayButton && that.bottomPane && that.bottomPane.fadeIn('slow');
                        that._showZoomControl();
                    },function(eventData) {
                        that.bottomPane && that.bottomPane.fadeOut('slow');
                        !that.playing && that.zoomControl && that.zoomControl.fadeOut('slow');
                    }
                );
                if (this.options.linkUrl !== "") {
                    this.glamcam.click(function(eventData) {that.fb('linkUrl', that.options.linkUrl);
                        window.location = that.options.linkUrl;
                    });
                }
//                $('#glamcam').keypress(function(event) {
//                    that.fb('pressed ', event);
//                    switch(event.which) {
//                    // 'h' pressed
//                    case 104:
//                            break;
//                    // 's' pressed
//                    case 115: that.zoomControl && that.zoomControl.toggleClass(that.classes.extendedZoomControlClass);
//                            break;
//                    // 'b' pressed
//                    case 98: that.bottomPane && that.bottomPane.toggle(that.bottomPane.css('display') === 'none');
//                            break;
//                    // 'p' pressed
//                    case 112: that.playOrPause();
//                            break;
//                    // 'a' pressed
//                    case 97: that._spin(1, false);
//                            break;
//                    // 'd' pressed
//                    case 100: that._spin(2, true);
//                            break;
//                    // 'w' pressed
//                    case 119: that._zoom(true);
//                            break;
//                    // 'z' pressed
//                    case 122: that._zoom(false);
//                            break;
//                    /* Can't do this, since it will disable the input boxes on the All Widgets Testing Tool. 
//                       It may also block comments boxes on news detail pages, whenever they have GlamCam widgets on them.
//                        default: event.preventDefault();
//                    */
//                    }
//                });
            }
        },

        _setOption: function( key, value ) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _setOption'); }

            //this._super( "_setOption", key, value );
            $.Widget.prototype._setOption.apply( this, arguments );
            switch(key) {
                case "imageFolderUrl":
                    this._pause();
                    this.loader && this.loader.show();
                    this.imageLoaded = false;
                    this.startRequested = true;
                    this.spriteImage = null;
                    this.xpos = 0;
                    this.ypos = 0;
                    this.index = 0;
                    this.imageLoadCount = this.options.numFrames;
                    if (this.useSpriteMap) {
                        $.when(this._loadSpriteMap()).then(function() {
                            that.imageLoaded = true;
                            //that.readyToStart();
                            that._play(that.currentDirection || true);
                            that.loader && that.loader.hide();
                        });
                    } else {
                        for (var i=0, j=this.options.numFrames; i<j; i++) {
                            $.when(this._loadImage(i)).then(function() {
                                that.imageLoadCount--;
                                if (that.imageLoadCount === 0) {
                                    that.loader && that.loader.hide();
                                    that.imageLoaded = true;
                                    that.readyToStart();
                                    //that._play(that.currentDirection || true);
                                    //that.loader && that.loader.hide();
                                }
                            });
                        }
                    }
//                    $.when(this._loadSpriteMap()).then(function() {
//                        that.imageLoaded = true;
//                        that._play(that.currentDirection || true);
//                        that.loader && that.loader.hide();
//                        //that.readyToStart();
//                    });
                    break;
                //case "showZoomControl":
                //case "enableZoomFunction":
                case "directionForward":
                case "interval":
                    this._pause();
                    this._play();
                    break;
                case "maxZoomRatio":
                    this._pause();
                    $.when(this._center(),this._animateZoomOut()).then(function(){
                    });
                    break;
            }
        },


        _getSpriteMapUrl: function() {
            return this.options.imageFolderUrl.replace(/\/$/, "") + '\/' + this.options.spriteMapFileName;
        },
        
        _getSmallImageUrl: function(index) {
            var str = "" + index;
            var pad = "00";
            var indexString = pad.substring(0, pad.length - str.length) + str;
            return this.options.imageFolderUrl.replace(/\/$/, "") + '\/' + this.options.smallImageFilePrefix + indexString + this.options.smallImageFileExtention;
        },
        
        _getLargeImageUrl: function(index) {
            var str = "" + index;
            var pad = "00";
            var indexString = pad.substring(0, pad.length - str.length) + str;
            return this.options.imageFolderUrl.replace(/\/$/, "") + '\/' + this.options.largeImageFilePrefix + indexString + this.options.largeImageFileExtention;
        },
        
        _loadSpriteMap: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _loadSpriteMap'); }

            var dfd = $.Deferred();
            var spriteImage = $("<img />").load(
            function() {
                that.xpos = 0;
                that.ypos = 0;
                that.spriteImage = spriteImage[0];
                //that._cacheImage(that.spriteImage,"sprite");
                that.update(1); // This shouldn't start spinning until after the video ad stops playing.
                dfd.resolve();
            }).error(function() {
                //that.fb('error getting image');
            }).attr("src",this._getSpriteMapUrl());

            
            return dfd.promise();
        },

        _loadZoomImage: function(index) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _loadZoomImage'); }

            var dfd = $.Deferred();
            this.zoomIndex = index;
            
            if (this.useLargeImage) {
                this.zoomImage = new Image();

                this.zoomImage.onload = function() {
                    that._zoomUpdate();
                    dfd.resolve();
                };
                this.zoomImage.src = this._getLargeImageUrl(index);
            } else {
                this.zoomImage = this.imageStack[this.index];
                this._zoomUpdate();
                dfd.resolve();
            }
            return dfd.promise();
        },

        _loadImage: function(index) {
        	console.log('load image:',index,this._getSmallImageUrl(index));
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _loadImage'); }

            var dfd = $.Deferred();
            var image = $("<img/>").load(
                function() {
                    that.imageStack[index] = image[0];
                    console.log('resolve:',index);
                    dfd.resolve();
                }).attr("src",this._getSmallImageUrl(index));
            return dfd.promise();
        },

        readyToStart: function(startRequest) {
            this.startRequested = this.startRequested || startRequest;
            if (this.imageLoaded) {
                if (this.startRequested) {
                    //this.loader && this.loader.hide();
                    !this.playing && this.playOrPause();
                } else {
                    //this.loader && this.loader.hide();
                    this.update(3);
                }
            }
        },
        
        _startDragging: function(xPos, yPos) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _startDragging'); }

            //that.fb('_startDragging', xPos);
            if ((typeof(this.canvas) !== 'undefined') && (typeof(this.canvas.style) !== 'undefined')) {
                this.canvas.style.cursor = 'pointer';
            }
            this.panStartX = xPos;
            this.panStartY = yPos;
            this.startDragging = true;
            //that.fb('_start X:', this.panStartX);
        },

        _dragging: function(xPos, yPos, e) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _dragging'); }

            if (!this.playing && this.currentZoomRatio > 1) {
                var panIndexX = xPos - this.panStartX + this.currentPanOffsetX;
                var panIndexY = yPos - this.panStartY + this.currentPanOffsetY;

                var isWithinX = Math.abs(panIndexX) <= Math.abs(Math.round((this.currentDrawFrameWidth - this.options.canvasWidth)/2));
                var isWithinY = panIndexY <= 0 && Math.abs(panIndexY) <= Math.abs(this.currentDrawFrameHeight - this.options.canvasHeight);

                if (that.debug.all) {
                    //that.fb('dragging isWithinX',isWithinX);
                    //that.fb('dragging panIndexX', panIndexX);
                    //that.fb('dragging panStartX', this.panStartX);
                    //that.fb('dragging currentPanX', this.currentPanOffsetX);
                }

                if (this.startDragging && (isWithinX || isWithinY)) {
                    var destX = xPos;
                    var destY = yPos;
                    if (panIndexY > 0) {
                        destY = this.panStartY - this.currentPanOffsetY;
                    } else if (Math.abs(panIndexY) > Math.abs(this.currentDrawFrameHeight - this.options.canvasHeight)) {
                        destY = (-1)*Math.abs(this.currentDrawFrameHeight - this.options.canvasHeight) + this.panStartY - this.currentPanOffsetY;
                    }

                    if (that.debug.all) {
                        //that.fb('dragging xPos:', xPos);
                        //that.fb('dragging panStartY:', this.panStartY);
                        //that.fb('dragging currentPanOffsetY', this.currentPanOffsetY);
                    }

                    var drawWidthDiff = Math.abs(Math.round(this.currentDrawFrameWidth - this.options.canvasWidth)/2);
                    if (panIndexX > drawWidthDiff) {
                        destX = drawWidthDiff + this.panStartX - this.currentPanOffsetX;
                    } else if (panIndexX < (-1)*drawWidthDiff) {
                        destX = (-1)*drawWidthDiff + this.panStartX - this.currentPanOffsetX;
                    }
                    this._pan(destX, destY);
                }
            } else {
                if (this.playing && this.options.enableMouseSpin) {
                    var direction = e.originalEvent.layerX > Math.round(this.currentDrawFrameWidth/2);
                    if (this.currentDirection !== direction) {
                        this._changeDirection(direction);
                    }
                }
            }
        },

        _stopDragging: function(xPos, yPos) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _stopDragging'); }

            this.currentPanOffsetX += this.panDistanceX;
            this.currentPanOffsetY += this.panDistanceY;
            this.panDistanceX = 0;
            this.panDistanceY = 0;
            this.startDragging = false;
        },

        _resetImageCanvas: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _resetImageCanvas'); }

            this.imageWidth = this.options.canvasWidth;
            this.imageHeight = this.options.canvasHeight;
            this.currentDrawFrameWidth = this.options.canvasWidth;
            this.currentDrwaFrameHeight = this.options.canvasHeight;
        },

        _updateZoomSlider: function(value) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _updateZoomSlider'); }

            if (this.zoomSlider !== undefined) {
                this.zoomSlider.slider('option','value',value);
            }
        },

        _animate: function (spinForward) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _animate'); }

//            if (!this.options.zoomSpinEnabled) {
//                this.currentDrawFrameWidth = this.options.canvasWidth;
//                this.currentDrawFrameHeight = this.options.canvasHeight;
//                this._updateZoomSlider(1);
//                this._resetImageCanvas();
//            }
            if (this.useSpriteMap) {
                if (spinForward) {
                    this.xpos += this.options.spriteFrameWidth;
                    this.index += 1;
                    if(this.index >= this.options.numFrames) {
                        this.xpos = this.ypos = this.index = 0;
                    }
                    else if((this.xpos + this.options.spriteFrameWidth) > this.spriteImage.width) {
                        this.xpos = 0;
                        this.ypos += this.options.spriteFrameHeight;
                    }
                } else {
                    if(this.index <= 0) {
                        this.xpos = this.spriteImage.width - this.options.spriteFrameWidth;
                        this.ypos = this.spriteImage.height - this.options.spriteFrameHeight;
                        this.index = this.options.numFrames-1;
                    }
                    else {
                            this.xpos -= this.options.spriteFrameWidth;
                            this.index -= 1;
                        if(this.xpos < 0) {
                            this.xpos = this.spriteImage.width - this.options.spriteFrameWidth;
                            this.ypos -= this.options.spriteFrameHeight;
                        }
                    }
                }
            } else {
                if (spinForward) {
                    this.index += 1;
                    if(this.index >= this.options.numFrames) {
                        this.index = 0;
                    }
                } else {
                    this.index -= 1;
                    if(this.index < 0) {
                        this.index = this.options.numFrames-1;
                    }
                }
            }
            this.update(2, spinForward); // This shouldn't start spinning until after the video ad stops playing.
        },

        _panningReset: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _panningReset'); }

            //that.fb('_panningReset');
            this.panStartX = 0;
            this.panStartY = 0;
            this.panDistanceX = 0;
            this.panDistanceY = 0;
            this.currentPanOffsetX = 0;
            this.currentPanOffsetY = 0;
        },

        playOrPause: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn playOrPause'); }
            if (this.imageLoaded && this.startRequested) {
                this.loader && this.loader.hide();
                if (this.playing) {    
                    this._pause();
                    $("#"+this.element.attr("id")).trigger({type:"paused"});
                } else {
                    this._play(this.currentDirection || true);
                    $("#"+this.element.attr("id")).trigger({type:"started"});
                }
            } else {
                this.startRequested = true;
            }
        },

        _play: function(spinForward) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _play'); }

            if (!this.playing) {
                this.playing = !this.playing;
                // hide zoom control
                this.zoomControl && this.zoomControl.hide();
                // update play button
                this._updatePlayButton(this.playing);
                // start spinning
                $.when(this._animateZoomOut()).then(function(){
                    that.currentDirection = spinForward;
                    var normalizedDirection = (that.options.directionForward) ? ((spinForward) ? true : false) : ((spinForward) ? false : true);
                    that._spin(3, normalizedDirection);
                });
            } else {
                if (this.currentDirection !== spinForward) {
                    this.currentDirection = spinForward;
                    var normalizedDirection = (this.options.directionForward) ? ((spinForward) ? true : false) : ((spinForward) ? false : true);
                    this._spin(4, normalizedDirection);
                }
            }
        },

        _pause: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _pause'); }

            if (this.playing) {
                // stop spinning
                clearInterval(this.timer);
                this.timer = null;

                this.playing = !this.playing;
                // update play button
                this._updatePlayButton(false);
                // show zoom control
                this._showZoomControl();
            }
        },

        _changeDirection: function(spinForward) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _changeDirection'); }

            if (this.playing) {
                this._play(spinForward);
            }
        },

        _spin: function (intCounter, spinForward) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _spin (' + intCounter + ',' + ((spinForward) ? 'true' : 'false') + ')'); }

            // zoom out if zoomSpin option is turn off
//            if (!this.options.zoomSpinEnabled) {
//                this.currentDrawFrameWidth = this.options.canvasWidth;
//                this.currentDrawFrameHeight = this.options.canvasHeight;
//                this.currentZoomRatio = 1;
//                this._updateZoomSlider(1);
//            }
            // unload zoom image
            if (this.zoomImage !== undefined) {
                this.zoomImage = null;
            }

            if (this.timer !== undefined && this.timer !== null) {
                clearInterval(this.timer);
                this.timer = null;
            }
            this.timer = setInterval(function(){
                that._animate(spinForward);
            }, this.options.interval); 
        },

        _updatePlayButton: function(playing) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _updatePlayButton'); }

            if (this.playButton !== undefined) {
                if (playing) {
                    this.playButton.removeClass(this.classes.playButtonClass).addClass(this.classes.pauseButtonClass);
                } else {
                    this.playButton.removeClass(this.classes.pauseButtonClass).addClass(this.classes.playButtonClass);
                }
            }
        },

        _zoom: function (zoomIn) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _zoom'); }

            var noZoomImage = this.zoomImage === undefined || this.zoomImage === null || this.index !== this.zoomIndex;//) {
            $.when(noZoomImage && this._loadZoomImage(this.index)).then(function() {//1 + (ui.value)/that.options.zoomSliderMax*(that.options.maxZoomRatio-1)
                if (zoomIn && that.currentZoomRatio < that.options.maxZoomRatio) {
                    that.currentZoomRatio = Math.min(that.options.maxZoomRatio, that.currentZoomRatio + (that.options.maxZoomRatio-1)/that.options.zoomSliderMax);
                    that._zoomAction();
                } else if (!zoomIn && that.currentZoomRatio > 1) {
                    that.currentZoomRatio = Math.max(1, that.currentZoomRatio - (that.options.maxZoomRatio-1)/that.options.zoomSliderMax);
                    that._zoomAction();
                }
            });
        },

        _zoomAction: function () {  
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _zoomAction'); }

            this.currentDrawFrameWidth = Math.round(this.options.canvasWidth*this.currentZoomRatio);
            this.currentDrawFrameHeight = Math.round(this.options.canvasHeight*this.currentZoomRatio);
            this._zoomUpdate();
            var zoomVal = Math.round((this.currentZoomRatio-1)*this.options.zoomSliderMax/(that.options.maxZoomRatio-1));
            this._updateZoomSlider(zoomVal);
        },

        _pan: function(panDestX, panDestY) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _pan'); }

            this.panDistanceX = Math.round(panDestX - this.panStartX);
            this.panDistanceY = Math.round(panDestY - this.panStartY);

            if (this.options.useCanvasTag && this.useCanvas) {
                this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
                this.context.drawImage(this.zoomImage, 0, 0, this.zoomImage.width, this.zoomImage.height, Math.round((this.options.canvasWidth - this.currentDrawFrameWidth)/2) + (panDestX - this.panStartX) + this.currentPanOffsetX, (panDestY - this.panStartY) + this.currentPanOffsetY, this.currentDrawFrameWidth, this.currentDrawFrameHeight);
            }
        },

        _center: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _center'); }

            var dfd = $.Deferred();
            if (this.currentPanOffsetX !== 0 || this.currentPanOffsetY !== 0) {
                var animateSpeed = 20;
                var moveOffset = Math.max(1,Math.min(Math.abs(that.currentPanOffsetX), Math.abs(Math.round(that.currentPanOffsetY / animateSpeed))));

                this.centerTimer = setInterval(function() {
                    var offsetX = Math.min(Math.abs(that.currentPanOffsetX), moveOffset);
                    var offsetY = Math.min(Math.abs(that.currentPanOffsetY), moveOffset);
                    that.currentPanOffsetX = (that.currentPanOffsetX !== 0) ? (that.currentPanOffsetX > 0) ? that.currentPanOffsetX -= offsetX : that.currentPanOffsetX += offsetX : 0;
                    that.currentPanOffsetY = (that.currentPanOffsetY !== 0) ? (that.currentPanOffsetY > 0) ? that.currentPanOffsetY -= offsetY : that.currentPanOffsetY += offsetY : 0;    
                    that._zoomUpdate();
                    if (that.currentPanOffsetX === 0 && that.currentPanOffsetY === 0) {
                        that._panningReset();
                        clearInterval(that.centerTimer);
                        dfd.resolve();
                    }
                },5);
            } else {
                dfd.resolve();
            }
            return dfd.promise();
        },

        _animateZoomOut: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _animateZoomOut'); }

            var dfd = $.Deferred();
            if (this.currentZoomRatio > 1) {
                var animateSpeed = 20;
                var moveRatio = (that.currentZoomRatio - 1) / animateSpeed;
                this.zoomOutTimer = setInterval(function() {
                    that.currentZoomRatio -= moveRatio;
                    that.currentZoomRatio = Math.max(1, that.currentZoomRatio);
                    that._zoomAction();
                    if (that.currentZoomRatio === 1) {
                        clearInterval(that.zoomOutTimer);
                        that.previousZoomRatio = 1;
                        dfd.resolve();
                    }
                },10);
            } else {
                dfd.resolve();
            }
            return dfd.promise();
        },

        _zoomUpdate: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _zoomUpdate'); }

            if (this.options.useCanvasTag && this.useCanvas) {
                this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
                this.context.drawImage(this.zoomImage, 0, 0, this.zoomImage.width, this.zoomImage.height, Math.round((this.options.canvasWidth - this.currentDrawFrameWidth)/2) +  this.currentPanOffsetX, this.currentPanOffsetY, this.currentDrawFrameWidth, this.currentDrawFrameHeight);
            }
        },

        _getBkgCoords: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn _getBkgCoords'); }

            // Calculate new X & Y coordinates for the sprite map.
            var coordX = that.data.spriteCoords.col * that.options.spriteFrameWidth;
            var coordY = that.data.spriteCoords.row * that.options.spriteFrameHeight;
            var bkgCoords = that.data.spriteCoords.signX + coordX + 'px ' + that.data.spriteCoords.signY + coordY + 'px';

            if (that.debug.animation) {
                that.fb('spriteFrameHeight: ' + that.options.spriteFrameHeight);
                that.fb('spriteFrameWidth: ' + that.options.spriteFrameWidth);
                that.fb('row: ' + that.data.spriteCoords.row + ' col: ' + that.data.spriteCoords.col);
                that.fb('coordX: ' + coordX + ' coordY: ' + coordY);
                that.fb('bkgCoords: ' + bkgCoords);
            }

            return bkgCoords;
        },

        _cacheImage: function(image, name) {
        	console.log('cache image:',image.width,image.height);
        	var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
      
        	// Make sure canvas is as big as the picture
        	imgCanvas.width = image.width;
        	imgCanvas.height = image.height;
  
        	// Draw image into canvas element
        	imgContext.drawImage(image, 0, 0, image.width, image.height);
  
        	// Get canvas contents as a data URL
        	var imgAsDataURL = imgCanvas.toDataURL("image/png");
  
        	// Save image into localStorage
        	try {
        		localStorage.setItem(name, imgAsDataURL);
        	} catch (e) {
        		console.log("Storage failed: " + e);
        	}
        },
        
        _getCacheImage: function(name) {
        	return localStorage.getItem(name);
        },
        
        update: function(intCounter, spinForward) {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn update (' + intCounter + ',' + ((spinForward) ? 'true' : 'false') + ')'); }

            if (this.options.useCanvasTag && this.useCanvas) {
                this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

                if (this.useSpriteMap) {
                	//console.log('draw image:',this.currentDrawFrameWidth,this.options.canvasWidth);
                    this.context.drawImage(this.spriteImage, this.xpos+2, this.ypos, this.options.spriteFrameWidth-4, this.options.spriteFrameHeight, Math.round((this.options.canvasWidth - this.currentDrawFrameWidth)/2), 0, this.options.canvasWidth+10, this.options.canvasHeight);
                } else {
                    var image = this.imageStack[this.index];
                    this.context.drawImage(image, 0, 0, image.width, image.height, 0, 0, this.options.canvasWidth, this.options.canvasHeight);
                }
            } else { // if (!this.options.useCanvasTag || is_IE7 || is_IE8) {
                // Move to the next column in the same row.
                if (spinForward) {
                    that.data.spriteCoords.col++;

                    // Check for next row wrapping points.
                    if (that.data.spriteCoords.col >= 6) {
                        // When at col=6, then move to the next row in the sprite map & reset the column position to 1.
                        that.data.spriteCoords.row++;
                        that.data.spriteCoords.col = 0; // This is a zero-based number, which = 1st column.

                        // When at col=6, row=8, then move to row 1, column 1 of the sprite map.
                        if (that.data.spriteCoords.row >= 8) {
                            that.data.spriteCoords.col = 0; // This is a zero-based number, which = 1st column.
                            that.data.spriteCoords.row = 0; // This is a zero-based number, which = 1st row.
                        }
                    }

                    // Update Signs, as needed.
                    that.data.spriteCoords.signX = (that.data.spriteCoords.col === 0) ? '' : '-';
                    that.data.spriteCoords.signY = (that.data.spriteCoords.row === 0) ? '' : '-';
                } else { // reverse
                    that.data.spriteCoords.col--;

                    // Check for next row wrapping points.
                    if (that.data.spriteCoords.col < 0) { // This is a zero-based number, which = column 1.
                        // When at col=6, then move to the next row in the sprite map & reset the column position to 1.
                        that.data.spriteCoords.row--;
                        that.data.spriteCoords.col = 5; // This is a zero-based number, which = column 6.

                        // When at col=6, row=8, then move to row 1, column 1 of the sprite map.
                        if (that.data.spriteCoords.row < 0) { // This is a zero-based number, which = 1st row.
                            that.data.spriteCoords.row = 7; // This is a zero-based number, which = row 8.
                        }
                    }

                    // Update Signs, as needed.
                    that.data.spriteCoords.signX = (that.data.spriteCoords.col <= 0) ? '' : '-';
                    that.data.spriteCoords.signY = (that.data.spriteCoords.row <= 0) ? '' : '-';
                }

                var bkgCoords = this._getBkgCoords();
                if (!this.options.useCanvasTag || !this.useCanvas) {
                    // Update the Sprite Map <div> tag... not the <canvas> tag.
                    $('.' + that.classes.canvasClass).css("background-position", bkgCoords);
                }
            }
        },

        show: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn show'); }

            this.glamcam.show();
        },

        _showZoomControl: function() {
            !this.playing && this.imageLoaded && this.options.showZoomControl && this.options.enableZoomFunction && this.zoomControl && this.zoomControl.fadeIn('slow');
        },
        
        hide: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn hide'); }

            this.glamcam.hide();
        },

        destroy: function() {
            var that = this;
            if (that.debug.all || that.debug.fnTrace) { that.fb('fn destroy'); }

            this._super.destroy.apply(this);
        }
    });
})(jQuery);