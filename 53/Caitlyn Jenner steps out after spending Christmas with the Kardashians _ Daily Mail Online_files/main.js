/* Elements */
var banner_container = null;
var state_initial = null;
var state_resolve = null;
var button_clicktag_1 = null;

var initialTunein_container = null;
var initial_background_container = null;
var initial_TT_container = null;
var initial_cta_pre_container = null;
var initial_cta_post_container = null;
var initial_cta_pulse_pre_container = null;
var initial_cta_pulse_post_container = null;
var resolve_cta_pulse_pre_container = null;
var resolve_cta_pulse_post_container = null;

/* Data */
var isIE = false;
var isMobileDevice = false;
var isTabletDevice = false;
var isPreMessaging = false;

var activeVideoComponent = null;
var videoComponent1 = null;
var activeVideoVO = null;
var videoVO1 = {
    id: "video-1-component",
    elementId: "video-1",
    element: null,
    videoDuration: 11000,
    sourceMP4: "Outlander_S2_300x600_Prog_Video.mp4",
    sourceWEBM: "Outlander_S2_300x600_Prog_Video.webm",
    imageSequenceImgId: "image-sequence-1-image-container",
    imageSequenceImg: null,
    imageSequenceSource: "Outlander_S2_300x600_Prog_Video.txt",
    imageSequenceFrame: 0,
    imageSequenceTotalFrames: 160,
    imageSequenceImages: []
};

var currentDate = new Date();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

/**
 * All scripts and markup is ready
 */
window.onload = function () {
    /**
     * Assign elements that are commonly used
     */
    banner_container = document.getElementById("banner-container");
    /*scene = document.getElementById('scene');*/
    state_initial = document.getElementById("state-initial");
    state_resolve = document.getElementById("state-resolve");
    button_clicktag_1 = document.getElementById("button-clicktag-1");

    initial_background_container = document.getElementById("initial-background-container");
    initialTunein_container = document.getElementById("initial-tunein-container");
    initial_TT_container = document.getElementById("initial-tt-container");
    initial_cta_pre_container = document.getElementById("initial-cta-container-pre")
    initial_cta_post_container = document.getElementById("initial-cta-container-post")
    initial_cta_pulse_pre_container = document.getElementById("initial-cta-shimmer-pre-container")
    initial_cta_pulse_post_container = document.getElementById("initial-cta-shimmer-post-container")
    resolve_cta_pulse_pre_container = document.getElementById("resolve-cta-shimmer-pre-container")
    resolve_cta_pulse_post_container = document.getElementById("resolve-cta-shimmer-post-container")
    videoVO1.imageSequenceImg = document.getElementById(videoVO1.imageSequenceImgId);
    videoVO1.element = document.getElementById(videoVO1.elementId);
    console.log("date == " + currentMonth + " " + currentDay)
    if ((currentMonth == 2) || (currentMonth == 3 && currentDay <= 4)) {
        initialTunein_container.style.backgroundPosition = "0px -105px";
        initial_cta_pre_container.style.display = "block";
        initial_cta_post_container.style.display = "none";
        initial_cta_pulse_pre_container.style.display = "block";
        initial_cta_pulse_post_container.style.display = "none";
        isPreMessaging = true;
    } else if (currentMonth == 3 && (currentDay >= 5 && currentDay <= 7)) {
        initialTunein_container.style.backgroundPosition = "0px -70px";
        initial_cta_pre_container.style.display = "none";
        initial_cta_post_container.style.display = "block";
        initial_cta_pulse_pre_container.style.display = "none";
        initial_cta_pulse_post_container.style.display = "block";
    } else if (currentMonth == 3 && currentDay == 8) {
        initialTunein_container.style.backgroundPosition = "0px -35px";
        initial_cta_pre_container.style.display = "none";
        initial_cta_post_container.style.display = "block";
        initial_cta_pulse_pre_container.style.display = "none";
        initial_cta_pulse_post_container.style.display = "block";
    } else if (currentMonth == 3 && (currentDay == 9 || currentDay == 16 || currentDay == 23 || currentDay == 30)) {
        console.log("oopsie!");
        initialTunein_container.style.backgroundPosition = "0px -0px";
        initial_cta_pre_container.style.display = "none";
        initial_cta_post_container.style.display = "block";
        initial_cta_pulse_pre_container.style.display = "none";
        initial_cta_pulse_post_container.style.display = "block";
    } else {
        initialTunein_container.style.backgroundPosition = "0px -70px";
        initial_cta_pre_container.style.display = "none";
        initial_cta_post_container.style.display = "block";
        initial_cta_pulse_pre_container.style.display = "none";
        initial_cta_pulse_post_container.style.display = "block";
    }

    /**
     * Detect device
     */
    var detectedDevice = deviceDetector.device;
    // TODO TESTING MOBILE
    // detectedDevice = "some phone"; // Or append ?arsonalDevice=mobile // Quick test mobile devices
    // detectedDevice = "tablet"; // Or append ?arsonalDevice=tablet // Quick test tablet devices
    console.log("arsonalDevice: " + getParameterByName("arsonalDevice"));
    if (getParameterByName("arsonalDevice") !== "") {
        detectedDevice = getParameterByName("arsonalDevice");
    }
    console.log("detectedDevice: " + detectedDevice);
    switch (detectedDevice) {
        case "desktop":
            break;
        case "tablet":
            isTabletDevice = true;
            isMobileDevice = true;
            break;
        default:
            isMobileDevice = true;
            break;
    }
    if (Enabler.isPageLoaded()) {
        pageLoadedHandler();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
    }
};

