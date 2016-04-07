(function(exports) {

    var data;
    var frame1, frame2;
    var video1, video2;
    var video1Copy, video2Copy;
    var video1Headline, video2Headline;
    var video1Button, video2Button;
    var video1Play, video2Play;
    var video1Played, video2Played;
    var video1Seek, video2Seek;
    var video1Pause, video2Pause;
    var video1Controls, video2Controls;
    var isHorizontal;
    var next;
    var interval;
    var current = 0;
    var loopCount = 0;
    var ad_width = 300;
    var ad_height = 600;
    var isAnimating = false;

    var LOOP_TIME = 4600;
    var ANI_TIME = 600;
    var EASE = 'cubic-bezier(.52,.24,.11,.79)';

    function Banner(_data){

        if(!_data){
            console.log('Error: no data');
            return;
        }

        data = _data;

        setContent();
        resetFrames();
        start();
    }


    function start() {
        //showFrame2();
        //setTimeout(showLastFrame, 200);
        interval = setInterval(function(){ loopNextFrame(); }, LOOP_TIME);
    }

    function loopNextFrame(){
        if(current >= 1)
            loopCount++;

        if(loopCount >= 3 && current == 0){
            stopLooping();
            return;
        }

        nextFrame();
    }

    function nextFrame(){
        current++;
        if(current > 1){
            current = 0;
        }

        if(current == 1){
            showFrame2();
        } else {
            showFrame1();
        }

    }

    function prevFrame(){
        current--;
        if(current < 0){
            current = 1;
        }

        if(current == 1){
            showFrame2(true);
        } else {
            showFrame1(true);
        }

    }

    function playVideo(index){
        var el = index == 1 ? [video1, video1Headline, video1Button, video1Controls, video1Pause, video1Copy] : [video2, video2Headline, video2Button, video2Controls, video2Pause, video2Copy];

        if (el[0].paused) {
            if(index == 1){
                deactiveVideo(2);
            }

            if(index == 2){
                deactiveVideo(1);
            }

           el[0].play();
           removeClass(el[0], 'hover');
           activeVideo(index);

        } else {
           el[0].pause();
           deactiveVideo(index);
           removeClass(el[0], 'opaque');
       }
    }

    function activeVideo(index){
        var el = index == 1 ? [video1, video1Headline, video1Button, video1Controls, video1Pause, video1Copy] : [video2, video2Headline, video2Button, video2Controls, video2Pause, video2Copy];

        removeClass(el[0], 'opaque');
        addClass(el[1], 'hidden');
        addClass(el[5], 'playing');
        addClass(el[2], 'hidden');
        removeClass(el[3], 'hidden');
        removeClass(el[4], 'hidden');
    }

    function deactiveVideo(index){
        var el = index == 1 ? [video1, video1Headline, video1Button, video1Controls, video1Pause, video1Copy] : [video2, video2Headline, video2Button, video2Controls, video2Pause, video2Copy];

        el[0].pause();
        addClass(el[0], 'opaque');
        removeClass(el[1], 'hidden');
        removeClass(el[5], 'playing');
        removeClass(el[2], 'hidden');
        addClass(el[3], 'hidden');
        addClass(el[4], 'hidden');
    }

    function stopLooping(){
        if(!interval) return;
        clearInterval( interval );
        interval = null;
    }

    function exitHandler() {
        //console.log('exit');
        var name = 'CTA';
        var url = data.URL_CTA.Url;

        stopAllVideos();

        Enabler.exitOverride(name, url);
    }

    function stopAllVideos(){
        video1.pause();
        deactiveVideo(1);
        removeClass(video1, 'opaque');
        video2.pause();
        deactiveVideo(2);
        removeClass(video2, 'opaque');
    }

    // set dynamic content
    // @data: shortcut to the dynamicContent from DoubleClick Feed
    function setContent() {
        document.getElementById('frame1').addEventListener('click', exitHandler);
        document.getElementById('bottom').addEventListener('click', exitHandler);

        isHorizontal = ad__body.classList.contains('ad970x250');
        if(isHorizontal){
            ad_width = 970;
            ad_height = 250;
        }

        ad__body = getEl('ad__body');
        ad__body.addEventListener('mouseenter', stopLooping);

        frame1 = getEl('frame1');
        frame2 = getEl('frame2');

        video1Play = getEl('video1Play');
        video2Play = getEl('video2Play');
        video1Copy = getEl('video1Copy');
        video1Headline = getEl('VideoA_headline');
        video1Button = getEl('video1Button');
        video1Controls = getEl('video1Controls');
        video1Pause = getEl('video1Pause');
        video2Copy = getEl('video2Copy');
        video2Headline = getEl('VideoB_headline');
        video2Button = getEl('video2Button');
        video2Controls = getEl('video2Controls');
        video2Pause = getEl('video2Pause');
        video1Played = getEl('video1Played');
        video2Played = getEl('video2Played');
        video1Seek = getEl('video1Seek');
        video2Seek = getEl('video2Seek');

        video1Button.addEventListener('click', function(){playVideo(1)});
        video2Button.addEventListener('click', function(){playVideo(2)});

        video1Pause.addEventListener('click', function(){ playVideo(1); });
        video2Pause.addEventListener('click', function(){ playVideo(2); });

        next = getEl('navNext');

        next.addEventListener('click', gotoNext);

        document.getElementById('AdditionalCopy').innerHTML     = data.AdditionalCopy || '';
        document.getElementById('Copy_CTA').innerHTML           = data.Copy_CTA || '';
        document.getElementById('Headline').innerHTML           = data.Headline || '';
        document.getElementById('Category').innerHTML           = data.Video_Topic || '';
        document.getElementById('Category2').innerHTML           = data.Video_Topic || '';
        document.getElementById('VideoA_headline').innerHTML           = data.VideoA_headline || '';
        document.getElementById('VideoB_headline').innerHTML           = data.VideoB_headline || '';
        document.getElementById('Video_headline').innerHTML           = data.Video_headline || '';

        document.getElementById('ImageA').src = data.ImageA.Url || '';
        document.getElementById('ImageB').src = data.ImageB.Url || '';

        var v1h = getEl('video1Holder');
        v1h.addEventListener('click', function(){playVideo(1)});

        video1 = document.createElement("video");
        video1.setAttribute('width', '300');
        video1.setAttribute('height', '169');
        video1.setAttribute('class', 'hover');
        video1.setAttribute('poster', data.VideoAThumb.Url);
        var sourceMP4 = document.createElement("source");
        sourceMP4.type = "video/mp4";
        sourceMP4.src = data.VideoA.Progressive_Url;
        video1.appendChild(sourceMP4);

        v1h.appendChild(video1);

        Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
            studio.video.Reporter.attach('video_1', video1);
        });

        video1.addEventListener("timeupdate", function() {
            var value = (100 / video1.duration) * video1.currentTime;
            video1Played.style.width = value + '%';
        });

        video1Seek.addEventListener('click', function(e){
            var x = getOffset(e).x;
            var p = (x / 245) * 100;
            var time = video1.duration * (p / 100);
            video1.currentTime = time;
        });

        var v2h = getEl('video2Holder');
        v2h.addEventListener('click', function(){playVideo(2)});

        video2 = document.createElement("video");
        video2.setAttribute('width', '300');
        video2.setAttribute('height', '169');
        video2.setAttribute('class', 'hover');
        video2.setAttribute('poster', data.VideoBThumb.Url);
        var source2MP4 = document.createElement("source");
        source2MP4.type = "video/mp4";
        source2MP4.src = data.VideoB.Progressive_Url;
        video2.appendChild(source2MP4);

        v2h.appendChild(video2);

        Enabler.loadModule(studio.module.ModuleId.VIDEO, function() {
            studio.video.Reporter.attach('video_2', video2);
        });

        video2.addEventListener("timeupdate", function() {
            var value = (100 / video2.duration) * video2.currentTime;
            video2Played.style.width = value + '%';
        });

        video2Seek.addEventListener('click', function(e){
            var x = getOffset(e).x;
            var p = (x / 245) * 100;
            var time = video2.duration * (p / 100);
            video2.currentTime = time;
        });

    }



    function showFrame2(back){
        isAnimating = true;
        current = 1;
        setTimeout(function(){ isAnimating = false; }, ANI_TIME+0.1);

        var svg = getEl('svgcolor');
        addClass(svg, 'black');
        addClass(next, 'black');

        if(ad_width == 970){
            removeClass(frame1, 'ontop');
            move('#frame2')
                .set('opacity', 1)
                .duration(ANI_TIME)
                .ease('in-out')
                .end();

            move('#frame1')
                .set('opacity', 0)
                .duration(ANI_TIME)
                .ease('in-out')
                .end();

            return;
        }

        var x1 = -ad_width;
        if(back){
            moveLeft('#frame2');
            x1 = ad_width;
        } else {
            moveRight('#frame2');
        }

        move('#frame2')
            .x(0)
            .duration(ANI_TIME)
            .ease('in-out')
            .end();

        move('#frame1')
            .x(x1)
            .duration(ANI_TIME)
            .ease('in-out')
            .end();
    }

    function showFrame1(back){
        current = 0;
        isAnimating = true;
        setTimeout(function(){ isAnimating = false; }, ANI_TIME+0.1);
        stopAllVideos();

        var svg = getEl('svgcolor');
        removeClass(svg, 'black');
        removeClass(next, 'black');

        if(ad_width == 970){
            addClass(frame1, 'ontop');
            move('#frame2')
                .set('opacity', 0)
                .duration(ANI_TIME)
                .ease('in-out')
                .end();

            move('#frame1')
                .set('opacity', 1)
                .duration(ANI_TIME)
                .ease('in-out')
                .end();

            return;
        }

        var x2 = -ad_width;
        if(!back) {
            moveRight('#frame1');
        } else {
            moveLeft('#frame1');
            x2 = ad_width;
        }

        move('#frame1')
            .x(0)
            .duration(ANI_TIME)
            .ease('in-out')
            .end();

        move('#frame2')
            .x(x2)
            .duration(ANI_TIME)
            .ease('in-out')
            .end();
    }

    function moveRight(frame){
        move(frame)
            .x(ad_width)
            .duration(0)
            .end();
    }

    function moveLeft(frame){
        move(frame)
            .x(-ad_width)
            .duration(0)
            .end();
    }


    function resetFrames(){
        current = 0;

        if(ad_width == 970){
            move('#frame2')
                .x(0)
                .set('opacity', 0)
                .duration(0)
                .end();

            move('#frame1')
                .x(0)
                .set('opacity', 1)
                .duration(0)
                .end();

            return;
        }

        move('#frame1')
            .x(0)
            .duration(0)
            .end();

        move('#frame2')
            .x(ad_width)
            .duration(0)
            .end();
    }

    function gotoPrev(){
        if(isAnimating) return;
        prevFrame();
    }

    function gotoNext(){
        if(isAnimating) return;
        nextFrame();
    }





    // DOM
    function getOffset(evt) {
      var el = evt.target,
          x = 0,
          y = 0;

      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }

      x = evt.clientX - x;
      y = evt.clientY - y;

      return { x: x, y: y };
    }


    function getEl(id) {
        return document.getElementById(id);
    }

    function hasClass(el, className) {
        if(!el || !el.classList) return;
      if (el.classList)
        return el.classList.contains(className)
      else
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
    }

    function addClass(el, className) {
        if(!el || !el.classList) return;
        if (el.classList)
            el.classList.add(className)
        else if (!hasClass(el, className))
            el.className += " " + className
    }

    function removeClass(el, className) {
        if(!el || !el.classList) return;
        if (el.classList)
            el.classList.remove(className)
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    }

    window.Banner = Banner;

})(this);
