// Object.keys (IE8)
Object.keys=Object.keys||function(e){var t=[];for(var n in e){if(e.hasOwnProperty(n))t.push(n)}return t}

function myemma_classic_form(){
    // run only if no roadblock
    if (typeof(ph_lightbox)!='undefined' && ph_lightbox=='no') return;
    if (typeof(ph_ad_page)!='undefined' && ph_ad_page=='no'){
        // if appeared then return
        if (document.cookie.split('; ').indexOf('ph_classic_nlf=1')!=-1)
            return;
        // else appear
        var _loc = window.location.origin,
            _s = (perez_isMobileDevice() ?
                [298,150,13,35,28,24,15,272,11,16,278]:
                [448,225,20,35,28,24,22.5,422,16,24,428]),
            _html = '<style>'
            +'.ph_classic_nlf {display:none;background:#fff;width:'+_s[0]+'px;padding:0;position:fixed;top:50%;left:50%;margin:-100px 0 0 -'+_s[1]+'px;z-index:10000;border-radius:5px;box-shadow:0 0 10px 10px #ddd;border:1px solid #FF11C5;font-size:'+_s[2]+'px;font-weight:bold;font-family:Arial,Helvetica,sans-serif;}'
            +'.ph_classic_nlf .close {position:absolute;top:-'+_s[3]+'px;right:0;display:block;width:'+_s[4]+'px;height:'+_s[4]+'px;line-height:'+_s[4]+'px;font-size:'+_s[5]+'px;text-align:center;background:#fff;color:#c06;border-radius:'+_s[6]+'px;box-shadow:0 0 5px 5px #ddd;border:1px solid #FF11C5;z-index:9999;}'
            +'.ph_classic_nlf .close:hover {background:#c06;color:#fff;text-decoration:none;cursor:pointer;}'
            +'.ph_classic_nlf.loading .close {display:none;}'
            +'.ph_classic_nlf .loading {display:none;position:absolute;top:0;left:0;width:100%;height:100%;padding:0;margin:0;border-radius:5px;background:rgba(255,255,255,.9);}'
            +'.ph_classic_nlf .loading img {width:32px;height:32px;position:absolute;top:50%;left:50%;margin:-16px 0 0 -16px;}'
            +'.ph_classic_nlf > img {width:100%;margin:5px 0;}'
            +'.ph_classic_nlf.loading .loading {display:block;}'
            +'.ph_classic_nlf div {padding:0 10px;margin:5px 0 10px 0;}'
            +'.ph_classic_nlf form {padding:0 10px 10px 10px;}'
            +'.ph_classic_nlf form label {display:block;font-weight:normal;}'
            +'.ph_classic_nlf form input[name=date] {display:none;}'
            +'.ph_classic_nlf form input#myemma_email {width:'+_s[7]+'px;border:1px solid #ccc;font-size:'+_s[9]+'px;padding:2px 3px;}'
            +'.ph_classic_nlf form input#myemma_email.error {border-color:#c00;}'
            +'.ph_classic_nlf form b.error {display:block;margin:0 0 5px 0;font-size:'+_s[8]+'px;color:#c00;font-weight:normal;}'
            +'.ph_classic_nlf .ok {display:block;width:100%;margin:5px 0;text-align:center;border:1px solid #ff0ec3;background:#ff0ec3;border-radius:3px;padding:5px 0;color:#fff;text-transform:uppercase;cursor:pointer;}'
            +'.ph_classic_nlf .ok:hover {text-decoration:none;}'
            +'#ph_classic_nlf_bg {display:none;background:#fff;width:100%;height:100%;position:fixed;top:0;left:0;opacity:.8;z-index:9999;}'
            +'#ph_classic_nlf_success p {margin:0 10px;font-size:'+_s[9]+'px;color:#FF11C5;text-align:center;font-weight:normal;}'
            +'#ph_classic_nlf_success .ok {margin:10px;width:'+_s[10]+'px;}'
            +'</style>'
            +'<div id="ph_classic_nlf" class="ph_classic_nlf">'
                +'<div class="loading"><img src="http://i.perezhilton.com/images/loading32.gif" /></div>'
                +'<a class="close">&times;</a>'
                +'<img src="http://i.perezhilton.com/wp-content/themes/default/images/newsletter/newsletter-signup-header.png" alt="PerezHilton Newsletter Signup" />'
                +'<div>Get the juiciest celebrity gossip in your inbox!</div>'
                +'<form id="ph_classic_nlf_form" action="/services/myemma/" method="get">'
                +'<input type="hidden" name="action" value="subscribe2" />'
                +'<input type="text" name="date" value="" />'
                +'<label for="myemma_email">Email Address*</label>'
                +'<input type="text" id="myemma_email" name="email" value="" />'
                +'<b class="error email"></b>'
                +'<a class="ok">Signup Now!</a>'
                +'</form>'
            +'</div>'
            +'<div id="ph_classic_nlf_success" class="ph_classic_nlf">'
                +'<a class="close" href="'+_loc+'" target="_parent">&times;</a>'
                +'<img src="http://i.perezhilton.com/wp-content/themes/default/images/newsletter/newsletter-signup-header.png" alt="PerezHilton Newsletter Signup" />'
                +'<p>Awesome! You are now signed up to receive the Perez Daily Newsletter. Check your inbox for the latest gossip and photos soon!</p>'
                +'<a class="ok" href="'+_loc+'" target="_parent">OK</a>'
            +'</div>'
            +'<div id="ph_classic_nlf_bg"></div>';
        $(_html).appendTo('body');
        $('#ph_classic_nlf .ok').bind('click tap',function(){
            $('form#ph_classic_nlf_form').trigger('submit');
            return;
        });
        setTimeout(function(){
            $.cookie('ph_classic_nlf', 1, { expires: 3, path: '/'});
            $('#ph_classic_nlf_bg').fadeIn(200);
            $('#ph_classic_nlf').fadeIn(400);
            $('#ph_classic_nlf .close').bind('click tap',function(){
                $('#ph_classic_nlf_bg').hide();
                $('#ph_classic_nlf').fadeOut(200);
            });
        },3000);
    }
}