/**
 * Once all elements have loaded on the webpage initialize the banner
 */
function pageLoadedHandler() {
    activeVideoVO = videoVO1;
    banner_container.style.display = "block";
    /**
     * Attach listeners
     */
    if (isMobileDevice) {
        document.getElementById("video-1").innerHTML = "";

        $.ajax({
            url: activeVideoVO.imageSequenceSource,
            async: false,
            success: function (text) {
                activeVideoVO.imageSequenceImages = text.split('|');
                APP.play();
            }
        });
    } else {
        document.getElementById("image-sequence-1").innerHTML = "";
        document.getElementById("image-sequence-1").style.display = "none";

        Enabler.loadModule(studio.module.ModuleId.RAD_VIDEO, function () {
            videoComponent1 = new ArsonalDCVideo(
                activeVideoVO.id,
                activeVideoVO.elementId,
                activeVideoVO.sourceMP4,
                activeVideoVO.sourceWEBM,
                activeVideoVO.videoDuration, true, true);
            videoComponent1.addObserver(this);
            if (isIE) {
                videoComponent1.millisecondsBeforeBufferIsValidated = 1000;
                videoComponent1.millisecondsBeforeVideoLoadedIsValidated = 2000;
            }
            videoComponent1.initialize();
            videoComponent1.addCuepoint("cue1", 10.2);
            activeVideoComponent = videoComponent1;
        });
    }
    Enabler.counter("video-1-component-play");

    /**
     * Attach listeners
     */
    setTimeout(function () {
        button_clicktag_1.addEventListener("click", stateInitialClicktagHandler, false);
        banner_container.addEventListener("mouseenter", mouseEnterHandler, false);
        banner_container.addEventListener("mouseleave", mouseExitHandler, false);

        var hasHiddenProperty = getHiddenProp();
        if (hasHiddenProperty) {
            var evtname = hasHiddenProperty.replace(/[H|h]idden/, '') + 'visibilitychange';
            document.addEventListener(evtname, windowFocusHandler);
        }
    }, 1000);
}


/**
 * Mouse enters the ad
 * @param e
 */
