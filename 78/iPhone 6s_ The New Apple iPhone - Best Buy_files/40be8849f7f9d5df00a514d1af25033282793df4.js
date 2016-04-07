// Lids STIPS
;
(function() {
    var handle = document.getElementsByTagName("HTML")[0];
    var setCorrectTarget = function(target) {
        if (target.nodeName === "BODY") {
            return "";
        }
        if (target.dataset && !!target.dataset.track) {
            return target.dataset.track;
        } else if (target.getAttribute && target.getAttribute("data-track")) {
            return target.getAttribute("data-track");
        } else if (target.parentNode) {
            return setCorrectTarget(target.parentNode);
        } else {
            return false;
        }
    }
    if (handle.addEventListener) {
        handle.addEventListener("click", function(event) {
            var trackValue = setCorrectTarget(event.target);
            if (trackValue) {
                if (event.target.dataset) {
                    event.target.dataset.track = trackValue;
                } else if (event.target.setAttribute) {
                    event.target.setAttribute("data-track", trackValue);
                }
            }
        }, true);
    } else if (handle.attachEvent) {
        handle.attachEvent('onclick', function(event) {
            var trackValue = setCorrectTarget(event.srcElement);
            if (trackValue) {
                event.srcElement.setAttribute(trackValue);
            }
        });
    }
}());