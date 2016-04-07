
function SetTrackingCustomVar(type, value) {
    if (trackingOn) {
        switch (type) {
            case "zip":
                {
                    s.prop36 = value;
                    break;
                }
            case "city":
                {
                    s.prop37 = value;
                    break;
                }

            case "state":
                {
                    s.prop38 = value;
                    break;
                }
        }
    }
}

function TrackClickedLink(value) {
    //alert('link clicked');
    if (trackingOn) _hbLink(value);
}

function SetTrackingPageName(value) {
    if (trackingOn) s.pageName = value;
}

function SendTrackingInfo() {
    //alert('sending info');
    if (trackingOn) s.tl();
}