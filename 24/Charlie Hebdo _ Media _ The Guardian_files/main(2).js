if (document.all && !window.setTimeout.isPolyfill) {
	var __nativeST__ = window.setTimeout;
	window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
		var aArgs = Array.prototype.slice.call(arguments, 2);
		return __nativeST__(vCallback instanceof Function ? function () {
			vCallback.apply(null, aArgs);
		} : vCallback, nDelay);
	};
	window.setTimeout.isPolyfill = true;
}
function hasClass(ele,cls) {
	return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += (ele.className==""?"":" ")+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
(function() {
	return ({
		ui_ola : document.getElementById("ola"),
		ui_cta :  document.getElementById("cta"),
		ui_bg_1 :  document.getElementById("bg-1"),
		ui_bg_1_img :  document.getElementById("bg-1-img"),
		ui_mosaic :  document.getElementById("mosaic"),
		ui_mosaic_level_0 : document.getElementById("mosaic-level-0"),
		ui_mosaic_level_1 : document.getElementById("mosaic-level-1"),
		ui_mosaic_level_2 : document.getElementById("mosaic-level-2"),
		ui_mosaic_level_3 : document.getElementById("mosaic-level-3"),
		ui_mosaic_level_4 : document.getElementById("mosaic-level-4"),
		ui_mosaic_level_5 : document.getElementById("mosaic-level-5"),
		ui_bg_background : document.getElementById("bg-background"),
		ui_copy_background : document.getElementById("copy-background"),
		ui_copy_1 : document.getElementById("copy-1"),
		ui_copy_2 : document.getElementById("copy-2"),
		ui_copy_3 : document.getElementById("copy-3"),
		ui_video_container : document.getElementById("ft-video-container"),
		ui_video_poster : document.getElementById("ft-video-poster"),
		ui_video : document.getElementById("ft-video"),
		ui_video_player : undefined,
		ui_close : document.getElementById("close"),
		timeout_play_video : undefined,
		myFT : undefined,
		timeouts : [],
		init:function(myFT, container) {
			// init buttons
            var that = this;
            //
            myFT.applyClickTag(container, 1);
            //
            this.myFT = myFT;
            this.init_content();
		},
		init_content : function() {
			this.animate();
		},
		animate:function(){
			this.animate_frame_1_in();
		},
		animate_frame_1_in : function() {
			// show initial elements
			removeClass(this.ui_bg_1, "hide");
			removeClass(this.ui_bg_background, "hide");
			removeClass(this.ui_copy_background, "hide");
			// animate background
			addClass(this.ui_bg_1, "animation-fade-in");
			addClass(this.ui_bg_1, "animation-fade-long-in-in");
			// animate mosaic
			// animation_const based on mosaic bg width
			var animation_const = 970;
			// tile,bg animation speed and distance constants should work for any size
			var tile_dist_mod_1 = 25.4;
			var tile_dist_mod_2 = 48.84;
			var bg_dist_mod = 15.85;
			// tiles on different levels array
			var tiles = [this.ui_mosaic_level_0, this.ui_mosaic_level_1, this.ui_mosaic_level_2, this.ui_mosaic_level_3, this.ui_mosaic_level_4, this.ui_mosaic_level_5];
			// animation variables
			var tile_set_clip, tile_clips, tile_clip, delay=0, sub_delay = 0, dur, dist, count=0, sub_count=0;
			// loop all levels
			for (var i = 0; i< tiles.length; i++)
			{
				count++;
				tile_set_clip = tiles[i];
				delay += .3;
				sub_count=0;
				tile_clips = [];
				var cells = tile_set_clip.getElementsByClassName('mosaic-cell');
				// gather tiles in one array
				var tile_set_index = cells.length;
				while(tile_set_index--)
				{
					tile_clip = cells[tile_set_index];
					tile_clips.push(tile_clip);
				}
				// sort tiles to give more random feel
				var sort_count =0;
				tile_clips.sort( function( a, b) {
					if(sort_count++%1.5)
						return 1;
					else
						return -1;
				});
				// loop thru tiles  level and animate
				for (var j = 0; j < tile_clips.length; j++)
				{
					sub_count++;
					tile_clip = tile_clips[j];
					// calculate delay and dist
					sub_delay = delay + .05;
					dur = 1 + (count * .1);
					dist = (Math.round(animation_const/tile_dist_mod_1) + ((count * Math.round(animation_const / tile_dist_mod_2 )) * sub_count) * .5);
					//
					// apply animation preset class so tiles can get off view
					addClass(tile_clip, "mosaic-cell-animate-in");
					//
					// adjust animation distance based on calculations
					var transform = ("translateX(-"+dist+"px)");
					tile_clip.style.webkitTransform = transform;
					tile_clip.style.msTransform = transform;
					tile_clip.style.MozTransform = transform;
					tile_clip.style.oTransform = transform;
					tile_clip.style.transform = transform;
					//
					// delay animation
					setTimeout( function (element, dest_x, dest_dur) {
						// remove off view class
						removeClass(element, "mosaic-cell-animate-in");
						// apply animation class
						addClass(element, "mosaic-cell-animate-in-play");
					}, 1, tile_clip, dist,1.7);
				}
			}
			// animate background
			var transform = ("translateX("+Math.round(animation_const/bg_dist_mod)+"px)");
			this.ui_bg_1_img.style.webkitTransform = transform;
			this.ui_bg_1_img.style.msTransform = transform;
			this.ui_bg_1_img.style.MozTransform = transform;
			this.ui_bg_1_img.style.oTransform = transform;
			this.ui_bg_1_img.style.transform = transform;
			addClass(this.ui_bg_1_img, "mosaic-cell-animate-in-play");
			var duration = (dur+.5)+"s";
			this.ui_bg_1_img.style.webkitAnimationDuration=duration;
			this.ui_bg_1_img.style.msAnimationDuration=duration;
			this.ui_bg_1_img.style.MozAnimationDuration=duration;
			this.ui_bg_1_img.style.oAnimationDuration=duration;
			this.ui_bg_1_img.style.animationDuration=duration;
			// animate video container
			addClass(this.ui_video_container, "animate-zoom-in-preset");

			// setup video player if not set yet
			if(this.ui_video_player == undefined)
			{
				this.ui_video_player = this.myFT.insertVideo({
					parent:this.ui_video,
					video:"video1",
					autoplay: true,
					poster: 'images/970x250-video-poster.jpg',
					controls:false,
					clickTag:1
				});
			}
			var that = this;
			this.timeout_play_video = setTimeout( function (){
				// video zoom in animation
                addClass(that.ui_video_container, "animate-zoom-in");
                //that.ui_video_player.play();//@FT-JM
			}, 300);
			// play video and save timeout id
			this.timeout_play_video = setTimeout( function (){
				// animate copy
                removeClass(that.ui_copy_1, "hide");
                addClass(that.ui_copy_1, "play-in");
			}, 2410);
			//
            this.timeouts.push(setTimeout( function (){
				// animate cta
                removeClass(that.ui_cta, "hide");
                addClass(that.ui_cta, "play-in");
			}, 3500));
			this.timeouts.push(setTimeout( function (){
				addClass(that.ui_copy_1, "play-out");
			}, 7000));
			this.timeouts.push(setTimeout( function (){
				removeClass(that.ui_copy_2, "hide");
				addClass(that.ui_copy_2, "play-in");
			}, 8000));
			this.timeouts.push(setTimeout( function (){
				addClass(that.ui_copy_2, "play-out");
			}, 13000));
            this.timeouts.push(setTimeout( function (){
				removeClass(that.ui_copy_3, "hide");
			    addClass(that.ui_copy_3, "play-in");
			}, 14000));
			//
		}
	});
})().init((typeof myFT !== 'undefined')?myFT:new FT(),FT.query("#ola"));