function mouseEnterHandler(e) {
    if (isPreMessaging) {
        initial_cta_pulse_pre_container.classList.add('animatePulse');
        resolve_cta_pulse_pre_container.classList.add('animatePulse');
    } else {
        initial_cta_pulse_post_container.classList.add('animatePulse');
        resolve_cta_pulse_post_container.classList.add('animatePulse');
    }
}

/**
 * Mouse exits the ad
 * @param e
 */
function mouseExitHandler(e) {
    if (isPreMessaging) {
        initial_cta_pulse_pre_container.classList.remove('animatePulse');
        resolve_cta_pulse_pre_container.classList.remove('animatePulse');
    } else {
        initial_cta_pulse_post_container.classList.remove('animatePulse');
        resolve_cta_pulse_post_container.classList.remove('animatePulse');
    }
}

/**
 * Go to state resolve
 */
function callStateResolve() {
    destroyStateInitial();
}

/**
 * Video has started
 */
function videoPlayed(e) {
    initial_background_container.style.visibility = "visible"
    initial_TT_container.style.visibility = "visible";
    initialTunein_container.style.visibility = "visible";
    if (isPreMessaging) {
        initial_cta_pre_container.style.visibility = "visible";
        initial_cta_pulse_pre_container.style.visibility = "visible";
    } else {
        initial_cta_post_container.style.visibility = "visible";
        initial_cta_pulse_post_container.style.visibility = "visible";
    }
    document.getElementById("video-1-loader").style.display = "none";
}

/**
 * Video has completed
 */
function videoComplete(e) {
    Enabler.counter("video-1-component-complete");
    APP.destroy();
    if (activeVideoComponent) {
        activeVideoComponent.removeVideoEvents();
        if (activeVideoComponent.isVideoPlaying) {
            activeVideoComponent.pause();
        }
        activeVideoComponent = null;
    }
}

/**
 * Image sequence has completed
 */
function imageSequenceComplete(e) {
    Enabler.counter("video-1-component-complete");
}

/**
 * Clicked clicktag on state initial
 * @param e
 */
function stateInitialClicktagHandler(e) {
    callStateResolve();
    if (isPreMessaging) {
        Enabler.exit("clickTag1");
    } else {
        Enabler.exit("clickTag2");
    }
}

/**
 * Clicked clicktag on state resolve
 * @param e
 */
function stateResolveClicktagHandler(e) {
    callStateResolve();
     if (isPreMessaging) {
        Enabler.exit("clickTag1");
    } else {
        Enabler.exit("clickTag2");
    }
}

/**
 * User cancelled video
 */
function videoEndFullscreen() {
    callStateResolve();
}

/**
 * Cleanup state initial video/sound and other
 */
function destroyStateInitial() {
    if (activeVideoComponent) {
        activeVideoComponent.removeVideoEvents();
        activeVideoComponent.pause();
    }
    if (isPreMessaging) {
        initial_cta_pulse_pre_container.style.visibility = "hidden";
        setTimeout(function () {
            resolve_cta_pulse_pre_container.style.visibility = "visible";
        }, 400);
        initial_cta_pre_container.classList.add('animateSlide');
    } else {
        initial_cta_pulse_post_container.style.visibility = "hidden";
        setTimeout(function () {
            resolve_cta_pulse_post_container.style.visibility = "visible";
        }, 400);
        initial_cta_post_container.classList.add('animateSlide');
    }
    initialTunein_container.classList.add('animateSlide');
    initial_TT_container.classList.add('animateSlide');
    initial_background_container.style.visibility = "hidden"
    state_resolve.style.display = "block";
    $("#state-resolve").animate({
        opacity: 1
    }, 500, 'ease-out')
    setTimeout(function () {
        state_initial.style.display = "none";
    }, 500);
}

/**
 * Cleanup state resolve video/sound and other
 */
function destroyStateResolve() {}

/**
 * ArsonalDCVideo observer callback handler
 * @param notification
 */