$(function(){
    myemma_classic_form();
    // send form with AJAX
    $('form#ph_classic_nlf_form').submit(function(){
        var _this = $(this),
            _d = new Date();
        $('#ph_classic_nlf').addClass('loading');
        $.get(_this.attr("action"),
            _this.serialize() + "&t=" + Math.floor(_d.getTime()/1000),
            function(data,status,xhr){
                $('#ph_classic_nlf').removeClass('loading');
                $('#ph_classic_nlf_form b.error').html('');
                $('#ph_classic_nlf_form input.error').removeClass('error');
                if (data=='Done') {
                    // redirect to landing page
                    if (window.self !== window.top &&
                        typeof (window.parent.document) !== 'undefined'){
                        _body = window.parent.jQuery('body');
                        $('#ph_classic_nlf_success').detach().appendTo(_body);
                        _body.find('#ph_classic_nlf').fadeOut(200);
                        _body.find('#ph_classic_nlf_success').fadeIn(400);
                    } else {
                        $('#ph_classic_nlf').fadeOut(200);
                        $('#ph_classic_nlf_success').fadeIn(400);
                    }
                    $.cookie('ph_classic_nlf', 1, { expires: 30000, path: '/'});
                    var _d = new Date(),
                        _ds = _d.getFullYear() + '_' + (_d.getMonth()+1) + '_' + _d.getDate();
                    perez_tracerStat('myemma_lighbox_' + _ds);
                } else if (typeof(data)=='string')
                    alert(data);
                else if (Object.keys(data).length) {
                    var _keys = Object.keys(data);
                    for (i=0; i < _keys.length; i++) {
                        var _k = _keys[i];
                        $('#ph_classic_nlf_form input[name='+_k+']').addClass('error');
                        $('#ph_classic_nlf_form .error.'+_k).html(data[_k]).show();
                    }
                } else
                    alert('Unknown error!');
            },'json');
        return false;
    });
});