function receiveNotification(notification) {
    var data = notification.data;
    var type = notification.type;
    switch (type) {
        case "playing":
            videoPlayed();
            break;
        case "ended":
            videoComplete();
            break;
        case "fullscreenchange":
            videoEndFullscreen();
            break;
        case "cue1":
            destroyStateInitial();
            break;
    }
}

/**
 * Tab/window focus has changed change
 */
function windowFocusHandler() {
    console.log("windowFocusHandler: " + isWindowNotFocused());
    if (isWindowNotFocused()) {
        /* This tab/window blur */
        callStateResolve();
    } else {
        /* This tab/window focused */
    }
}

/**
 * get url variable value
 * @param name
 * @returns {string}
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * Is tab/window focused
 * @returns {*}
 */
function isWindowNotFocused() {
    var prop = getHiddenProp();
    if (!prop) return false;
    return document[prop];
}

/**
 * get 'hidden' property
 * @returns {*}
 */
function getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'Hidden') in document)
            return prefixes[i] + 'Hidden';
    }
    // otherwise it's not supported
    return null;
}

/**
 * Loop
 */
window.APP = window.APP || {};
APP.isPaused = true;
APP.accumulator = 0;
APP.seconds = 0;
APP.counter = 0;
APP.dt = (1000 / 30);

APP.testCrowseBrowserLoopPrefered = function () {
    try {
        window.requestAnimationFrame(function () {});
    } catch (e) {
        return "setInterval";
    }
    return "window.requestAnimationFrame";
};

APP.pause = function () {
    APP.isPaused = true;
    if (APP.testCrowseBrowserLoopPrefered() === "window.requestAnimationFrame") {
        window.cancelAnimationFrame(APP.core.animationFrame);
    } else {
        clearInterval(APP.core.animationFrame);
    }
};

APP.play = function () {
    APP.isPaused = false;
    APP.core.then = Date.now();
    // console.log("using preferred loop: " + APP.testCrowseBrowserLoopPrefered());
    if (APP.testCrowseBrowserLoopPrefered() === "window.requestAnimationFrame") {
        APP.core.frame();
    } else {
        APP.core.animationFrame = setInterval(APP.core.frameInterval, 1000 / 30);
    }
};

APP.destroy = function () {
    APP.pause();
    if (APP.testCrowseBrowserLoopPrefered() === "window.requestAnimationFrame") {
        APP.core.frame = function () {};
    } else {
        clearInterval(APP.core.animationFrame);
    }
};

APP.core = {
    frame: function () {
        if (APP.isPaused) return;
        APP.core.setDelta();
        APP.core.update();
        // APP.core.render();
        APP.seconds = Math.floor(APP.accumulator);
        APP.core.animationFrame = window.requestAnimationFrame(APP.core.frame);
    },
    frameInterval: function () {
        if (APP.isPaused) return;
        APP.core.setDelta();
        APP.core.update();
        APP.core.render();
        APP.seconds = Math.floor(APP.accumulator);
    },
    setDelta: function () {
        APP.core.now = Date.now();
        APP.core.delta = (APP.core.now - APP.core.then) / 1000; // seconds since last frame
        APP.core.then = APP.core.now;
        APP.accumulator += APP.core.delta;
    },
    update: function () {},
    render: function () {}
};

APP.core.update = function () {
    if (APP.counter % 4 === 0) {
        activeVideoVO.imageSequenceImg.setAttribute("src", activeVideoVO.imageSequenceImages[activeVideoVO.imageSequenceFrame]);
        if (activeVideoVO.imageSequenceFrame === activeVideoVO.imageSequenceTotalFrames) {
            imageSequenceComplete(null);
        } else if (activeVideoVO.imageSequenceFrame === 155) {
            destroyStateInitial();
        }
        activeVideoVO.imageSequenceFrame++;
    }
    APP.counter = ++APP.counter % 30;
};

APP.core.render = function () {};