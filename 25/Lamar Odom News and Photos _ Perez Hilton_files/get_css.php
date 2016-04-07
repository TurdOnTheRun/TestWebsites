/*FILE: wp-content/themes/default/css/common/main.css*/

/* RESET */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}

body {
    line-height: 1;
}

ol, ul {
    list-style: none;
}

blockquote, q {
    quotes: none;
}

hr {
    border: 1px solid #ff11c5;
    width: 50%;
    margin: -16px 50% 16px -4px;
    height: 2px;
    background: #ff11c5;
    border-radius: 2px;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
/* /RESET */

body {
    font-family: Verdana,Geneva,Kalimati,sans-serif;
    font-size: 12px;
}

.clear {
    clear: both;
    margin: 0;
    padding: 0;
}

*:first-child+html .clear {
    height: 0px;
}

a:link, a:visited {
    color: #c06;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

#trend {
    width: 100%;
    height: 25px;
    background: #645252;
    position: relative;
    z-index: 3;
}

#trending {
    height: 25px;
    margin: 0 auto;
    position: relative;
}

#trending .left {
    top: 0px;
    left: 0px;
    height: 25px;
    overflow: hidden;
    position: absolute;
}

#trending .left .icon {
    top: 0px;
    left: 0px;
    width: 62px;
    height: 25px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat 0 -567px;
    position: absolute;
}

#trending .left .text {
    top: 7px;
    left: 70px;
    height: 12px;
    color: #f39fd1;
    font-size: 10px;
    line-height: 12px;
    position: absolute;
    overflow: hidden;
}

#trending .left .text a:link, #trending .left .text a:visited {
    color: #f39fd1;
    font-size: 10px;
    text-decoration: none;
}

#trending .left .text a:hover {
    text-decoration: underline;
}

#trending .right {
    height: auto;
    overflow: hidden;
    text-align: right;
    color: #ffffff;
    font-size: 10px;
    line-height: 12px;
    top: 2px;
    right: 0px;
    position: absolute;
}

#trending .right .newsletter_stars {
    width: 41px;
    height: 23px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -120px -2111px;
    margin-right: 1em;
    vertical-align: middle;
}

#trending .right a:link, #trending .right a:visited {
    color: #ffffff;
    font-size: 10px;
    text-decoration: none;
}

#trending .right a:hover {
    text-decoration: underline;
}

#header {
    width: 100%;
    height: 71px;
    position: relative;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_headero.png') repeat-x scroll 0 0;
}

#container {
    height: auto;
    margin: 0 auto 0 auto;
    position: relative;
}

#masthead {
    height: 71px;
    margin: -71px auto 5px auto;
    position: relative;
    z-index: 2;
}

#masthead .masthead_image {
    top: 0px;
    left: 0px;
    height: 68px;
    position: absolute;
    cursor: pointer;
}

#masthead a.menu_home:link,
#masthead a.menu_home:visited,
#masthead a.menu_home_active:link,
#masthead a.menu_home_active:visited {
    top: 24px;
    width: 45px;
    height: 22px;
    line-height: 22px;
    position: absolute;
    cursor: pointer;
    text-indent: -10000px;
}

#masthead a.menu_videos:link,
#masthead a.menu_videos:visited,
#masthead a.menu_videos_active:link,
#masthead a.menu_videos_active:visited {
    top: 24px;
    width: 54px;
    height: 22px;
    line-height: 22px;
    position: absolute;
    cursor: pointer;
    text-indent: -10000px;
}

#masthead a.menu_photos:link,
#masthead a.menu_photos:visited,
#masthead a.menu_photos_active:link,
#masthead a.menu_photos_active:visited {
    top: 24px;
    width: 61px;
    height: 22px;
    line-height: 22px;
    position: absolute;
    cursor: pointer;
    text-indent: -10000px;
}

#masthead a.menu_shop:link,
#masthead a.menu_shop:visited,
#masthead a.menu_shop_active:link,
#masthead a.menu_shop_active:visited {
    top: 24px;
    width: 42px;
    height: 22px;
    line-height: 22px;
    position: absolute;
    cursor: pointer;
    text-indent: -10000px;
}

#masthead a.menu_home:link,
#masthead a.menu_home:visited {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -977px -95px;
}

#masthead a.menu_videos:link,
#masthead a.menu_videos:visited {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1030px -95px;
}

#masthead a.menu_photos:link,
#masthead a.menu_photos:visited {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1092px -95px;
}

#masthead a.menu_shop:link,
#masthead a.menu_shop:visited {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1160px -95px;
}

#masthead a.menu_home:hover {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -977px -125px;
}

#masthead a.menu_videos:hover {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1030px -125px;
}

#masthead a.menu_shop:hover {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1160px -125px;
}

#masthead a.menu_photos:hover {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1092px -125px;
}

#masthead a.menu_home_active {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -977px -125px;
}

#masthead a.menu_videos_active {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1030px -125px;
}

#masthead a.menu_photos_active {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1092px -125px;
}

#masthead a.menu_shop_active {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat -1160px -125px;
}

#masthead .starseeker_dropdown {
    top: 22px;
    right: 125px;
    width: 56px;
    height: 27px;
    position: absolute;
    cursor: pointer;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') scroll no-repeat 0 -999px;
}

#top_starseeker_select {
    top: 26px;
    left: 0px;
    width: 176px;
    height: auto;
    position: absolute;
    font-size: 12px;
    display: none;
}

#search_keyword {
    top: 25px;
    right: 32px;
    width: 88px;
    height: 21px;
    position: absolute;
}

*:first-child+html #search_keyword {
    top: 24px;
}

#keyword {
    width: 88px;
    height: 21px;
    position: relative;
    border: none;
    font-size: 12px;
    background: #ffffff;
}

#search_submit {
    top: 22px;
    right: 4px;
    width: 26px;
    height: 27px;
    position: absolute;
    cursor: pointer;
}

#box_search_submit input,
#footer_search_submit input {
    width: 25px;
    height: 25px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat 0 -537px;
    border: none;
    cursor: pointer;
}

#top_leaderboard {
    width: 728px;
    height: auto;
    margin: 0 auto 0 auto;
    text-align: center;
    background: transparent;
    border: none;
    position: relative;
}

#leaderboard {
    width: 728px;
    height: auto;
    margin: 0 auto;
    text-align: center;
    background: transparent;
    position: relative;
}

#leaderboard_bottom {
    width: 100%;
    height: auto;
    margin: 0 auto;
    text-align: center;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/200x200white70trans_v2o.png') scroll repeat 0 0;
    position: relative;
}
#pager #leaderboard_bottom {
    margin-top: 31px;
    *margin-top: 36px;
    margin-bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    background: transparent !important;
}

#site_tabs {
    position: relative;
    overflow: hidden;
    text-align: center;
}

#site_tabs a {
    display: inline-block;
    border: none;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    font-family: Verdana,Geneva,Kalimati,sans-serif;
}
#site_tabs a:hover {
    text-decoration: none;
}
#site_tabs a .l,
#site_tabs a .c,
#site_tabs a .r {
    display: inline-block;
    float: left;
    background: transparent url(http://i.perezhilton.com/wp-content/themes/default/images/site_tabs7o.png?v=1) no-repeat 0 0;
    border-bottom: 1px solid #d4c6c5;
}

#site_tabs a .l {width:5px;background-position:0 -39px;}
#site_tabs a .c {padding:0 .5em;background-position:-10px -39px;}
#site_tabs a .r {width:5px;background-position:100% -39px;}

#site_tabs a.active .l {width:5px;background-position:0 0;boder:0;}
#site_tabs a.active .c {padding:0 .5em;background-position:-10px 0;border:0;}
#site_tabs a.active .r {width:5px;background-position:100% 0;border:0;}

#site_tabs .tab_star {
    display: inline-block;
    width: 22px;
    height: 20px;
    padding: 0;
    margin: 0;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -583px -848px;
    vertical-align: middle;
    overflow: hidden;
    text-indent: -999em;
}

#footer {
    height: auto;
    padding: 10px 0 10px 0;
    margin: 0 auto;
    position: relative;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/200x200white70trans_v2o.png') scroll repeat 0 0;
}

#footer .footer_search_container {
    width: 315px;
    height: 25px;
    margin: 0 auto 10px auto;
    position: relative;
    background: transparent;
}

#footer_starseeker {
    top: 2px;
    left: 0px;
    width: 130px;
    height: 25px;
    position: absolute;
    text-align: left;
}

#footer_starseeker select {
    width: 130px;
    height: 20px;
    font-size: 12px;
    line-height: 14px;
}

#footer_search_keyword {
    top: 2px;
    left: 140px;
    position: absolute;
    width: 140px;
    height: 17px;
}

*:first-child+html #footer_search_keyword {
    top: 1px;
}

#footer_search_keyword input {
    width: 140px;
    height: 17px;
    font-size: 12px;
    background: #ffffff;
    border: 1px solid #D4C6C5;
}

#footer_search_submit {
    top: 0px;
    left: 290px;
    position: absolute;
    width: 25px;
    height: 25px;
}

#footer .links {
    width: 100%;
    height: auto;
    margin: 0 auto;
    position: relative;
    background: transparent;
    font-size: 11px;
    line-height: 1.7;
    text-align: center;
}

#ph_pres_overlay{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11000;
    width: 100%;
    height: 100%;
    background-color: #000000;
    filter:alpha(opacity=80);
    -moz-opacity: 0.80;
    opacity: 0.80;
    display: none;
}

#ph_pres_container {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 11100;
    position: absolute;
    text-align: center;
    background: transparent;
    margin: 0 auto;
}

#ph_pres_pop_up_post_container {
    width: 500px;
    height: auto;
    z-index: 11200;
    background: transparent;
    margin: 30px auto 0 auto;
    position: relative;
}

#ph_pres_close_top, #ph_pres_close_bottom {
    height: 25px;
    position: relative;
    width: 100%;
    cursor: pointer;
    color: #ffffff;
    font-size: 16px;
    z-index: 11300;
    text-align: right;
}

#ph_pres_close_top {
    margin: 0 0 10px 0;
}

#ph_pres_close_bottom {
    margin: 10px 0 0 0;
}

#ph_pres_pop_up_post {
    height: auto;
    position: relative;
    width: 480px;
    padding: 10px;
    z-index: 11300;
    background: #ffffff;
    font-family: Verdana, Arial, Sans-Serif;
    text-align: left;
    font-size: 12px;
}

#ph_pres_pop_up_post .post {
    border: none;
    margin-bottom: 0px;
}

.top_absolute_1x1 {
    top: 0px;
    left: 0px;
    width: 1px;
    height: 1px;
    position: absolute;
}

.top_fixed_1x1 {
    top: 0px;
    left: 0px;
    width: 1px;
    height: 1px;
    position: fixed;
}

.top_absolute_1x1 img,
.top_fixed_1x1 img {
    width: 1px;
    height: 1px;
    border: none;
}

.clear {
    clear: both;
}

#sb-container {
    display: none;
}

#contact_perez_bg {
    display: none;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.8;
    filter: alpha(opacity=80);
    z-index: 10001;
}
#contact_perez {
    display: none;
    width: 720px;
    height: 480px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -240px 0 0 -360px;
    z-index: 10002;
}
#contact_perez a.contact_perez_close {
    font-size: 16px;
    background: #fff;
    border: 1px solid #000;
    padding: 15px;
    font-weight: bold;
    text-transform: uppercase;
    float: right;
    margin-bottom: 10px;
}
#contact_perez a.contact_perez_close:hover {
    cursor: pointer;
    color: #c06;
    text-decoration: none;
}
#contact_perez .contact_perez_popup {
    min-height: 352px;
    background: #fff;
    border: 1px solid #000;
    padding: 10px;
    clear: both;
}
#contact_perez .contact_perez_popup h2 {
    border-bottom: 2px solid #ff75ef;
    font-size: 36px;
    font-weight: 400;
    color: #999;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
#contact_perez .contcat_perez_envelope {
    display: block;
    float: left;
    width: 96px;
    height: 44px;
    background: url(http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2) 0 -2117px no-repeat;
    margin: 0 0 0 -18px;
}
#contact_perez .contact_perez_direct {
    color: #333;
    font-size: 13px;
    margin-left: .5em;
}
#contact_perez .contact_perez_direct a { 
    color: #00c;
    text-decoration: underline;
}
#contact_perez .contcat_perez_direct a:hover { 
    color: #c06;
}
#contact_perez .content_perez_content {
    overflow: hidden;
    position: relative;
}
#contact_perez_form .content_perez_bottom {
    margin-top: 10px;
    padding-top: 10px;
    text-align: center;
    border-top:  2px solid #ff75ef;
}
#contact_perez_form label {
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    padding: 8px 10px 0 0;
    width: 225px;
    color: #333;
    float: left;
}
#contact_perez_form p.error {
    color: #c00;
    font-weight: bold;
    margin: 2px 0 0 235px;
}
#contact_perez_form input.text,
#contact_perez_form textarea.text {
    border: #d4c6c5 solid 1px;
    padding: 2px;
    margin: 5px 0;
    width: 408px;
    font-size: 16px;
}
#contact_perez_form input.text {

}
#contact_perez_form textarea.text { 
    height: 190px;
}
#contact_perez_form input.send {
    border: 0;
    width: 226px;
    height: 50px;
    background: url(http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2) 0 -2193px no-repeat;
    overflow: hidden;
    text-indent: -1000px;
}
#contact_perez .loading {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
/*    background: rgba(255,255,255,.8);*/
}
#contact_perez .loading_overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    opacity: 0.8;
    filter: alpha(opacity=80);
}
#contact_perez .loading img {
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -16px 0 0 -16px;
}
#contact_perez .contact_perez_finish {
    padding: 150px;
}
#contact_perez .contact_perez_finish h3 {
    text-align: center;
    font-weight: bold;
    font-size: 32px;
}
#contact_perez .contact_perez_finish p {
    text-align: center;
    font-weight: bold;
    font-size: 14px;
}

/*FILE: wp-content/themes/default/css/common/site_perezhilton.css*/

body {
    background: #faccce;
}

#search_submit {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_7.png?v=1') repeat-x scroll right top;
}

/*FILE: wp-content/themes/default/css/blog/main.css*/

#content {
    height: auto;
    position: relative;
    margin: 0 auto 0 auto;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/200x200white70trans_v2o.png') scroll repeat 0 0;
    padding-top: 10px;
}

#right {
    padding-left: 5px;
    height: auto;
    float: left;
    position: relative;
}

*:first-child+html #right {
    padding-left: 0;
}

#top_300x250,
#top_300x250_2,
#mid_300x250 {
    height: auto;
    margin: 0 auto;
    text-align: center;
    position: relative;
}

#top_300x250_2 {
    margin-top: 10px;
}

#top_160x600 {
    width: 160px;
    height: auto;
    margin: 0 auto;
    text-align: center;
    position: relative;
}

#sep_right_button {
    height: auto;
    margin: 0 auto;
    text-align: center;
    position: relative;
    border-bottom: #d4c6c5 solid 1px;
}

.sidebarbox {
    height: auto;
    margin: 0 auto;
}

.box_top_video,
.box_videos,
.box_youtube,
.box_galleries,
.box_most_commented,
.box_most_emailed,
.box_top_celebs,
.box_top_story,
.box_perez_facebook,
.box_perez_twitter,
.box_perez_contact,
.box_radio,
.box_celebs_tweets,
.box_search,
.box_poll_widget,
.box_jigsaw,
.box_advertising_info,
.box_newsletter,
.box_submit_your_question {
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    color: #c06;
    line-height: 1.2;
    border-bottom: #d4c6c5 solid 1px;
    position: relative;
}

.box_top_video a:link, .box_top_video a:visited,
.box_videos a:link, .box_videos a:visited,
.box_youtube a:link, .box_youtube a:visited,
.box_top_celebs a:link, .box_top_celebs a:visited {
    color: #000000;
    text-decoration: none;
}

.box_top_video a:hover,
.box_videos a:hover,
.box_youtube a:hover,
.box_top_celebs a:hover {
    text-decoration: underline;
}

.box_advertising_info {
    text-align: center;
    font-size: 14px;
}

.box_videos .header {
    position: relative;
    margin: 0 0 10px 0;
    cursor: pointer;
}

.box_youtube .header {
    position: relative;
    margin: 10px 0 15px 0;
    cursor: pointer;
}

.box_galleries .header {
    position: relative;
    margin: 0 0 10px 0;
    cursor: pointer;
}

.box_videos .row,
.box_youtube .row {
    margin: 0 0 10px 0;
    text-align: center;
}

.box_radio .row {
    margin: 0 auto 10px auto;
    text-align: center;
    font-size: 14px;
}

.box_galleries .row {
    width: 100%;
    margin: 0 0 10px 0;
    position: relative;
}

.box_galleries .picture {
    float: left;
    position: relative;
    width: 100%;
    color: #ffffff;
}

.box_videos .picture,
.box_youtube .picture {
    position: relative;
    background: black;
    border: 1px solid #FC1E99;
    margin: 0 auto 5px auto;
}

.box_videos .picture .play,
.box_youtube .picture .play
 {
    top: 0px;
    left: 0px;
    height: 100%;
    position: absolute;
    cursor: pointer;
}

.box_videos .picture .thumbnail,
.box_youtube .picture .thumbnail {
    background: #000000 url('http://i.perezhilton.com/images/blank.gif') scroll no-repeat center center;
    background-size:100%;
    position: absolute;
    overflow: hidden;
}

.box_videos .text,
.box_youtube .text {
    font-size: 11px;
}

.box_galleries .text {
    bottom: 10px;
    left: 0px;
    height: auto;
    position: absolute;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/60trans-caption-share-bg.png') repeat scroll 0 0;
    color: #ffffff;
    font-weight: bold;
}

*:first-child+html .box_galleries .text {
    bottom: 12px;
}

.box_galleries a:link, .box_galleries a:visited {
    color: #ffffff;
}

.box_galleries a:hover {
    text-decoration: none;
}

.box_galleries .text p iframe {
    margin-top: 5px;
}

.box_galleries img {
    margin: 0 0 10px 0;
}

.box_videos .search {
    position: relative;
    margin: 0 0 15px 0;
}

.box_videos .search .dropdown {
    top: 0px;
    left: 0px;
    color: #000000;
    font-size: 12px;
    position: absolute;
}

.box_videos .search .dropdown select {
    height: 20px;
    font-size: 12px;
}

.box_videos .search .keyword {
    height: 19px;
    position: absolute;
}

.box_videos .search .keyword input {
    height: 15px;
    border-top: #fc1e99 solid 1px;
    border-left: #fc1e99 solid 1px;
    border-bottom: #fc1e99 solid 1px;
    border-right: none;
    background: #ffffff;
    font-size: 12px;
    line-height: 14px;
}

.box_videos .search .submit {
    width: 22px;
    height: 19px;
    position: absolute;
}

*:first-child+html .box_videos .search .submit {
    top: 1px;
}

.box_videos .search .submit input {
    width: 22px;
    height: 19px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -399px -636px;
    border: none;
    cursor: pointer;
}

.box_most_commented .header {
    height: 36px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -400px -386px;
    position: relative;
    margin: 0 0 10px 0;
}

.box_most_emailed .header {
    height: 36px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -400px -724px;
    position: relative;
    margin: 0 0 10px 0;
}

.box_most_commented a:link, .box_most_commented a:visited,
.box_emailed a:link, .box_emailed a:visited,
.box_cocoperez a:link, .box_cocoperez a:visited,
.box_celebs_tweets a:link, .box_celebs_tweets a:visited {
    color: #c06;
    text-decoration: none;
}

.box_most_commented a:hover,
.box_most_emailed a:hover,
.box_cocoperez a:hover,
.box_celebs_tweets a:hover {
    text-decoration: underline;
}

.box_most_commented .row,
.box_most_emailed .row {
    margin: 0 0 10px 0;
}

.box_most_commented .picture,
.box_most_emailed .picture{
    float: left;
    position: relative;
}

.box_most_commented .text,
.box_most_emailed .text{
    float: left;
}

.box_most_commented img,
.box_most_emailed img {
    border: #c06 solid 1px;
}

.box_most_commented .share,
.box_most_emailed .share {
    height: 23px;
    margin: 10px 0 0 0;
    float: left;
}

.box_most_commented .share .left,
.box_most_emailed .share .left {
    width: 30px;
    height: 21px;
    padding: 2px 0 0 0;
    float: left;
    text-align: left;
    overflow: hidden;
}

.box_most_commented .share .right, 
.box_most_emailed .share .right {
    width: 82px;
    height: 23px;
    float: left;
    text-align: left;
    overflow: hidden;
}

.box_top_celebs .header {
    height: 37px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat 0px -311px;
    position: relative;
    margin: 0 0 10px 0;
}

.box_top_celebs .row {
    float: left;
    margin: 0;
    text-align: center;
}

.box_top_celebs .picture {
    width: 100%;
    height: 75px;
    position: relative;
}

.box_top_celebs .text {
    height: 30px;
    padding: 0 5px 0 5px;
    font-size: 11px;
    overflow: hidden;
}

.box_top_celebs img {
    width: 70px;
    height: 70px;
    margin: 0 10px 5px 10px;
    border: #c06 solid 1px;
}

.box_top_story .header {
    position: relative;
    margin: 0 0 10px 0;
}

.box_top_story .post {
    width: 100%;
    height: auto;
    background: transparent;
    line-height: 1.3;
}

.box_top_story .post h2 {
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 18px;
    margin: 0 0 10px 0;
}

.box_top_story .post h2 a:link, .post h2 a:visited {
    font-weight: bold;
    font-size: 18px;
    color: #000000;
    text-decoration: none;
}

.box_top_story .post h2 a:hover {
    color: #c06;
}

.box_top_story .post img {
    border: 2px solid #c06;
}

.box_top_story .post p {
    padding: 0 0 10px 0;
    color: #333;
}

.box_top_story .post hr {
    margin: -10px 50% 0 -4px;
}

.box_top_story .post blockquote {
    margin: 15px 10px 15px 5px;
    padding-left: 20px;
    border-left: 5px solid #ddd;
    color: #777777;
}

.box_top_story .post blockquote p {
    color: #777777;
}

.box_top_story .post blockquote cite {
    margin: 5px 0 0;
    display: block;
}

.box_top_story .post span.hiddentext {
    font-weight: bold;
    cursor: pointer;
}

.box_top_story a.read_more {
    font-size: 16px;
    font-weight: bold;
}

.box_top_story .share {
    height: 23px;
    margin-bottom: 10px;
}

.box_top_story .share .left {
    width: 30px;
    height: 21px;
    padding: 2px 0 0 0;
    float: left;
    text-align: left;
}

.box_top_story .share .right {
    height: 23px;
    float: right;
    text-align: left;
}

.box_perez_facebook {
    line-height: 1.4;
}

.box_perez_facebook .picture {
    top: 10px;
    width: 40px;
    height: 40px;
    position: absolute;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -96px -861px;
    cursor: pointer;
}

.box_perez_facebook .text {
    top: 10px;
    height: 40px;
    position: absolute;
    color: #3b5998;
    font-family: Verdana,Geneva,Kalimati,sans-serif;
    font-size: 11px;
}

.box_perez_facebook .text a:link, .box_perez_facebook .text a:visited {
    color: #3b5998;
    text-decoration: none;
}

.box_perez_facebook .text a:hover {
    text-decoration: underline;
}

.box_perez_facebook .text span {
    font-size: 13px;
    font-weight: bold;
}

.box_perez_facebook .fblogo {
    width: 40px;
    height: 40px;
    position: absolute;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -402px -132px;
    cursor: pointer;
}

.box_perez_twitter {
    line-height: 1.4;
}

.box_perez_twitter .picture {
    top: 10px;
    width: 40px;
    height: 40px;
    position: absolute;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -4px -861px;
    cursor: pointer;
}

.box_perez_twitter .text {
    top: 10px;
    height: 40px;
    position: absolute;
    color: #3b5998;
    font-family: Verdana,Geneva,Kalimati,sans-serif;
    font-size: 11px;
}

.box_perez_twitter .text a:link, .box_perez_twitter .text a:visited {
    color: #27B;
    text-decoration: none;
}

.box_perez_twitter .text a:hover {
    text-decoration: underline;
}

.box_perez_twitter .text span {
    font-size: 13px;
    font-weight: bold;
}

.box_perez_twitter .twitterlogo {
    width: 107px;
    height: 21px;
    position: absolute;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat 0px -438px;
    cursor: pointer;
}

.box_perez_contact {
    line-height: 1.4;
}

.box_perez_contact .header {
    position: relative;
    margin: 0 auto 10px auto;
}

.box_radio .header {
    height: 68px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat 0 -359px;
    position: relative;
    margin: 0 0 10px 0;
    cursor: pointer;
    position: relative;
}

.box_radio .header .play {
    top: 0px;
    left: 0px;
    height: 68px;
    position: absolute;
}

.box_radio .header .current {
    width: 100px;
    height: 19px;
    position: absolute;
}

.box_radio .header .archive {
    width: 68px;
    height: 20px;
    position: absolute;
}

.box_radio .text {
    width: 100%;
}

.box_cocoperez,
.box_fitperez,
.box_teddyhilton,
.box_perezitos {
    padding: 10px 5px 0 5px;
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    color: #c06;
    line-height: 1.2;
    position: relative;
}

.box_cocoperez,
.box_fitperez {
    float: right;
}

.box_teddyhilton,
.box_perezitos {
    float: left;
}

.box_cocoperez .content,
.box_fitperez .content,
.box_teddyhilton .content,
.box_perezitos .content {
    height: auto;
    padding: 10px 3px 0 3px;
    margin: 0 auto 0 auto;
}

.box_cocoperez .content_bottom,
.box_fitperez .content_bottom,
.box_teddyhilton .content_bottom,
.box_perezitos .content_bottom {
    height: 5px;
    margin: 0 0 0 5px;
}

.box_cocoperez .row,
.box_fitperez .row,
.box_teddyhilton .row,
.box_perezitos .row {
    margin: 0;
    padding: 2px 5px 2px 5px;
}

.box_cocoperez .picture,
.box_fitperez .picture,
.box_teddyhilton .picture,
.box_perezitos .picture {
    width: 58px;
    overflow: hidden;
    float: left;
    position: relative;
}

.box_cocoperez .text,
.box_fitperez .text,
.box_teddyhilton .text,
.box_perezitos .text {
    float: left;
    font-size: 12px;
    font-weight: bold;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    margin: 0 0 10px 0;
}

.box_cocoperez img,
.box_fitperez img,
.box_teddyhilton img,
.box_perezitos img {
    width: 48px;
}

.box_cocoperez .bottom_link,
.box_fitperez .bottom_link,
.box_teddyhilton .bottom_link,
.box_perezitos .bottom_link {
    text-align: right;
    margin: 10px auto 0 auto;
    font-weight: bold;
}

.box_cocoperez .share,
.box_fitperez .share,
.box_teddyhilton .share,
.box_perezitos .share {
    height: 23px;
    margin: 0 0 10px 0;
    float: left;
}

.box_cocoperez .share .left,
.box_fitperez .share .left,
.box_teddyhilton .share .left,
.box_perezitos .share .left {
    width: 30px;
    height: 21px;
    padding: 2px 0 0 0;
    float: left;
    text-align: left;
    overflow: hidden;
}

.box_cocoperez .share .right,
.box_fitperez .share .right,
.box_teddyhilton .share .right,
.box_perezitos .share .right {
    height: 23px;
    float: right;
    text-align: left;
    overflow: hidden;
}

.box_cocoperez {
    background: #faccce;
    margin: 0;
    border-bottom: none;
    padding-bottom: 10px;
}

.box_cocoperez .header {
    width: 178px;
    height: 31px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -397px -232px;
    position: relative;
    margin: 0 auto 10px auto;
    cursor: pointer;
    position: relative;
}

.box_fitperez {
    background: #74e3ff;
    border-bottom: none;
    padding-bottom: 10px;
}

.box_fitperez .header {
    width: 95px;
    height: 34px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -397px -274px;
    position: relative;
    margin: 0 auto 10px auto;
    cursor: pointer;
    position: relative;
}

.box_fitperez a:link, .box_fitperez a:visited {
    color: #F74;
    text-decoration: none;
}

.box_fitperez a:hover {
    text-decoration: underline;
}

.box_teddyhilton {
    background: #ffffcc;
    margin: 0;
    border-bottom: none;
    padding-bottom: 10px;
}

.box_teddyhilton .header {
    width: 205px;
    height: 31px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -396px -199px;
    position: relative;
    margin: 0 auto 10px auto;
    cursor: pointer;
    position: relative;
}

.box_teddyhilton a:link, .box_teddyhilton a:visited {
    color: #C96;
    text-decoration: none;
}

.box_teddyhilton a:hover {
    text-decoration: underline;
}

.box_perezitos {
    background: #d7ffc3;
    border-bottom: none;
    padding-bottom: 10px;
}

.box_perezitos .header {
    width: 150px;
    height: 34px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -548px -134px;
    position: relative;
    margin: 0 auto 10px auto;
    cursor: pointer;
    position: relative;
}

.box_perezitos a:link, .box_perezitos a:visited {
    color: #A46FBF;
    text-decoration: none;
}

.box_perezitos a:hover {
    text-decoration: underline;
}

.box_celebs_tweets .header {
    position: relative;
    margin: 0 0 10px 0;
}

.box_celebs_tweets .row {
    margin: 0 0 5px 0;
    border-bottom: 1px dashed #D2DADA;
}

.box_celebs_tweets .picture {
    float: left;
    position: relative;
}

.box_celebs_tweets .text {
    float: left;
    color: #000000;
    line-height: 1.4;
    margin: 0 0 5px 0;
}

.box_celebs_tweets .text .time {
    color: #999;
    font-size: 11px;
}

.box_celebs_tweets img {
    margin: 5px 10px 5px 0;
    border: #c06 solid 1px;
}

.box_celebs_tweets .navigation,
.box_videos .navigation,
.box_youtube .navigation,
.box_galleries .navigation {
    width: 100%;
    height: auto;
    margin: 0 0 10px 0;
    position: relative;
}

.box_celebs_tweets .navigation .prev,
.box_videos .navigation .prev,
.box_youtube .navigation .prev,
.box_galleries .navigation .prev {
    width: 50%;
    height: auto;
    float: left;
    text-align: left;
    font-weight: bold;
}

.box_celebs_tweets .navigation .next,
.box_videos .navigation .next,
.box_youtube .navigation .next,
.box_galleries .navigation .next {
    width: 50%;
    height: auto;
    float: right;
    text-align: right;
    font-weight: bold;
}

.box_youtube .navigation .next {
    width: 100%;
}

.box_videos .navigation a:link,
.box_videos .navigation a:visited,
.box_youtube .navigation a:link,
.box_youtube .navigation a:visited,
.box_galleries .navigation a:link,
.box_galleries .navigation a:visited {
    text-decoration: none;
    color: #c06;
    font-size: 14px;
    text-transform: uppercase;
}

.box_videos .navigation a:hover,
.box_youtube .navigation a:hover,
.box_galleries .navigation a:hover {
    text-decoration: underline;
}

.box_videos .loading,
.box_youtube .loading {
    width: 100%;
    height: auto;
    text-align: center;
    color: #000000;
    margin: 0 0 15px 0;
}

.box_search,
.box_newsletter {
    height: 57px;
}

.box_search .header {
    position: relative;
    margin: 0 0 10px 0;
    cursor: pointer;
}

.box_poll_widget {
    height: auto;
    position: relative;
}

#box_starseeker {
    top: 46px;
    height: 25px;
    position: absolute;
    text-align: left;
}

#box_starseeker select {
    height: 20px;
    font-size: 12px;
    line-height: 14px;
}

#box_search_keyword {
    top: 46px;
    position: absolute;
    height: 17px;
}

*:first-child+html #box_search_keyword {
    top: 45px;
}

#box_search_keyword input {
    height: 17px;
    font-size: 12px;
    background: #ffffff;
    border: 1px solid #D4C6C5;
}

#box_search_submit {
    top: 43px;
    position: absolute;
    width: 25px;
    height: 25px;
}

.box_newsletter select {
    top: 46px;
    height: 20px;
    font-size: 12px;
    line-height: 14px;
    position: absolute;
}

.box_newsletter input {
    top: 46px;
    height: 17px;
    font-size: 12px;
    background: #ffffff;
    border: 1px solid #D4C6C5;
    position: absolute;
}

.box_newsletter .submit {
    top: 43px;
    right: 0px;
    width: 25px;
    height: 25px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat 0 -537px;
    border: none;
    cursor: pointer;
    position: absolute;
}

.box_jigsaw {
    margin: 10px auto 10px auto;
    text-align: center;
    border: none;
}

.box_jigsaw img {
    border: none;
}

.box_blogads {
    width: 100%;
    height: auto;
    text-align: center;
    margin: 0 auto 0 auto;
    padding: 10px 0 10px 0;
    border-bottom: #D4C6C5 solid 1px;
}

.box_blogads div {
    margin: 0 auto;
}

.box_submit_your_question img {
    border: none;
}

#pager {
    min-height: 31px;
    margin: 0 auto;
    padding: 9px 0 4px;
    color: #c06;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    position: relative;
}

#pager2 {
    height: 31px;
    margin: 0 auto 10px auto;
    padding: 9px 0 4px;
    background: #FEF1F2 url('http://i.perezhilton.com/wp-content/themes/default/images/footer-pager-background2.png') scroll repeat-x 0 0;
    color: #c06;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    position: relative;
}

#pager .prev,
#pager2 .prev {
    top: 9px;
    left: 10px;
    width: auto;
    height: auto;
    font-size: 25px;
    z-index: 2;
    position: absolute;
    text-align: left;
}

#pager .next,
#pager2 .next {
    top: 9px;
    right: 10px;
    width: auto;
    height: auto;
    font-size: 25px;
    z-index: 2;
    position: absolute;
    text-align: right;
}

#pager .center {
    top: 15px;
    left: 0px;
    width: 100%;
    height: auto;
    position: absolute;
    text-align: center;
}

#pager .top,
#pager .bottom {
    display: block;
    margin: 0;
    padding: 0;
    border: 0;
    width: 100%;
    height: 5px;
    position: absolute;
    left: 0;
}

#pager .top {
    top: 0;
}

#pager .bottom {
    bottom: 0;
}

.top_video_gfx {
    background: url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') no-repeat scroll 0 -1951px transparent;
    height: 53px;
    width: 197px;
    margin: 0 0 10px;
    position: relative;
}

.box_top_video {
    padding-top: 10px;
}

.box_top_video .share {
    height: 0px;
    position: relative;
}

.box_top_video .share .left {
    height: 16px;
    position: absolute;
    top: -28px;
    width: 16px;
}

.box_top_video .share .right {
    height: 21px;
    position: absolute;
    top: -30px;
    width: 110px;
}

#featuredPostsContainer {
    height: 110px;
    margin: 10px auto 0px auto;
    position: relative;
}

#featuredPostsListContainer {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

#featuredPosts {
    width: 10000px;
    list-style-type:none;
    margin: 0;
    height: 100px;
    padding: 0;
    position: relative;
}
#featuredPostsContainer .featuredPost {
    width: 150px;
    height: 100px;
    overflow: hidden;
    display: inline-block;
    float: left;
    border: 1px solid #FD1D9A;
    padding: 0;
    position:relative;
}

#featuredPostsContainer .last {
    margin-right: 0;
}
#featuredPostsContainer .featuredPost  img {
    border: none;
    float: left;
    display: inline;
    position: relative;
}

#featuredPostsContainer .featuredPost .caption {
    text-align: left;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src='http://i.perezhilton.com/wp-content/themes/default/images/captionBg.png');
    background: url('http://i.perezhilton.com/wp-content/themes/default/images/captionBg.png') repeat;
    bottom:0px;
    clear:left;
    float:left;
    font-family:arial;
    font-size:11px;
    margin:0;
    overflow:hidden;
    padding:2px 5px;
    position:absolute;
    width:140px;
    left: 0px;
}

#featuredPostsContainer .featuredPost .caption a:link,
#featuredPostsContainer .featuredPost .caption a:visited {
    color: white;
    text-decoration: none;
}

#featuredPostsContainer .featuredPost .caption a:hover {
    color: #FEC2E3;
}

#featuredPostsContainer .arrowButton {
    position: absolute;
    top: 3px;
    left: 130px;
    border: none;
    width: 16px;
    height: 16px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -95px -947px;
}

#featuredPostsContainer .arrowButton img {
    width: 16px;
    height: 16px;
}

#featuredPostsContainer .arrowLink {
    display: inline;
    float: left;
}

#featuredPostsContainer .featuredPostsLeftNav {
    position: absolute;
    width: 43px;
    height: 100px;
    top: 0px;
    display: none;
}

#featuredPostsContainer .featuredPostsRightNav {
    position: absolute;
    top: 0px;
    width: 43px;
    height: 100px;
    display: none;
}

#featuredPostsContainer .featuredPostsLeftNav .leftArrowLink,
#featuredPostsContainer .featuredPostsRightNav .rightArrowLink {
    width: 43px;
    display: block;
    height: 100px;
    text-indent: -1000px;
    outline-style: none;
}

footerSisterSites {
    height: auto;
    margin: 0 auto 0 auto;
    padding: 0 15px 10px 15px;
}

.video_thumbnail_play {
    display: block;
    background-image: url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2');
    background-position: -399px -666px;
    width: 16px;
    height: 16px;
    position: absolute;
    margin: 15px 0 0 10px;
}

.box_perez_recommends {
    border-bottom: 1px solid #D4C6C5;
    color: #CC0066;
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    line-height: 1.2;
    padding: 10px 10px 0;
    position: relative;
}


.box_perez_recommends .header {
    width: 320px !important;
    height: 36px;
    position: relative;
    margin: 0 0 10px 0;
    display: block;
}

.box_perez_recommends a:link, .box_perez_recommends a:visited {
    color: #c06;
    text-decoration: none;
}

.box_perez_recommends a:hover {
    text-decoration: underline;
}

.box_perez_recommends .row {
    margin: 0 0 10px 0;
    padding: 0 0 4px 0;
}

.box_perez_recommends .picture {
    float: left;
    position: relative;
    padding-bottom: 1px;
}

.box_perez_recommends .text {
    float: left;
}

.box_perez_recommends img {
    margin: 0 10px 10px 0;
    border: #c06 solid 1px;
}

.box_perez_recommends .row {
    background: url('http://i.perezhilton.com/services/perez_recommends/separator.png') scroll no-repeat left bottom;
}

.fromRecommend {
    text-align: right;	

}

.fromRecommend a:link, .fromRecommend a:visited {
    font-style: italic;
    color: #666;
    text-decoration: none;
}

.fromRecommend a:hover {
    text-decoration: underline;
}

.box_perez_recommends .navigation {	
    height: auto;
    margin: 0 0 10px;
    position: relative;
    width: 100%;
}
.box_perez_recommends .navigation a:link, .box_perez_recommends .navigation a:visited {
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
}

.box_perez_recommends .navigation a:hover {
    text-decoration: underline;
}


.box_perez_recommends .prev, .box_perez_recommends .next  {
    float: left;
    font-weight: bold;
    height: auto;
    text-align: left;
    width: 50%;
}

.box_perez_recommends .next {
    float: right;
    text-align: right;
}

.pinkboy_button > a {
    display: block;
}

.box_perez_recommends .share {
    margin: 5px 0 5px 0;
    width: 168px;
    height: 21px;
}

.box_perez_recommends .left,
.box_perez_recommends .right,
.box_galleries .left,
.box_galleries .right {
    float: left;
}

.box_perez_recommends .left,
.box_galleries .left {
    width: 30px;
    height: 16px;
    padding: 2px 0 0 0;
}

.box_perez_recommends .right {
    width: 138px;
}

.box_galleries .share {
    width: 140px;
    height: 21px;
    float: left;
}

.box_galleries .right {
    width: 108px;
}

.box_most_commented .comments_number {
    text-align: center;
    font-size: 9px;
    font-family: Arial, sans-serif;
    font-weight: bold;
    float: left;
    background: url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') -407px -1650px no-repeat;
    width: 26px;
    height: 17px;
    padding-top: 5px;
    padding-right: 2px;
    margin-top: -1px;
}

.box_most_commented .comments_number a:link {
    color: #fff;
    display: block;
    text-decoration: none;
    font-weight: bold;
}

.box_most_commented .comments_number a:hover {
    color: #fff;
    font-weight: bold;
}

.box_most_commented .comments_number a:visited {
    color: #eee;
}

#right .video_transparent_container {
    background: #000000;
    position: relative;
}

#right .video_transparent_thumbnail {
    top: 0px;
    left: 0px;
    background: #000000 url('http://i.perezhilton.com/images/blank.gif') no-repeat scroll center center;
    position: absolute;
}

#right .video_transparent_player {
    top: 0px;
    left: 0px;
    position: absolute;
    cursor: pointer;
}

#right .box_most_recent_posts {
    height: auto;
    margin: 0 auto;
    padding: 0;
    line-height: 1.2;
    position: relative;
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
}

#right .box_most_recent_posts a:link, #right .box_most_recent_posts a:visited {
    color: #000000;
    text-decoration: none;
}

#right .box_most_recent_posts a:hover {
    text-decoration: none;
}

#right .box_most_recent_posts .row {
    height: auto;
    padding: 10px !important;
    margin: 0 !important;
    cursor: pointer;
    border-bottom: #D4C6C5 solid 1px;
    background: transparent;
}

#right .box_most_recent_posts .picture {
    float: left;
    position: relative;
}

#right .box_most_recent_posts .text {
    float: left;
    max-height: 100px;
    overflow: hidden;
}

#right .box_most_recent_posts .text .title {
    color: #c06;
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
    max-height: 90px;
    overflow: hidden;
}

#right .box_most_recent_posts .text .title a:link, #right .box_most_recent_posts .text .title a:visited {
    color: #c06;
    font-size: 13px;
    font-weight: bold;
    text-decoration: none;
    max-height: 90px;
}

#right .box_most_recent_posts .text .title a:hover {
    text-decoration: none;
}

#right .box_most_recent_posts .text .desc {
    font-size: 12px;
    max-height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#right .box_most_recent_posts a.thumb {
    position: relative;
    display: inline-block;
    zoom: 1;
    *display: inline;
}

#right .box_most_recent_posts a.thumb b.play {
    position: absolute;
    z-index: 2;
    display: block;
    width: 16px;
    height: 16px;
    margin: 5px 0 0 5px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -399px -666px;
}

#right .box_most_recent_posts a.thumb img.thumb {
    position: relative;
    z-index: 1;
    border: #c06 solid 1px;
}

#sthoverbuttons {
    display: none !important;
}

.wp-polls ul li, wp-polls-ul li, .wp-polls-ans ul li {
    text-align: left;
    list-style: none;
}

.wp-polls ul li:before, wp-polls-ul li, .wp-polls-ans ul li:before, #sidebar ul ul li:before {
    content: '';
}

.wp-polls IMG, .wp-polls LABEL , .wp-polls INPUT, .wp-polls-loading IMG, .wp-polls-image IMG {
    border: 0px;
    padding: 0px;
    margin: 0px;
}

.wp-polls-ans {
    width:100%;
    filter: alpha(opacity=100);
    -moz-opacity: 1;
    opacity: 1;
}

.wp-polls-loading {
    display: none;
    text-align: center;
    height: 16px;
}

.wp-polls-image {
    width: 16px !important;
    height: 16px  !important;
    border: none !important;
}

.wp-polls .Buttons {
    border:1px solid #c8c8c8;
    background-color: #f3f6f8;
}

.wp-polls .pollsharing {
    display: none;
}

.wp-polls-usage-pre {
    margin: 20px;
    padding: 10px;
    border: 1px solid #c8c8c8;
    background-color: #f0f0f0;
    overflow: auto;
}

#wp-polls-pollbar-bg {
    width: 25px;
    height: 25px;
    border: 1px solid #000000;
}

#wp-polls-pollbar-border {
    width: 25px;
    height: 25px;
    border: 1px solid #000000;
}

.wp-polls .pollsharing_fb_btn {
    width: 20px !important; 
    height: 20px !important; 
    border: none !important; 
    vertical-align: middle;
    margin-right: 5px; 
    cursor: pointer;
}

.wp-polls .pollsharing_twitter_btn {
    width: 20px !important; 
    height: 20px !important; 
    border: none !important; 
    vertical-align: middle; 
    cursor: pointer;
}

#left {
    width: 480px;
    height: auto;
    padding-top: 3px;
    float: left;
    border-right: #d4c6c5 solid 1px;
    position: relative;
}

#left .prev {
    display: block;
    text-transform: uppercase;
    font-size: 14px;
    margin: 5px;
}

#left h1 {
    width: 470px;
    height: auto;
    margin: 10px 5px 10px 5px;
    font-size: 20px;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: normal;
}

#left .site_selector {
    width: 470px;
    height: 22px;
    padding: 0;
    margin: 0 auto 10px auto;
    position: relative;
}

#left .site_selector .filter_by {
    top: 0px;
    right: 140px;
    width: 97px;
    height: 22px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/gb_sprite_6.png?v=1') scroll no-repeat -1103px -152px;
    position: absolute;
}

#left .site_selector select {
    top: 0px;
    right: 0px;
    width: 130px;
    height: 22px;
    font-size: 15px;
    font-family: Verdana,Geneva,Kalimati,sans-serif;
    font-weight: normal;
    position: absolute;
}

#left .breadcrumb {
    width: 470px;
    height: auto;
    padding: 0px 5px 10px 5px;
    font-size: 11px;
}

#left .navigation {
    width: 460px;
    height: auto;
    padding: 0 5px 5px 5px;
    font-size: 11px;
    margin: 0 5px 10px 5px;
    border-bottom: #d4c6c5 solid 1px;
    color: #c06;
}

#left .navigation .left {
    width: 220px;
    height: auto;
    float: left;
    padding: 0 10px 0 0;
    border-right: #d4c6c5 solid 1px;
}

#left .navigation .right {
    width: 219px;
    height: auto;
    float: right;
    padding: 0 0 0 10px;
}

#left .navigation .right .big {
    text-align: right;
}

#left .navigation .big {
    margin: 0 0 10px 0;
}

#left .navigation img {
    float: left;
    padding-right: 7px;
    width: 65px;
}

.between_posts_300x250 {
    width: 300px;
    height: auto;
    padding: 0 90px 0 90px;
    text-align: center;
}

.between_posts_google {
    width: 100%;
    height: auto;
    margin: 0 auto;
    text-align: center;
}

#left .post,
.pop_up_post {
    margin: 0 5px 20px 5px;
    width: 450px;
    height: auto;
    padding: 10px;
    background: #ffffff;
    border-top: #fcdaea solid 1px;
    border-bottom: #d4c6c5 solid 1px;
    line-height: 1.3;
}

.pop_up_post {
    font-size: 12px;
}

#left .post h1, #left .post h2,
.pop_up_post h1, .pop_up_post h2 {
    width: 100%;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 18px;
    margin: 0 0 10px 0;
}

#left .post h1 a:link, #left .post h1 a:visited,
#left .post h2 a:link, #left .post h2 a:visited,
.pop_up_post h1 a:link, .pop_up_post h1 a:visited,
.pop_up_post h2 a:link, .pop_up_post h2 a:visited {
    font-weight: bold;
    font-size: 18px;
    color: #000000;
    text-decoration: none;
}

#left .post h1 a:hover,
#left .post h2 a:hover,
.pop_up_post h1 a:hover,
.pop_up_post h2 a:hover {
    color: #c06;
}

#left .post .categories,
.pop_up_post .categories,
.post-shared-headline .categories {
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-size: 11px;
    margin: 0 0 10px 0;
}

#left .post img,
.pop_up_post img {
    width: 446px;
    border: 2px solid #c06;
}

#left .post .read_more_on {
    width: auto !important;
    border: none;
}

#left .post img.thumbnail, #left .post img.import {
    width: 120px !important;
    border: 2px solid #c06;
    margin: 10px 10px 10px 5px;
    float: left;
}

#left .post p,
.pop_up_post p {
    padding: 0 0 10px 0;
    color: #333;
}

#left .post blockquote,
.pop_up_post blockquote {
    margin: 15px 10px 15px 5px;
    padding-left: 20px;
    border-left: 5px solid #ddd;
    color: #777777;
}

#left .post blockquote p,
.pop_up_post blockquote p {
    color: #777777;
}

#left .post blockquote cite,
.pop_up_post blockquote cite {
    margin: 5px 0 0;
    display: block;
}

#left .post span.hiddentext,
.pop_up_post span.hiddentext {
    font-weight: bold;
    cursor: pointer;
}

#left .post .postbottom,
.pop_up_post .postbottom {
    width: 100%;
    height: 30px;
    padding: 5px 0 0 0;
    position: relative;
    border-top: #d4c6c5 solid 1px;
    font-size: 11px;
}

#left .post .postbottom.two_lines {
    padding: 5px 0 5px 0;
    border-bottom: #d4c6c5 solid 1px;
    margin-bottom: 5px;
}

#left .post .categories .post-date {
    text-transform: uppercase;
    color: #727272;
}

#left .post .categories .separator {
    color: #cc0066;
}

.pop_up_post .postbottom {
    height: 50px;
}

.pop_up_post .postbottom .twitter_static_button {
    bottom: 0;
    right: 0;
    position: absolute; 
}

.pop_up_post .postbottom .fb-share-static-btn {
    bottom: 0;
    right: 70px;
    position: absolute;
}

#left .post .postbottom_without_share,
.pop_up_post .postbottom_without_share {
    width: 100%;
    height: 11px;
    padding: 5px 0 0 0;
    position: relative;
    border-top: #d4c6c5 solid 1px;
    font-size: 11px;
}

#left .post .tweetmeme_button,
.pop_up_post .tweetmeme_button {
    top: 0px;
    right: 0px;
    width: 133px;
    height: 60px;
    position: absolute;
}

#left .post .fb-like-btn,
.pop_up_post .fb-like-btn {
    top: 30px;
    left: 0px;
    width: 310px;
    height: 30px;
    position: absolute;
    z-index: 2;
}

#left .post-ad {
    background-color: #feff99 !important;
    border-top: 1px solid #FBFB00 !important;
}

#left .post-ad-gray {
    background-color: #999 !important;
    border-top: 1px solid #666 !important;
}

#left .ad1 {
    color: #000000;
    font-size: 12px;
    font-weight: bold;
    padding-bottom: 10px;
}

#left a.blacked:link, a.blacked:visited {
    background-color: #333;
    color: #333;
    text-decoration: none;
}

#left a.blacked:hover {
    background-color: #333;
    color: red;
    text-decoration: none;
}

#left .relatedStoriesHeader img {
    border: none;
}

#left .relatedStoriesHeader {
    border-bottom: 1px solid #D4C6C5;
    margin-bottom: 0;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/relatedStoriesHeader.jpg') scroll no-repeat 0 12px;
    height: 20px !important;
    clear: both;
}

#left .relatedStoriesSection {
    padding-bottom: 5px;
}

#left #relatedStoriesList {
    margin-top: 5px;
    margin-left: 0;
    padding-left: 0px;
}

#left #relatedStoriesList li {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/star.png') no-repeat scroll left center;
    list-style-type: none;
    margin:0;
    padding:0 2px 0 16px;
    line-height: 16px;
}

#left .entry #relatedStoriesList li:before {
    content: "" !important;
}

#left .tagsinpost {
    border: 1px solid #D4C6C5;
    border-left: none;
    border-right: none;
    padding: 5px 12px !important;
}

#left .comments_header {
    width: 460px;
    height: 39px;
    margin: 0 10px 20px 10px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -400px -883px;
}

#left .see_all_comments {
    height: auto;
    padding: 10px;
    width: 460px;
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    font-size: 21px;
    font-weight: normal;
    display: none;
}

#left .comments_container {
    width: 460px;
    height: auto;
    padding: 0 10px 0 10px;
}

#left .comment_container {
    width: 100%;
    height: auto;
}

#left div#respond,
#left h3#respond {
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    color: #686765;
    font-size: 16px;
    font-weight: normal;
}

#left h3#respond {
    padding-top: 10px;
    clear: both;
}

#left .commentlist {
    margin: 0;
    padding: 0;
    text-align: left;
}

#left .commentlist li,
#left #commentform input,
#left #commentform textarea {
    font: 11px "Trebuchet MS",Helvetica,Jamrul,sans-serif;
}

#left .commentlist li {
    width: 450px;
    margin: 0;
    padding: 5px;
    list-style: none;
}

#left .commentlist cite,
#left .commentlist cite a {
    font-weight: bold;
    font-style: normal;
    font-size: 1.1em;
}

#left .commentlist p {
    font-weight: normal;
    line-height: 1.5em;
    text-transform: none;
    overflow: hidden;
    width: 450px;
    word-wrap: break-word;
    padding: 0;
    margin: 0;
}

#left #commentform p {
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
}

#left #commentform input {
    width: 170px;
    padding: 2px;
    margin: 5px 5px 1px 0;
}

#left #commentform textarea {
    width: 460px;
    height: 80px;
    margin: 0 auto;
}

#left #commentform #submit {
    padding: 0;
    margin: 0 0 0 0;
    float: right;
}

#left #commentform input.c {
    display: none;
}

#disqus_thread {
    padding: 10px;
}

#left .alt {
    width: 470px;
    background: #fdebeb;
}

#left .even {
    width: 470px;
    background: #fef6f4;
}

#left .alt .comment_number,
#left .even .comment_number {
    float: right;
    margin: 0 10px 0 10px;
}

#left .special_comment {
    width: 455px !important;
    background-color: #ff88cc;
}

#left .special_comment .comment_number {
    float: right;
    margin: 0 5px 0 10px;
}

#left .alt {
    margin: 0;
    padding: 10px;
}

#left #commentform p {
    margin: 5px 0;
}

#left .nocomments {
    text-align: center;
    margin: 0;
    padding: 0;
}

#left .commentmetadata {
    margin: 0;
    display: block;
}

#left h3#comments {
    color: #686765;
    padding:8px 0 10px 0;
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    font-size: 21px;
}

#left .commentlist-alt p {
    width: 410px;
    padding: 0 0 2pt 6pt;
}

#left .comment_mod_container {
    margin-bottom:5px;
    clear:both;
    height:15px;
    width:45px;
    background-image:url('http://i.perezhilton.com/wp-content/themes/default/images/votebg.png');
}

#left .comment_mod_thumbsup {
    float:left;
    cursor:pointer;
    margin:3px 0px 0px 5px;
    border:0;
}

#left .comment_mod_thumbsdown {
    float:left;
    cursor:pointer;
    margin:3px 0px 0px 3px;
    border:0;
}

#left .comment_mod_report {
    float:left;
    cursor:pointer;
    margin:1px 0px 0px 3px;
    border:0;
}

#left .comment_mod_voted {
    float:left;
    margin:0px 0px 0px 0px;
    border:0;
}

#left #comment-loggedin {
    height: 175px;
}

#left div.import_video_thumbnail_container {
    width: 120px;
    height: 90px;
    background: #000000 url('http://i.perezhilton.com/images/blank.gif') no-repeat scroll center center;
    margin: 0 10px 10px 0;
    border: 2px solid #c06;
    position: relative;
    float: left;
}

#left div.import_video_play_perez_videos,
#left div.import_video_play_other_videos {
    top: 0px;
    left: 0px;
    width: 120px;
    height: 90px;
    position: absolute;
    cursor: pointer;
    border: none;
}

#left div.import_video_play_perez_videos {
    background: transparent url('http://i.perezhilton.com/images/transparent_play_button_perez_videos.png') no-repeat scroll center center;
}

#left div.import_video_play_other_videos {
    background: transparent url('http://i.perezhilton.com/images/transparent_play_button_other_videos.png') no-repeat scroll center center;
}

#left .gallerybox_sponsored_tab {
    display: none;
    position: relative;
    cursor: pointer;
    float: right;
    width: auto;
    height: auto;    
}

#left .gallerybox {
    width: 450px;
    height: auto;
    padding: 10px;
    margin: 0 5px 20px 5px;
    display: none;
}

#left .gallerybox .header {
    margin: 0 0 0 5px;
    position: relative;
    cursor: pointer;
}

#left .gallerybox .photobox {
    width: 420px;
    height: auto;
    margin: 10px auto 0 auto;
    padding: 10px 10px 0 10px;
    position: relative;
}

#left .gallerybox .photobox .title {
    width: 370px;
    height: auto;
    float: left;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 16px;
    position: relative;
    text-align: left;
}

#left .gallerybox .photobox .title a:link,
#left .gallerybox .photobox .title a:visited {
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
}

#left .gallerybox .photobox .title a:hover {
    text-decoration: underline;
}

#left .gallerybox .photobox .pages {
    width: 50px;
    height: auto;
    float: right;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 16px;
    position: relative;
    text-align: right;
}

#left .gallerybox .photobox .photo {
    width: 420px;
    height: 360px;
    line-height: 360px;
    text-align: center;
    padding: 10px 0 0 0;
    position: relative;
}

#left .gallerybox .photobox .photo .img {
    width: 420px;
    height: 360px;
    overflow: hidden;
    position: relative;
}

#left .gallerybox .photobox .photo .img img {
    position: absolute;
    top: 0;
    *top: expression((this.parentNode.clientHeight-this.clientHeight)/2+"px");
    left: 0;
    *left: expression((this.parentNode.clientWidth-this.clientWidth)/2+"px");
    bottom: 0;
    right: 0;
    margin: auto;
    max-width: 420px;
    max-height: 360px;
}

*:first-child+html #left .gallerybox .photobox .photo .img img {
    position: relative;
}

#left .gallerybox .photobox .photo .img .video {
    position: absolute;
    top: 0;
    *top: expression((this.parentNode.clientHeight-this.clientHeight)/2+"px");
    left: 0;
    *left: expression((this.parentNode.clientWidth-this.clientWidth)/2+"px");
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 3;
}

#left .gallerybox .photobox .photo .prev {
    top: 80px;
    left: -20px;
    width: 80px;
    height: 200px;
    position: absolute;
    cursor: pointer;
    z-index: 2;

}

#left .gallerybox .photobox .photo .next {
    top: 80px;
    right: -20px;
    width: 80px;
    height: 200px;
    position: absolute;
    cursor: pointer;
    z-index: 2;
}

#left .gallerybox .photobox .photo .prev img,
#left .gallerybox .photobox .photo .next img {
    width: 100%;
    height: 100%;
    border: none;
}

#left .gallerybox .photobox_bottom {
    width: 440px;
    height: 15px;
    margin: 0 auto;
    padding: 0;
    position: relative;
}

#left .gallerybox .data {
    width: 440px;
    height: auto;
    margin: 5px auto;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-size: 11px;
    position: relative;
    color: #000000;
}

#left .gallerybox .data .left {
    width: 160px;
    float: left;
    text-align: left;
    position: relative;
}

#left .gallerybox .data .left .tweet {
    top: 2px;
    left: 0;
    width: 30px;
    height: auto;
    position: absolute;
}

#left .gallerybox .data .left .like {
    top: 0;
    right: 0;
    width: 130px;
    height: auto;
    position: absolute;
}

#left .gallerybox .data .right {
    width: 280px;
    float: right;
    text-align: right;
    padding: 5px 0 0 0;
}

#left .gallerybox .caption {
    width: 331px;
    height: auto;
    margin: 10px auto 0 auto;
    padding: 10px 10px 0 10px;
    position: relative;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-size: 11px;
    position: relative;
}

#left .gallerybox .caption .left {
    width: 100%;
    float: left;
    text-align: left;
}

#left .gallerybox .caption .right {
    width: 30%;
    float: right;
    text-align: right;
    display: none;
}

#rateMeIcon {
    width: 90px;
    height: 20px;
    position: relative;
    margin: 0 auto 5px auto;
}

#rateStatus {
    float:right; 
    clear:both; 
    width:100%; 
    height:auto;
}

#rateMe {
    float:right; 
    clear:both; 
    width: 90px; 
    height:auto; 
    padding: 0; 
    margin: 0;
}

#rateMe li{
    float:left;
    list-style:none;
}

#rateMe li a:hover,
#rateMe .on {
    background:url('http://i.perezhilton.com/galleries/images/star_on.gif') no-repeat;
}

#rateMe a {
    float:left;
    background:url('http://i.perezhilton.com/galleries/images/star_off.gif') no-repeat;
    width:18px; 
    height:16px;
}

#thank_you {
    width: 90px;
    float: right;
    text-align: center;
}

#ratingSaved {
    display:none;
}

#left .gallerybox .caption .right .saved{
    color:red;
}

#left .gallerybox .caption_bottom {
    width: 351px;
    height: 15px;
    margin: 0 auto;
    padding: 0;
    position: relative;
}

#left .pager {
    width: 470px;
    height: auto;
    margin: 0 5px 20px 5px;
    background: transparent;
    color: #c06;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    display: none;
}

#left .pager .prev {
    padding-right: 45px;
}

#left .pager .next {
    padding-left: 45px;
}

#left #perezRecommendsSubpage .box_perez_recommends {
    border-bottom:none; 
    color: #CC0066;
    font-family: "Trebuchet MS",Helvetica,Jamrul,sans-serif;
    line-height: 1.2;
    padding: 10px 10px 0;
    position: relative;
    width: 430px !important; 
}

#left .box_perez_recommends a:link, #left .box_perez_recommends a:visited {
    color: #c06;
    font-size: 16px;
    text-decoration: none;
}

#left .box_perez_recommends a:hover
{
    text-decoration: underline;
}

#left .box_perez_recommends .row {
    margin: 0 0 10px 0;
    padding: 0 0 4px 0;
}

#left #perezRecommendsSubpage .box_perez_recommends .picture{
    width: 90px;
    float: left;
    position: relative;
}

#left .box_perez_recommends .text{
    width: 320px;
    float: left;
}

#left #perezRecommendsSubpage .box_perez_recommends img {
    width: 80px !important; 
    margin: 0 10px 10px 0 !important;
    border: #c06 solid 1px !important;
}

#left .box_perez_recommends .row {
    border-bottom: 1px solid lightgray;
    background: none;
}

#left .fromRecommend {
    text-align: right;	

}

#left .fromRecommend a:link,  #left .fromRecommend a:visited {
    font-style: italic;
    color: #666;
    text-decoration: none;
}

#left .fromRecommend a:hover {
    text-decoration: underline;
}

#left #perezRecommendsSubpage .box_perez_recommends .navigation {	
    height: auto;
    margin: 0 0 10px; 
    position: relative;
    width: 100%;
    border-bottom: none;
}
#left .box_perez_recommends .navigation a:link, #left .box_perez_recommends .navigation a:visited {
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
}

#left .box_perez_recommends .navigation a:hover {
    text-decoration: underline;
}


#left .box_perez_recommends .prev, #left .box_perez_recommends .next  {
    float: left;
    font-weight: bold;
    height: auto;
    text-align: left;
    width: 50%;
}

#left .box_perez_recommends .next {
    float: right;
    text-align: right;
}

/* Social post styles */

.social-entry {
    padding-left: 55px;
    width: 395px;
    word-wrap: break-word;
}

.social-entry p {
    display: inline;
}

#left .post .social-post-image {
    width: 48px !important;
    height: 48px;
    float: left;
    border: none !important;
    margin-top: 2px;
}

#left .post .social-image {
    margin: 4px;
    border: none !important;
}

.social-post-bottom {
    clear: both;
    height: 25px;
}

.social-post-bottom-on-post-page {
    clear: both;
    height: 25px;
    padding-bottom: 10px;
}

.social-content-bottom {
    clear: both;
    padding-top: 4px;
}

.social-post-bottom-twitter-follow {
    float: left;
}

.twitter-follow-button {
    width: 140px !important;
}

.social-post-bottom-container {
    float: right;
}

.social-post-bottom-timedesc {
    float: right;
    color: grey;
    font-size: 9px;
    margin-right: 3px;
    padding-top: 6px;
}

.social-post-bottom-twitter-logo {
    float: right;
    padding-top: 3px;
    width: auto !important;
    border: none !important;
}

.social-post-bottom-facebook-logo {
    float: right;
    padding-top: 0px;
    width: auto !important;
    border: none !important;
}

.social-extra-content-container {
    border: 1px outset #EEE;
    margin: 0 0 5px 5px;
}

#left .post .social-image-thumb {
    text-align: center;
}

/* Twitter styles */

.twitter-follow-button {
    width: 140px !important;
}

.twitter-tweet {margin:0 0 16px 0;}

/* Facebook styles */

.fb-post {margin:0 0 16px 0;}

.facebook-link-container {
    min-height: 100px;
}

.facebook-link-images {
    float: left;
    padding: 7px;
}

#left .post .facebook-link-images img {
    width: 100px !important;
    border: none !important;
}

.facebook-link-info {
    padding-top: 5px;
    padding-right: 4px;
    margin-left: 120px;
}

.facebook-link-title {
    font-size: 11px;
    font-weight: bold;
}

.facebook-link-domain {
    font-size: 11px;
    font-weight: normal;
    color: #666 !important;
    padding: 0 !important;
}

.facebook-link-description {
    font-size: 11px;
    font-weight: normal;
    margin: 8px 0;
}

.facebook-link-bottom {
    clear: both;
}

#left .video_transparent_container,
.pop_up_post .video_transparent_container {
    width: 450px;
    height: 338px;
    background: #000000;
    position: relative;
}

#left .video_transparent_thumbnail,
.pop_up_post .video_transparent_thumbnail {
    top: 0px;
    left: 0px;
    width: 450px;
    height: 314px;
    background: #000000 url('http://i.perezhilton.com/images/blank.gif') no-repeat scroll center center;
    position: absolute;
}

#left .video_transparent_player,
.pop_up_post .video_transparent_player {
    top: 0px;
    left: 0px;
    width: 450px;
    height: 338px;
    position: absolute;
    cursor: pointer;
}

#left .video_transparent_container .perezhilton,
.pop_up_post .video_transparent_container .perezhilton {
    background: transparent url('http://i.perezhilton.com/images/video_player/video_player_450x338_perezhilton.png') no-repeat scroll center center;
}

#left .video_transparent_container .cocoperez,
.pop_up_post .video_transparent_container .cocoperez {
    background: transparent url('http://i.perezhilton.com/images/video_player/video_player_450x338_cocoperez.png') no-repeat scroll center center;
}

#left .video_transparent_container .fitperez,
.pop_up_post .video_transparent_container .fitperez {
    background: transparent url('http://i.perezhilton.com/images/video_player/video_player_450x338_fitperez.png') no-repeat scroll center center;
}

#left .video_transparent_container .teddyhilton,
.pop_up_post .video_transparent_container .teddyhilton {
    background: transparent url('http://i.perezhilton.com/images/video_player/video_player_450x338_teddyhilton.png') no-repeat scroll center center;
}

#left .video_transparent_container .perezitos,
.pop_up_post .video_transparent_container .perezitos {
    background: transparent url('http://i.perezhilton.com/images/video_player/video_player_450x338_perezitos.png') no-repeat scroll center center;
}

/*Storify formatting hack*/
.sfywdgt_footer a img {
    width: auto !important;
    border: none !important;
}

/* Shared Headlines */
.post-shared-headline {
    margin: 0 5px 20px 5px;
    width: 450px;
    height: auto;
    padding: 10px;
    background: #ffffff;
    border-top: #fcdaea solid 1px;
    border-bottom: #d4c6c5 solid 1px;
    line-height: 1.3;
}

.post-shared-headline img {
    width: 80px;
    float: left;
    border: 1px solid #FF11C5;
    margin-right: 12px;
}

.post-shared-headline a.perez-recommends {
    display: block;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/bg32bit-v33_opt.png?v=2') scroll no-repeat -618px -1301px;
    width: 177px;
    height: 24px;
    margin-bottom: 12px;
    text-indent: -1000px;
}

.post-shared-headline a.headline-title {
    font-family: 'Trebuchet MS', sans-serif;
    font-size: 16px;
    color: #c06;
    text-decoration: none;
}

.post-shared-headline a.source {
    font-family: 'Arial', san-serif;
    color: #666666;
    font-size: 12px;
    text-decoration: none;
}

.mp3_audio_player {
    height: 24px !important;
}

#audio_player_counter, #video_tracer {
    top: 0px;
    left: 0px;
    width: 1px;
    height: 1px;
    position: absolute;
}

.centered_box_left {
    padding-left: 65px;
    margin: 13px 5px 0 5px;
    border-top: 1px solid #D4C6C5;
}

.photoBatch {
    margin-bottom: 10px;
}

.photoBatch img {
    border: 1px solid #CC0066;
}

.photoBatch img.act {border-color:#faccce !important;}

/* SHADOWBOX */

#sb-container,#sb-wrapper{text-align:left;}#sb-container,#sb-overlay{position:absolute;top:0;left:0;width:100%;margin:0;padding:0;}#sb-container{height:100%;display:none;visibility:hidden;z-index:10000;}body>#sb-container{position:fixed;}#sb-overlay{height:expression(document.documentElement.clientHeight+'px');}#sb-container>#sb-overlay{height:100%;}#sb-wrapper{position:relative;}#sb-wrapper img{border:none;}#sb-body{position:relative;margin:0;padding:0;overflow:hidden;border:1px solid #303030;}#sb-body-inner{position:relative;height:100%;}#sb-content.html{height:100%;overflow:auto;}#sb-loading{position:absolute;top:0;width:100%;height:100%;text-align:center;padding-top:10px;}#sb-body,#sb-loading{background-color:#060606;}#sb-title,#sb-info{position:relative;margin:0;padding:0;overflow:hidden;}#sb-title-inner,#sb-info-inner{position:relative;font-family:'Lucida Grande',Tahoma,sans-serif;line-height:16px;}#sb-title,#sb-title-inner{height:auto !important;}#sb-title-inner{font-size:16px;padding:5px 0;color:#fff;}#sb-info,#sb-info-inner{height:20px;}#sb-info-inner{font-size:12px;color:#fff;}#sb-nav{float:right;height:16px;padding:2px 0;width:45%;}#sb-nav a{display:block;float:right;height:16px;width:16px;margin-left:3px;cursor:pointer;}#sb-nav-close{background-image:url('http://i.perezhilton.com/js/shadowbox/resources/close.png');background-repeat:no-repeat;}#sb-nav-next{background-image:url('http://i.perezhilton.com/js/shadowbox/resources/next.png');background-repeat:no-repeat;}#sb-nav-previous{background-image:url('http://i.perezhilton.com/js/shadowbox/resources/previous.png');background-repeat:no-repeat;}#sb-nav-play{background-image:url('http://i.perezhilton.com/js/shadowbox/resources/play.png');background-repeat:no-repeat;}#sb-nav-pause{background-image:url('http://i.perezhilton.com/js/shadowbox/resources/pause.png');background-repeat:no-repeat;}#sb-counter{float:left;padding:2px 0;width:45%;}#sb-counter a{padding:0 4px 0 0;text-decoration:none;cursor:pointer;color:#fff;}#sb-counter a.sb-counter-current{text-decoration:underline;}div.sb-message{font-family:'Lucida Grande',Tahoma,sans-serif;font-size:12px;padding:10px;text-align:center;}div.sb-message a:link,div.sb-message a:visited{color:#fff;text-decoration:underline;}div#sb-nav-previous-arrow,div#sb-nav-next-arrow{position:absolute;cursor:pointer;z-index:10000;}a#sb-nav-previous-arrow-link:link,a#sb-nav-previous-arrow-link:visited {background: transparent url('http://i.perezhilton.com/services/galleries/images/prev.png') scroll no-repeat left center;width:100%;height:100%;text-indent:-9000px;display:block;z-index:10000;color:transparent;}a#sb-nav-next-arrow-link:link,a#sb-nav-next-arrow-link:visited {background: transparent url('http://i.perezhilton.com/services/galleries/images/next.png') scroll no-repeat right center;width:100%;height:100%;text-indent:-9000px;display:block;z-index:10000;color:transparent;}a#sb-nav-previous-arrow-link:hover {background: transparent url('http://i.perezhilton.com/services/galleries/images/prev.png') scroll no-repeat left center;color:transparent;}a#sb-nav-next-arrow-link:hover {background: transparent url('http://i.perezhilton.com/services/galleries/images/next.png') scroll no-repeat right center;color:transparent;}

/* /SHADOBOX */

/* BLOGADS FEED CSS */
div#adspot_262323523.adspot {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:335px;
    font-size:10pt;
}
div#adspot_262323523 .adspot_head {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_262323523 a.adspot_link , div#adspot_262323523 a.adspot_adurl {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#cc0066;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_262323523 a.adspot_link:link, div#adspot_262323523 a.adspot_link:visited, div#adspot_262323523 a.adspot_adurl:link, div#adspot_262323523 a.adspot_adurl:visited {
    color:#cc0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_262323523 a.adspot_link:active, div#adspot_262323523 a.adspot_link:hover, div#adspot_262323523 a.adspot_adurl:active, div#adspot_262323523 a.adspot_adurl:hover {
    color:#cc0066;
    text-decoration:none;
}
div#adspot_262323523 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_262323523 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_262323523 span.blogad_rss_ad ul {
    max-height: 200px;
    overflow: auto;
    width: auto;
}
div#adspot_262323523 span.blogad_rss_ad li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_262323523 span.blogad_rss_ad a:link {
    color: #3366ff;
}
div#adspot_262323523 span.blogad_rss_ad a:visited {
    color: #1e3d99;
}
div#adspot_262323523 .adspot_adhead {
    text-align:center;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
}
div#adspot_262323523 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_262323523 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_262323523 .adspot_adtext {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    padding:4px 4px 0 4px;
    border-spacing:0;
    display:block;
    clear:both;
    width:154px;
    text-align:center;
}
div#adspot_262323523 div.adspot_link {
    width:160px !important;
    text-align:center;
    padding: 0 4px 4px 4px;
}
div#adspot_262323523 div.adspot_adurl {
    text-align:center;
    padding: 4px;
}

div#adspot_262323523 div.tweet_button_container input{
    background: url("http://i.blogads.com/static/tweet_button/blogads-tweet-this-button.png") no-repeat scroll center center transparent;
    border: medium none;
    color: #676767 !important;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: bold;
    height: 36px;
    width: 150px;
    text-align: center !important;
    cursor:pointer;
}
div#adspot_262323523 div.tweet_button_container{
    text-align:center;
}
div#adspot_262323523 div.adspot_ad {
    background:#FFFFFF;
    text-align: center;
    vertical-align: middle;
    width: 160px;
    margin: 0px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    margin-left: 5px;
    margin-top: 5px;
}

div#adspot_262323523 div.column_container {
    float: left;
}

div#adspot_262323523 div.adspot_link {
    clear:both;
    width:100% !important;
    text-align:center !important;
}

div#adspot_262323523 div.adspot_ad img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}

div#adspot_262323523.adspot_classic_adverpost {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:160px !important;
    font-size:10pt;
}
div#adspot_262323523 .adspot_head_classic_adverpost {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_262323523 a.adspot_link_classic_adverpost , div#adspot_262323523 a.adspot_adurl_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#cc0066;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_262323523 a.adspot_link_classic_adverpost:link, div#adspot_262323523 a.adspot_link_classic_adverpost:visited, div#adspot_262323523 a.adspot_adurl_classic_adverpost:link, div#adspot_262323523 a.adspot_adurl_classic_adverpost:visited {
    color:#cc0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_262323523 a.adspot_link_classic_adverpost:active, div#adspot_262323523 a.adspot_link_classic_adverpost:hover, div#adspot_262323523 a.adspot_adurl_classic_adverpost:active, div#adspot_262323523 a.adspot_adurl_classic_adverpost:hover {
    color:#cc0066;
    text-decoration:none;
}
div#adspot_262323523 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_262323523 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_262323523 span.blogad_rss_ad_adverpost ul {
    max-height: 400px;
    overflow: auto;
    width: auto;
}
div#adspot_262323523 span.blogad_rss_ad_adverpost li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_262323523 span.blogad_rss_ad_adverpost a:link {
    color: #3366ff;
}
div#adspot_262323523 span.blogad_rss_ad_adverpost a:visited {
    color: #1e3d99;
}
div#adspot_262323523 .adspot_adhead_classic_adverpost {
    text-align:center;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
    clear:both;
}
div#adspot_262323523 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_262323523 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_262323523 .adspot_adtext_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    border-spacing:0;
    text-align:center;
}
div#adspot_262323523 div.adspot_link_classic_adverpost {
    width:160px !important;
    text-align:center;
}
div#adspot_262323523 div.adspot_adurl_classic_adverpost {
    text-align:center;
}
div#adspot_262323523 div.adspot_img_classic_adverpost {
    padding-top: 5px;
    float:left;
    width:auto;
}
div#adspot_262323523 div.adspot_img_large_adverpost {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
    padding-top: 5px;
    padding-bottom:5px;
}
div#adspot_262323523 div.adspot_main_ad_classic_adverpost {
    padding-right: 5px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_262323523 div.adspot_ad_large_adverpost {
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_262323523 div.adspot_ad_classic_adverpost {
    float: left;
    text-align: left;
    vertical-align: middle;
    width: 160px;
    height: 160px;
}

div#adspot_262323523 div.adspot_link_classic_adverpost {
    clear:both;
}

div#adspot_262323523 div.adspot_ad_classic_adverpost img {
    padding: 5px
}

/******************************************************************************************/

div#adspot_992051096.adspot {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:1px;
    border-style:solid;
    width:162px;
    font-size:10pt;
}
div#adspot_992051096 .adspot_head {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:left;
}
div#adspot_992051096 a.adspot_link , div#adspot_992051096 a.adspot_adurl {
    font-family:Arial;
    font-size:8pt;
    font-style:italic;
    color:#AA0000;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:left;
    background-image: none;
}
div#adspot_992051096 a.adspot_link:link, div#adspot_992051096 a.adspot_link:visited, div#adspot_992051096 a.adspot_adurl:link, div#adspot_992051096 a.adspot_adurl:visited {
    color:#AA0000;
    text-decoration:underline;
    font-size:8pt;
    font-style:italic;
}
div#adspot_992051096 a.adspot_link:active, div#adspot_992051096 a.adspot_link:hover, div#adspot_992051096 a.adspot_adurl:active, div#adspot_992051096 a.adspot_adurl:hover {
    color:#AA0000;
    text-decoration:none;
}
div#adspot_992051096 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:162px;
    margin:0;
    padding:0;
}
div#adspot_992051096 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:left;
    border-color:#BBBBBB;
    border-width:1px;
    border-style:solid;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_992051096 span.blogad_rss_ad ul {
    max-height: 200px;
    overflow: auto;
    width: auto;
}
div#adspot_992051096 span.blogad_rss_ad li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_992051096 span.blogad_rss_ad a:link {
    color: #3366ff;
}
div#adspot_992051096 span.blogad_rss_ad a:visited {
    color: #1e3d99;
}
div#adspot_992051096 .adspot_adhead {
    text-align:left;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
}
div#adspot_992051096 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_992051096 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_992051096 .adspot_adtext {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    padding:4px 4px 0 4px;
    border-spacing:0;
    display:block;
    clear:both;
    width:154px;
    text-align:left;
}
div#adspot_992051096 div.adspot_link {
    width:162px !important;
    text-align:left;
    padding: 0 4px 4px 4px;
}
div#adspot_992051096 div.adspot_adurl {
    text-align:left;
    padding: 4px;
}

div#adspot_992051096 div.tweet_button_container input{
    background: url("http://i.blogads.com/static/tweet_button/blogads-tweet-this-button.png") no-repeat scroll center center transparent;
    border: medium none;
    color: #676767 !important;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: bold;
    height: 36px;
    width: 150px;
    text-align: center !important;
    cursor:pointer;
}
div#adspot_992051096 div.tweet_button_container{
    text-align:center;
}
div#adspot_992051096 div.adspot_ad {
    background:#FFFFFF;
    text-align: left;
    vertical-align: middle;
    width: 160px;
    margin: 0px;
    border-color:#BBBBBB;
    border-width:1px;
    border-style:solid;
    border-spacing:0;
    margin-left: 5px;
    margin-top: 5px;
}

div#adspot_992051096 div.column_container {
    float: left;
}

div#adspot_992051096 div.adspot_link {
    clear:both;
    width:100% !important;
    text-align:center !important;
}

div#adspot_992051096 div.adspot_ad img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}

div#adspot_992051096.adspot_classic_adverpost {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:1px;
    border-style:solid;
    width:162px !important;
    font-size:10pt;
}
div#adspot_992051096 .adspot_head_classic_adverpost {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:left;
}
div#adspot_992051096 a.adspot_link_classic_adverpost , div#adspot_992051096 a.adspot_adurl_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:italic;
    color:#AA0000;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:left;
    background-image: none;
}
div#adspot_992051096 a.adspot_link_classic_adverpost:link, div#adspot_992051096 a.adspot_link_classic_adverpost:visited, div#adspot_992051096 a.adspot_adurl_classic_adverpost:link, div#adspot_992051096 a.adspot_adurl_classic_adverpost:visited {
    color:#AA0000;
    text-decoration:underline;
    font-size:8pt;
    font-style:italic;
}
div#adspot_992051096 a.adspot_link_classic_adverpost:active, div#adspot_992051096 a.adspot_link_classic_adverpost:hover, div#adspot_992051096 a.adspot_adurl_classic_adverpost:active, div#adspot_992051096 a.adspot_adurl_classic_adverpost:hover {
    color:#AA0000;
    text-decoration:none;
}
div#adspot_992051096 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:162px;
    margin:0;
    padding:0;
}
div#adspot_992051096 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:left;
    border-color:#BBBBBB;
    border-width:1px;
    border-style:solid;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_992051096 span.blogad_rss_ad_adverpost ul {
    max-height: 400px;
    overflow: auto;
    width: auto;
}
div#adspot_992051096 span.blogad_rss_ad_adverpost li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_992051096 span.blogad_rss_ad_adverpost a:link {
    color: #3366ff;
}
div#adspot_992051096 span.blogad_rss_ad_adverpost a:visited {
    color: #1e3d99;
}
div#adspot_992051096 .adspot_adhead_classic_adverpost {
    text-align:left;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
    clear:both;
}
div#adspot_992051096 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_992051096 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_992051096 .adspot_adtext_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    border-spacing:0;
    text-align:left;
}
div#adspot_992051096 div.adspot_link_classic_adverpost {
    width:162px !important;
    text-align:left;
}
div#adspot_992051096 div.adspot_adurl_classic_adverpost {
    text-align:left;
}
div#adspot_992051096 div.adspot_img_classic_adverpost {
    padding-top: 5px;
    float:left;
    width:auto;
}
div#adspot_992051096 div.adspot_img_large_adverpost {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
    padding-top: 5px;
    padding-bottom:5px;
}
div#adspot_992051096 div.adspot_main_ad_classic_adverpost {
    padding-right: 5px;
    border-color:#BBBBBB;
    border-width:1px;
    border-style:solid;
}
div#adspot_992051096 div.adspot_ad_large_adverpost {
    border-color:#BBBBBB;
    border-width:1px;
    border-style:solid;
}
div#adspot_992051096 div.adspot_ad_classic_adverpost {
    float: left;
    text-align: center;
    vertical-align: middle;
    width: 160px;
    height: 160px;
}

div#adspot_992051096 div.adspot_link_classic_adverpost {
    clear:both;
}

div#adspot_992051096 div.adspot_ad_classic_adverpost img {
    padding: 5px
}

/******************************************************************************************/

div#adspot_262323521.adspot {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:335px;
    font-size:10pt;
}
div#adspot_262323521 .adspot_head {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_262323521 a.adspot_link , div#adspot_262323521 a.adspot_adurl {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#cc0066;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_262323521 a.adspot_link:link, div#adspot_262323521 a.adspot_link:visited, div#adspot_262323521 a.adspot_adurl:link, div#adspot_262323521 a.adspot_adurl:visited {
    color:#cc0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_262323521 a.adspot_link:active, div#adspot_262323521 a.adspot_link:hover, div#adspot_262323521 a.adspot_adurl:active, div#adspot_262323521 a.adspot_adurl:hover {
    color:#cc0066;
    text-decoration:none;
}
div#adspot_262323521 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_262323521 * li {
    background:#ffffff;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_262323521 span.blogad_rss_ad ul {
    max-height: 200px;
    overflow: auto;
    width: auto;
}
div#adspot_262323521 span.blogad_rss_ad li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_262323521 span.blogad_rss_ad a:link {
    color: #3366ff;
}
div#adspot_262323521 span.blogad_rss_ad a:visited {
    color: #1e3d99;
}
div#adspot_262323521 .adspot_adhead {
    text-align:center;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
}
div#adspot_262323521 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_262323521 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_262323521 .adspot_adtext {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    padding:4px 4px 0 4px;
    border-spacing:0;
    display:block;
    clear:both;
    width:154px;
    text-align:center;
}
div#adspot_262323521 div.adspot_link {
    width:160px !important;
    text-align:center;
    padding: 0 4px 4px 4px;
}
div#adspot_262323521 div.adspot_adurl {
    text-align:center;
    padding: 4px;
}

div#adspot_262323521 div.tweet_button_container input{
    background: url("http://i.blogads.com/static/tweet_button/blogads-tweet-this-button.png") no-repeat scroll center center transparent;
    border: medium none;
    color: #676767 !important;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: bold;
    height: 36px;
    width: 150px;
    text-align: center !important;
    cursor:pointer;
}
div#adspot_262323521 div.tweet_button_container{
    text-align:center;
}
div#adspot_262323521 div.adspot_ad {
    background:#ffffff;
    text-align: center;
    vertical-align: middle;
    width: 160px;
    margin: 0px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    margin-left: 5px;
    margin-top: 5px;
}

div#adspot_262323521 div.column_container {
    float: left;
}

div#adspot_262323521 div.adspot_link {
    clear:both;
    width:100% !important;
    text-align:center !important;
}

div#adspot_262323521 div.adspot_ad img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}

div#adspot_262323521.adspot_classic_adverpost {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:335px;
    font-size:10pt;
}
div#adspot_262323521 .adspot_head_classic_adverpost {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_262323521 a.adspot_link_classic_adverpost , div#adspot_262323521 a.adspot_adurl_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#cc0066;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_262323521 a.adspot_link_classic_adverpost:link, div#adspot_262323521 a.adspot_link_classic_adverpost:visited, div#adspot_262323521 a.adspot_adurl_classic_adverpost:link, div#adspot_262323521 a.adspot_adurl_classic_adverpost:visited {
    color:#cc0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_262323521 a.adspot_link_classic_adverpost:active, div#adspot_262323521 a.adspot_link_classic_adverpost:hover, div#adspot_262323521 a.adspot_adurl_classic_adverpost:active, div#adspot_262323521 a.adspot_adurl_classic_adverpost:hover {
    color:#cc0066;
    text-decoration:none;
}
div#adspot_262323521 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_262323521 * li {
    background:#ffffff;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_262323521 span.blogad_rss_ad_adverpost ul {
    max-height: 400px;
    overflow: auto;
    width: auto;
}
div#adspot_262323521 span.blogad_rss_ad_adverpost li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_262323521 span.blogad_rss_ad_adverpost a:link {
    color: #3366ff;
}
div#adspot_262323521 span.blogad_rss_ad_adverpost a:visited {
    color: #1e3d99;
}
div#adspot_262323521 .adspot_adhead_classic_adverpost {
    text-align:center;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
    clear:both;
}
div#adspot_262323521 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_262323521 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_262323521 .adspot_adtext_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    border-spacing:0;
    text-align:center;
}
div#adspot_262323521 div.adspot_link_classic_adverpost {
    width:160px !important;
    text-align:center;
}
div#adspot_262323521 div.adspot_adurl_classic_adverpost {
    text-align:center;
}
div#adspot_262323521 div.adspot_img_classic_adverpost {
    padding-top: 5px;
    float:left;
    width:auto;
}
div#adspot_262323521 div.adspot_img_large_adverpost {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
    padding-top: 5px;
    padding-bottom:5px;
}
div#adspot_262323521 div.adspot_main_ad_classic_adverpost {
    padding-right: 5px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_262323521 div.adspot_ad_large_adverpost {
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_262323521 div.adspot_ad_classic_adverpost {
    float: left;
    text-align: left;
    vertical-align: middle;
    width: 160px;
    height: 160px;
}

div#adspot_262323521 div.adspot_link_classic_adverpost {
    clear:both;
}

div#adspot_262323521 div.adspot_ad_classic_adverpost img {
    padding: 5px
}

/******************************************************************************************/

div#adspot_385879929.adspot {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:170px;
    font-size:10pt;
}
div#adspot_385879929 .adspot_head {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_385879929 a.adspot_link , div#adspot_385879929 a.adspot_adurl {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#cc0066;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_385879929 a.adspot_link:link, div#adspot_385879929 a.adspot_link:visited, div#adspot_385879929 a.adspot_adurl:link, div#adspot_385879929 a.adspot_adurl:visited {
    color:#cc0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_385879929 a.adspot_link:active, div#adspot_385879929 a.adspot_link:hover, div#adspot_385879929 a.adspot_adurl:active, div#adspot_385879929 a.adspot_adurl:hover {
    color:#cc0066;
    text-decoration:none;
}
div#adspot_385879929 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_385879929 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_385879929 span.blogad_rss_ad ul {
    max-height: 200px;
    overflow: auto;
    width: auto;
}
div#adspot_385879929 span.blogad_rss_ad li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_385879929 span.blogad_rss_ad a:link {
    color: #3366ff;
}
div#adspot_385879929 span.blogad_rss_ad a:visited {
    color: #1e3d99;
}
div#adspot_385879929 .adspot_adhead {
    text-align:center;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
}
div#adspot_385879929 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_385879929 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_385879929 .adspot_adtext {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    padding:4px 4px 0 4px;
    border-spacing:0;
    display:block;
    clear:both;
    width:154px;
    text-align:center;
}
div#adspot_385879929 div.adspot_link {
    width:160px !important;
    text-align:center;
    padding: 0 4px 4px 4px;
}
div#adspot_385879929 div.adspot_adurl {
    text-align:center;
    padding: 4px;
}

div#adspot_385879929 div.tweet_button_container input{
    background: url("http://i.blogads.com/static/tweet_button/blogads-tweet-this-button.png") no-repeat scroll center center transparent;
    border: medium none;
    color: #676767 !important;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: bold;
    height: 36px;
    width: 150px;
    text-align: center !important;
    cursor:pointer;
}
div#adspot_385879929 div.tweet_button_container{
    text-align:center;
}
div#adspot_385879929 div.adspot_ad {
    background:#FFFFFF;
    text-align: center;
    vertical-align: middle;
    width: 160px;
    margin: 0px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    margin-left: 5px;
    margin-top: 5px;
}

div#adspot_385879929 div.column_container {
    float: left;
}

div#adspot_385879929 div.adspot_link {
    clear:both;
    width:100% !important;
    text-align:center !important;
}

div#adspot_385879929 div.adspot_ad img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}

div#adspot_385879929.adspot_classic_adverpost {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:170px !important;
    font-size:10pt;
}
div#adspot_385879929 .adspot_head_classic_adverpost {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_385879929 a.adspot_link_classic_adverpost , div#adspot_385879929 a.adspot_adurl_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#cc0066;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_385879929 a.adspot_link_classic_adverpost:link, div#adspot_385879929 a.adspot_link_classic_adverpost:visited, div#adspot_385879929 a.adspot_adurl_classic_adverpost:link, div#adspot_385879929 a.adspot_adurl_classic_adverpost:visited {
    color:#cc0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_385879929 a.adspot_link_classic_adverpost:active, div#adspot_385879929 a.adspot_link_classic_adverpost:hover, div#adspot_385879929 a.adspot_adurl_classic_adverpost:active, div#adspot_385879929 a.adspot_adurl_classic_adverpost:hover {
    color:#cc0066;
    text-decoration:none;
}
div#adspot_385879929 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_385879929 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_385879929 span.blogad_rss_ad_adverpost ul {
    max-height: 400px;
    overflow: auto;
    width: auto;
}
div#adspot_385879929 span.blogad_rss_ad_adverpost li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_385879929 span.blogad_rss_ad_adverpost a:link {
    color: #3366ff;
}
div#adspot_385879929 span.blogad_rss_ad_adverpost a:visited {
    color: #1e3d99;
}
div#adspot_385879929 .adspot_adhead_classic_adverpost {
    text-align:center;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
    clear:both;
}
div#adspot_385879929 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_385879929 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_385879929 .adspot_adtext_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    border-spacing:0;
    text-align:center;
}
div#adspot_385879929 div.adspot_link_classic_adverpost {
    width:160px !important;
    text-align:center;
}
div#adspot_385879929 div.adspot_adurl_classic_adverpost {
    text-align:center;
}
div#adspot_385879929 div.adspot_img_classic_adverpost {
    padding-top: 5px;
    float:left;
    width:auto;
}
div#adspot_385879929 div.adspot_img_large_adverpost {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
    padding-top: 5px;
    padding-bottom:5px;
}
div#adspot_385879929 div.adspot_main_ad_classic_adverpost {
    padding-right: 5px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_385879929 div.adspot_ad_large_adverpost {
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_385879929 div.adspot_ad_classic_adverpost {
    float: left;
    text-align: left;
    vertical-align: middle;
    width: 160px;
    height: 160px;
}

div#adspot_385879929 div.adspot_link_classic_adverpost {
    clear:both;
}

div#adspot_385879929 div.adspot_ad_classic_adverpost img {
    padding: 5px
}


div#adspot_807278427.adspot {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:335px;
    font-size:10pt;
}
div#adspot_807278427 .adspot_head {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:left;
}
div#adspot_807278427 a.adspot_link {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#CC0066;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_807278427 a.adspot_link:link, div#adspot_807278427 a.adspot_link:visited {
    color:#CC0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_807278427 a.adspot_link:active, div#adspot_807278427 a.adspot_link:hover {
    color:#CC0066;
    text-decoration:none;
}
div#adspot_807278427 a.adspot_adurl {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#CC0066;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_807278427 a.adspot_adurl:link, div#adspot_807278427 a.adspot_adurl:visited {
    color:#CC0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_807278427 a.adspot_adurl:active, div#adspot_807278427 a.adspot_adurl:hover {
    color:#CC0066;
    text-decoration:none;
}
div#adspot_807278427 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_807278427 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;

    border-bottom-color:false;
    border-bottom-style:none;

    border-bottom-width:0px;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_807278427 span.blogad_rss_ad ul {
    max-height: 200px;
    overflow: auto;
    width: auto;
}
div#adspot_807278427 span.blogad_rss_ad li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_807278427 span.blogad_rss_ad a:link {
    color: #3366ff;
}
div#adspot_807278427 span.blogad_rss_ad a:visited {
    color: #1e3d99;
}
div#adspot_807278427 .adspot_adhead {
    text-align:left;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
}
div#adspot_807278427 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_807278427 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_807278427 .adspot_adtext {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    padding:4px 4px 0 4px;
    border-spacing:0;
    display:block;
    clear:both;
    width:154px;
    text-align:center;
}
div#adspot_807278427 div.adspot_link {
    width:160px !important;
    text-align:center;
    padding: 0 4px 4px 4px;
}
div#adspot_807278427 div.adspot_adurl {
    text-align:center;
    padding: 4px;
}

div#adspot_807278427 div.tweet_button_container input{
    background: url("http://i.blogads.com/static/tweet_button/blogads-tweet-this-button.png") no-repeat scroll center center transparent;
    border: medium none;
    color: #676767 !important;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: bold;
    height: 36px;
    width: 150px;
    text-align: center !important;
    cursor:pointer;
}
div#adspot_807278427 div.tweet_button_container{
    text-align:center;
}
div#adspot_807278427 div.adspot_ad {
    background:#FFFFFF;
    text-align:center;
    text-align: middle;
    vertical-align: middle;
    width: 160px;
    margin: 0px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;

    border-bottom-color:false;
    border-bottom-style:none;

    border-bottom-width:0px;
    border-spacing:0;
    margin-left: 5px;
    margin-top: 5px;
}

div#adspot_807278427 div.column_container {
    float: left;
}

div#adspot_807278427 div.adspot_link {
    clear:both;
    width:100% !important;
    text-align:center !important;
}

div#adspot_807278427 div.adspot_ad img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}

div#adspot_807278427.adspot_classic_adverpost {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:335px;
    font-size:10pt;
}
div#adspot_807278427 .adspot_head_classic_adverpost {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:left;
}
div#adspot_807278427 a.adspot_link_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#CC0066;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}

div#adspot_807278427 a.adspot_adurl_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#CC0066;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}

div#adspot_807278427 a.adspot_link_classic_adverpost:link, div#adspot_807278427 a.adspot_link_classic_adverpost:visited {
    color:#CC0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_807278427 a.adspot_link_classic_adverpost:active, div#adspot_807278427 a.adspot_link_classic_adverpost:hover {
    color:#CC0066;
    text-decoration:none;
}

div#adspot_807278427 a.adspot_adurl_classic_adverpost:link, div#adspot_807278427 a.adspot_adurl_classic_adverpost:visited {
    color:#CC0066;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_807278427 a.adspot_adurl_classic_adverpost:active, div#adspot_807278427 a.adspot_adurl_classic_adverpost:hover {
    color:#CC0066;
    text-decoration:none;
}
div#adspot_807278427 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_807278427 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;

    border-bottom-color:false;
    border-bottom-style:none;

    border-bottom-width:0px;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_807278427 span.blogad_rss_ad_adverpost ul {
    max-height: 400px;
    overflow: auto;
    width: auto;
}
div#adspot_807278427 span.blogad_rss_ad_adverpost li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_807278427 span.blogad_rss_ad_adverpost a:link {
    color: #3366ff;
}
div#adspot_807278427 span.blogad_rss_ad_adverpost a:visited {
    color: #1e3d99;
}
div#adspot_807278427 .adspot_adhead_classic_adverpost {
    text-align:left;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
    clear:both;
}
div#adspot_807278427 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_807278427 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_807278427 .adspot_adtext_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    border-spacing:0;
    text-align:center;
}
div#adspot_807278427 div.adspot_link_classic_adverpost {
    width:160px !important;
    text-align:center;
}
div#adspot_807278427 div.adspot_adurl_classic_adverpost {
    text-align:center;
}
div#adspot_807278427 div.adspot_img_classic_adverpost {
    padding-top: 5px;
    float:left;
    width:auto;
}
div#adspot_807278427 div.adspot_img_large_adverpost {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
    padding-top: 5px;
    padding-bottom:5px;
}
div#adspot_807278427 div.adspot_main_ad_classic_adverpost {
    padding-right: 5px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_807278427 div.adspot_ad_large_adverpost {
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_807278427 div.adspot_ad_classic_adverpost {
    float: left;
    text-align: middle;
    vertical-align: middle;
    width: 160px;
    height: 160px;
}

div#adspot_807278427 div.adspot_link_classic_adverpost {
    clear:both;
}

div#adspot_807278427 div.adspot_ad_classic_adverpost img {
    padding: 5px
}
div#adspot_807278427 .adspot_adtext {
    padding: 0 !important;
}

div#adspot_353668437.adspot {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:160px;
    font-size:10pt;
}
div#adspot_353668437 .adspot_head {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_353668437 a.adspot_link {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#a97cbd;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_353668437 a.adspot_link:link, div#adspot_353668437 a.adspot_link:visited {
    color:#a97cbd;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_353668437 a.adspot_link:active, div#adspot_353668437 a.adspot_link:hover {
    color:#a97cbd;
    text-decoration:none;
}
div#adspot_353668437 a.adspot_adurl {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#a97cbd;
    font-weight:normal;
    margin:0;
    padding:0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}
div#adspot_353668437 a.adspot_adurl:link, div#adspot_353668437 a.adspot_adurl:visited {
    color:#a97cbd;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_353668437 a.adspot_adurl:active, div#adspot_353668437 a.adspot_adurl:hover {
    color:#a97cbd;
    text-decoration:none;
}
div#adspot_353668437 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_353668437 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;

    border-bottom-color:false;
    border-bottom-style:none;

    border-bottom-width:0px;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_353668437 span.blogad_rss_ad ul {
    max-height: 200px;
    overflow: auto;
    width: auto;
}
div#adspot_353668437 span.blogad_rss_ad li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_353668437 span.blogad_rss_ad a:link {
    color: #3366ff;
}
div#adspot_353668437 span.blogad_rss_ad a:visited {
    color: #1e3d99;
}
div#adspot_353668437 .adspot_adhead {
    text-align:left;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
}
div#adspot_353668437 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_353668437 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_353668437 .adspot_adtext {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    padding:4px 4px 0 4px;
    border-spacing:0;
    display:block;
    clear:both;
    width:154px;
    text-align:center;
}
div#adspot_353668437 div.adspot_link {
    width:160px !important;
    text-align:center;
    padding: 0 4px 4px 4px;
}
div#adspot_353668437 div.adspot_adurl {
    text-align:center;
    padding: 4px;
}

div#adspot_353668437 div.tweet_button_container input{
    background: url("http://i.blogads.com/static/tweet_button/blogads-tweet-this-button.png") no-repeat scroll center center transparent;
    border: medium none;
    color: #676767 !important;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: bold;
    height: 36px;
    width: 150px;
    text-align: center !important;
    cursor:pointer;
}
div#adspot_353668437 div.tweet_button_container{
    text-align:center;
}
div#adspot_353668437 div.adspot_ad {
    background:#FFFFFF;
    text-align:center;
    text-align: middle;
    vertical-align: middle;
    width: 160px;
    margin: 0px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;

    border-bottom-color:false;
    border-bottom-style:none;

    border-bottom-width:0px;
    border-spacing:0;
    margin-left: 5px;
    margin-top: 5px;
}

div#adspot_353668437 div.column_container {
    float: left;
}

div#adspot_353668437 div.adspot_link {
    clear:both;
    width:100% !important;
    text-align:center !important;
}

div#adspot_353668437 div.adspot_ad img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}

div#adspot_353668437.adspot_classic_adverpost {
    border-spacing:0;
    overflow:hidden;
    background-color:transparent;
    border-color:#000000;
    border-width:0px;
    border-style:none;
    width:160px !important;
    font-size:10pt;
}
div#adspot_353668437 .adspot_head_classic_adverpost {
    font-family:Arial;
    font-size:10pt;
    color:#000000;
    font-weight:bold;
    font-style:normal;
    text-decoration:none;
    text-align:center;
}
div#adspot_353668437 a.adspot_link_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#a97cbd;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}

div#adspot_353668437 a.adspot_adurl_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-style:normal;
    color:#a97cbd;
    font-weight:normal;
    margin:0;
    padding:0 5px 0 0;
    display: inline;
    text-decoration:underline;
    text-align:center;
    background-image: none;
}

div#adspot_353668437 a.adspot_link_classic_adverpost:link, div#adspot_353668437 a.adspot_link_classic_adverpost:visited {
    color:#a97cbd;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_353668437 a.adspot_link_classic_adverpost:active, div#adspot_353668437 a.adspot_link_classic_adverpost:hover {
    color:#a97cbd;
    text-decoration:none;
}

div#adspot_353668437 a.adspot_adurl_classic_adverpost:link, div#adspot_353668437 a.adspot_adurl_classic_adverpost:visited {
    color:#a97cbd;
    text-decoration:underline;
    font-size:8pt;
    font-style:normal;
}
div#adspot_353668437 a.adspot_adurl_classic_adverpost:active, div#adspot_353668437 a.adspot_adurl_classic_adverpost:hover {
    color:#a97cbd;
    text-decoration:none;
}
div#adspot_353668437 * ul {
    list-style-position:outside;
    list-style-image:none;
    list-style-type:none;
    width:160px;
    margin:0;
    padding:0;
}
div#adspot_353668437 * li {
    background:#FFFFFF;
    width:160px;
    margin:0;
    margin-bottom:5px;
    padding:0;
    text-align:center;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;

    border-bottom-color:false;
    border-bottom-style:none;

    border-bottom-width:0px;
    border-spacing:0;
    display:block;
    text-indent:0;
    overflow:hidden;
    line-height: 12px;
}
div#adspot_353668437 span.blogad_rss_ad_adverpost ul {
    max-height: 400px;
    overflow: auto;
    width: auto;
}
div#adspot_353668437 span.blogad_rss_ad_adverpost li {
    border-width: 0;
    border-bottom: 1px dotted #606060;
    padding-bottom: 5px;
    width: auto;
    margin-right: 2px;
}
div#adspot_353668437 span.blogad_rss_ad_adverpost a:link {
    color: #3366ff;
}
div#adspot_353668437 span.blogad_rss_ad_adverpost a:visited {
    color: #1e3d99;
}
div#adspot_353668437 .adspot_adhead_classic_adverpost {
    text-align:left;
    font-family:Arial;
    font-size:10pt;
    font-weight:bold;
    color:#000000;
    margin:0;
    padding:2px;
    border-spacing:0;
    width:160px;
    display:block;
    clear:both;
}
div#adspot_353668437 * img {
    border-width:0;
    border-spacing:0;
}
div#adspot_353668437 * li * img {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
}
div#adspot_353668437 .adspot_adtext_classic_adverpost {
    font-family:Arial;
    font-size:8pt;
    font-weight:normal;
    font-style:normal;
    color:#000000;
    margin:0;
    border-spacing:0;
    text-align:center;
}
div#adspot_353668437 div.adspot_link_classic_adverpost {
    width:160px !important;
    text-align:center;
}
div#adspot_353668437 div.adspot_adurl_classic_adverpost {
    text-align:center;
}
div#adspot_353668437 div.adspot_img_classic_adverpost {
    padding-top: 5px;
    float:left;
    width:auto;
}
div#adspot_353668437 div.adspot_img_large_adverpost {
    text-align:center;
    display:block;
    clear:both;
    margin:auto;
    padding-top: 5px;
    padding-bottom:5px;
}
div#adspot_353668437 div.adspot_main_ad_classic_adverpost {
    padding-right: 5px;
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_353668437 div.adspot_ad_large_adverpost {
    border-color:#BBBBBB;
    border-width:0px;
    border-style:none;
}
div#adspot_353668437 div.adspot_ad_classic_adverpost {
    float: left;
    text-align: middle;
    vertical-align: middle;
    width: 160px;
    height: 160px;
}

div#adspot_353668437 div.adspot_link_classic_adverpost {
    clear:both;
}

div#adspot_353668437 div.adspot_ad_classic_adverpost img {
    padding: 5px
}
/* /BLOGADS FEED CSS */

.google_adsense_btw_posts {
    margin: 0 5px 0 5px;
    width: 460px;
    height: auto;
    padding: 10px 0 10px 10px;
    background: white;
    border-top: #FCDAEA solid 1px;
    border-bottom: #D4C6C5 solid 1px;
    line-height: 1.3;
    text-align: left;
}

.google_adsense_btw_posts .title {
    width: 100%;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 12px;
    margin: 0 0 10px 0;
}

.google_adsense_btw_posts .title a:link,
.google_adsense_btw_posts .title a:visited,
.google_adsense_btw_posts .ad .title a:link,
.google_adsense_btw_posts .ad .title a:visited {
    color: #000000;
    text-decoration: none;
}

.google_adsense_btw_posts .title a:hover,
.google_adsense_btw_posts .ad .title a:hover {
    color: #c06;
    text-decoration: none;
}

.google_adsense_btw_posts .ad {
    width: 220px;
    height: auto;
    margin: 0 10px 0 0;
    float: left;
    overflow: hidden;
    word-wrap: break-word;
}

.google_adsense_btw_posts .ad .title {
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    line-height: 1.1;
    margin: 0 0 10px 0;
}

.google_adsense_btw_posts .ad .content {
    margin: 0 0 10px 0;
    font-size: 11px;
}

.google_adsense_btw_posts .ad .url {
    font-size: 10px;
    line-height: normal;
}

.google_adsense_btw_posts .ad .url a {
    text-decoration: none;
}

.google_adsense_image_ad_btw_posts {
    margin: 0 auto;
    width: 300px;
    height: auto;
    background: transparent;
    line-height: 1.3;
    text-align: left;
}

.google_adsense_image_ad_btw_posts .title {
    width: 100%;
    font-family: Arial,Helvetica,Garuda,sans-serif;
    font-weight: normal;
    font-size: 12px;
}

.google_adsense_image_ad_btw_posts .title a:link,
.google_adsense_image_ad_btw_posts .title a:visited {
    color: #000000;
    text-decoration: none;
}

.google_adsense_image_ad_btw_posts .title a:hover {
    color: #c06;
    text-decoration: none;
}

.google_adsense_image_ad_btw_posts .ad {
    width: 300px;
    height: auto;
    border: none;
}

#ba_clickable_bg_left,
#ba_clickable_bg_right {
    z-index: 5;
}

#ba_clickable_bg_left img,
#ba_clickable_bg_right img {
    top: 0px;
    left: 0px;
    position: absolute;
}

.nuSocialButtons {
    position: absolute;
    top: 10px;
    right: 0px;
    width: auto;
}

.nuSocialButtons .nuSocialObject {
    margin-bottom: 3px;
}

#left .batchphoto h1 {
    text-align: center;
    padding-top: 1em;
    margin: 0 auto;
}
#left .batchphoto .navigation {
    width: auto;
    border: 0;
    padding: 0;
    margin: 0;
}

#left .batchphoto .navigation .big {
    margin: 0 0 5px 0;
    text-transform: uppercase;
    font-weight: bold;
}

#left .batchphoto .navigation .big .big_left {
    width: 160px;
    height: auto;
    text-align: left;
    float: left;
}

#left .batchphoto .navigation .big .big_right {
    width: 290px;
    height: auto;
    text-align: right;
    font-size: 11px;
    color: #333;
    float: right;
    margin-top: 4px;
    text-transform: none;
    font-weight: normal;
}

#left .batchphoto .navigation .left,
#left .batchphoto .navigation .right {
    border: 0;
    margin: 0;
    padding: 0;
}
#left .batchphoto .navigation .left img,
#left .batchphoto .navigation .right img {
    width: 82px !important;
    padding: 0;
    float: none;
}

#left .batchphoto #main-batch-photo {
    margin: 0 0 8px 0;
}

#batch_prev_url,
#batch_prev_pic,
#batch_next_url,
#batch_next_pic {
    display: none;
}

#main-batch-photo {
    width: auto;
    height: auto;
    position: relative;
}

#main-batch-photo .prev {
    background: url("http://i.perezhilton.com/images/galleries/pager.png") no-repeat scroll  0 center  transparent;
    cursor: pointer;
    height: 100%;
    left: -15px;
    position: absolute;
    top: 0;
    width: 100px;
    z-index: 2;
}

#main-batch-photo .next {
    background: url("http://i.perezhilton.com/images/galleries/pager.png") no-repeat scroll -355px center transparent;
    cursor: pointer;
    height: 100%;
    position: absolute;
    right: -15px;
    top: 0;
    width: 100px;
    z-index: 2;
}

#main-batch-photo .prev:hover {
    background: url("http://i.perezhilton.com/images/galleries/pager_hover.png") no-repeat scroll 0 center transparent;
} 

#main-batch-photo .next:hover {
    background: url("http://i.perezhilton.com/images/galleries/pager_hover.png") no-repeat scroll -355px center transparent;
} 

#main-batch-photo .no_image {
    text-align: center; 
    padding: 80px 0; 
    font-size: 20px;
}

#left .entry .rowCon .textCon {
    float: left;
}

#left .entry .rowCon .picture {
    float: left;
}

#left .entry .rowCon .textCon {
    font-family: verdana;
    font-size: 14px;
}

#left .entry .rowCon .textCon a:link {
    font-family: verdana;
    font-size: 16px;
    font-weight: bold;
}

#left .entry .rowCon {
    background: none repeat scroll 0 0 transparent;
    display: inline-block;
    margin: 0 0 10px;
    padding: 0 0 4px;
    width: 100%;
}

#left .entry .rowCon img {
    margin: 3px 18px 5px 0;
    width: 104px;
}

#left .entry .rowCon p {
    padding: 5px 0;
}

#left input, 
#left textarea {
    font-family: Verdana,Geneva,Kalimati,sans-serif;
    font-size: 12px;
}

.form_check_field {
    display: none;
}

#hiddentext {
    display:inline-block;
    position:absolute;
}
#hiddentext > p {
    position:relative;
    display:block;
    border:1px solid #c06;
    background:#fff;
    color:#c06;
    padding:10px;
    min-width:105px;
    /*max-width:438px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;*/
    max-width: 32em;
    z-index:1;
    box-shadow:0 5px 3px -3px #999;
    overflow: hidden;
}
#hiddentext > div.tri {
    position:relative;
    display:block;
    height:14px;
    width:100%;
    background:transparent url(http://i.perezhilton.com/wp-content/themes/default/images/kisbasz.png?v=1) 105px 0 no-repeat;
    z-index:2;
    margin-top:-1px;
}

#new_stories_box {
    width: 448px;
    height: auto;
    padding: 10px;
    border: #e3dfde 1px solid;
    margin: 0 5px 10px 5px;
    background: #eeeeee;
    text-align: center;
    color: #3d3d3d;
    text-shadow: 1px 1px #ffffff;
    cursor: pointer;
    display: none;
}

#new_stories_box span {
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/more-stories-refresh.png') no-repeat scroll right top;
    padding-right: 25px;
}

#new_stories_btn {
    width: 150px;
    height: 28px;
    top: 10px;
    left: 0px;
    position: fixed;
    cursor: pointer;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/new-stories-btn.jpg') no-repeat scroll center top;
    z-index: 3;
    display: none;
}

#ba_adverpost_sponsored_by {
    text-align: right; 
    width: 100%; 
    margin-bottom: 1px;
}

#ba_adverpost_sponsored_by span {
    margin-right: 5px;
}

#ba_adverpost_tab {
    text-align: right; 
    width: 100%;
}

.ba_adverpost_video_container {
    position: relative;
    padding: 0;
    margin: 0 0 10px 0;
}

.ba_adverpost_video {
    top: 0px;
    left: 0px;
    cursor: pointer;
    position: absolute;
}

.ba_adverpost_video_clickable_part {
    top: 0px;
    left: 0px;
    cursor: pointer;
    position: absolute;
    display: none;
}

.ba_adverpost_video_clickable_part img {
    border: none !important;
}

#box_top_story_fb_like {
    width: 100%;
    height: 21px;
    position: relative;
}

#box_top_story_fb_like iframe {
    z-index: 9999;
}

#right .box_perez_contact .addthis_toolbox a {
    padding: 0 3px 0 0 !important;
}

#right .box_perez_contact .addthis_toolbox .addthis_button_facebook_follow {
    margin-left: 5px;
}
#right .box_perez_contact .addthis_toolbox .mail,
#right .box_perez_contact .addthis_toolbox .vine,
#right .box_perez_contact .addthis_toolbox .php {
    float: left;
    overflow: hidden;
    display: block;
    cursor: pointer;
    text-indent: -10000px;
    display: none;
}

#right .box_perez_contact .signup {
    display: block;
    margin: 10px 0 0 0;
}

#right .box_perez_contact .php {
    display: block;
    margin: 10px 0 0 0;
}

#prev_post_arrow,
#next_post_arrow {
    top: 0px;
    background: transparent;
    cursor: pointer;
    border: none;
    position: fixed;
    z-index: 5;   
}

#prev_post_arrow {
    left: 0px;
}

#next_post_arrow {
    right: 0px;
}

#prev_post_arrow:link, 
#prev_post_arrow:visited {
    background: transparent url("http://i.perezhilton.com/wp-content/themes/default/images/pager_normal_v2.png?v=2") no-repeat scroll right center;
}

#next_post_arrow:link,
#next_post_arrow:visited {
    background: transparent url("http://i.perezhilton.com/wp-content/themes/default/images/pager_normal_v2.png?v=2") no-repeat scroll left center;
}

#prev_post_arrow:hover {
    background: transparent url("http://i.perezhilton.com/wp-content/themes/default/images/pager_hover_v2.png?v=2") no-repeat scroll right center;
}

#next_post_arrow:hover {
    background: transparent url("http://i.perezhilton.com/wp-content/themes/default/images/pager_hover_v2.png?v=2") no-repeat scroll left center;
}

#prev_post_arrow img,
#next_post_arrow img {
    top: 0px;
    left: 0px;
    position: absolute;
}

#left .post .more_photos {
    width: 100%;
    height: auto;
    position: relative;
    margin: 5px 0 10px 0;
}

#left .post .more_photos .header {
    position: relative;
}

#left .post .more_photos .photos {
    width: 100%;
    height: auto;
    position: relative;
}

#left .post .more_photos .photos .photo {
    position: relative;
    overflow: hidden;
}

#left .post .more_photos .photos .photo img {
    top: 0px;
    left: 0px;
    position: absolute;
}

#left .post .more_photos .photos .photo .text {
    bottom: 0px;
    left: 0px;
    height: auto;
    position: absolute;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/60trans-caption-share-bg.png') repeat scroll 0 0;
    color: #ffffff;
    font-weight: bold;
    padding: 5px;
    font-family: "Trebuchet MS", Helvetica, Jamrul, sans-serif;
    word-wrap: break-word;
}

#left .post .more_photos .photos .photo .url {
    top: 0px;
    left: 0px;
    position: absolute;
    text-indent: -10000px;
}

#left .post .more_photos .photos .photo .url img {
    top: 0px;
    left: 0px;
    position: absolute;
}

#left .post .more_photos .footer {
    background: #444444;
    color: #ffffff;
    font-weight: bold;
    font-family: Trebuchet MS, sans-serif;
    position: relative;
    text-align: right;
    text-transform: uppercase;
    height: auto;
    padding: 15px;
    overflow: hidden;
}

#left .post .more_photos .footer a img {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
}

#left .post .photo_batch_gallery_container {
    margin: 0 0 8px 0;
}

*:first-child+html #left .post .photo_batch_gallery_container {
    margin-top: -3px;
}

#left .post .photo_batch_gallery {
    background: #c06;
    height: auto;
    display: block;
    position: relative;
}

#left .post .photo_batch_gallery span img {
    border: none;
}

#left .post .photo_batch_gallery span img.active {
    opacity: 0.8;
    filter: alpha(opacity=80);
}

#left .post .photo_batch_gallery span {
    width: auto;
    height: auto;
    position: relative;
    display: block;
    float: left;
}

#left .post .photo_batch_gallery span span.last {
    top: 0px;
    right: 0px;
    position: absolute;
    display: block;
    float: none;
}

#left .post .photo_batch_gallery span.click_to_see {
    display: block;
    float: left;
}

#left .post .photo_batch_gallery span span.last img,
#left .post .photo_batch_gallery span.click_to_see img{
    top: 0px;
    left: 0px;
    margin: 0;
    padding: 0;
    position: absolute;
}

#left .post .pic_social_buttons {
    display: none;
    top: 3px;
    right: 3px;
    position: absolute;
    width: 32px;
    padding: 4px 8px 0 8px;
    background: transparent url('http://i.perezhilton.com/wp-content/themes/default/images/60trans-caption-share-bg.png') repeat scroll 0 0;
}

#left .post .pic_social_buttons a {
    margin: 0 0 4px 0;
    padding: 0;
}

#left .post .pic_social_container {
    height: auto; 
    display: block; 
    position: relative;
    overflow: hidden;
}

div.detailed_results{
    display: table;
    padding: 10px;
}

div.detailed_results a{
    color: #2573b9;
    font-size: 12px;
}

#left .post .hd_turn_on_btn,
.pop_up_post .hd_turn_on_btn,
#left .post .hd_turn_off_btn,
.pop_up_post .hd_turn_off_btn {
    width: 150px; 
    height: 28px; 
    float: left; 
    cursor: pointer;
}

/*CIVIC SCIENCE*/

#left .ballotbox,
#left .ballotbox div,
#left .ballotbox span, 
#left .ballotbox form, 
#left .ballotbox label, 
#left .ballotbox input,
#left .ballotbox .poll_title,
#left .ballotbox .poll_body,
#left .ballotbox .question_text,
#left .ballotbox .answer,
#left .ballotbox .answer .control,
#left .ballotbox .answer .answer_text,
#left .ballotbox .result,
#left .ballotbox .result .percent,
#left .ballotbox .result .answer_text,
#left .ballotbox .buttons,
#left .ballotbox .detailed_results,
#left .ballotbox .wrap_up {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: auto;
    color: #222; 
    text-decoration: auto;
    text-align: left;
}

#left .ballotbox {
    width: 594px;
    background: #fff;
    font: 12px/18px 'Trebuchet MS', Helvetica, Jamrul, sans-serif;
    text-align: left;
}

#left .civicscience .ballotbox .poll_body.loading {}

#left .civicscience .ballotbox .poll_body{}

#left .ballotbox .header {
    font-size: 18px;
    font-weight: bold;
}

#left .ballotbox .question_text {
    font-size: 13px;
    padding: 0 !important;
    margin: 12px 0 10px !important;
    color: #555;
    font-weight: bold;
}

#left .ballotbox ul.answer_options {
    list-style: none;
    padding: 0;
}

/****************** @group Desktop Widget *******************/

#left .ballotbox.click ul.answer_options li {
    margin: 8px 0;
}

#left .ballotbox.click ul.answer_options li input{}

@-moz-document url-prefix() { 
    #left .ballotbox.click ul.answer_options li input{
        margin: 4px 10px 0px 0px !important;
    }
}

#left .ballotbox.click ul.answer_options li label {
    display:table;
    font-weight: normal;
    font-size: 14px;
    color: #666;
    cursor: pointer;
}

#left .ballotbox.click ul.answer_options li input[type="radio"] {
    float: left;
    margin: 2px 10px 0 0;
}

#left .ballotbox.click ul.answer_options li input[type="checkbox"] {
    float: left;
    margin: 3px 10px 0 0;
}


/*************** @group END Touch Widget ******************/

#left .ballotbox input.submit{
    font-size: 12px;
    color: #666;
    border-top: 1px solid #ddd;
    border-right: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    border-left: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 10px;
    font-weight: 400;
    margin: 10px 0;
    background: #f9f9f9;
    line-height: 18px;
    display: table;
    cursor: pointer;
}

#left .ballotbox input.submit:hover{
    cursor: pointer;
    opacity: .9;
}

/*************** @group Answer portion of the widget ******************/

#left .ballotbox .answer_results {
    display: table;
    width: 100%;
    font-size: 15px;
    font-weight: normal;
    margin: 15px 0 4px;
}

#left .ballotbox .answer_results .answer {
    margin: 0 0 10px 0;
}

#left .ballotbox .answer_percentage {
    width: 40px;
    float: left;
}

#left .ballotbox .answer_text {
    display: table;
    margin: 0 0 10px;
    border-bottom: 1px solid #ddd;
    padding: 0 0 5px;
}

#left .ballotbox .progress_bar {
    margin: 10px 0 10px;
    font-size: 9px;
    color: #000;
    font-weight: normal;
    float: left;
    width: 140px;
}

#left .ballotbox.question_1 .progress_bar::before {}

#left .ballotbox.question_2 .progress_bar::before {}

#left .ballotbox.question_3 .progress_bar::before {}

#left .ballotbox .controls {
    height: 20px;
    margin: 0 0 10px 0;
    display: table;
    width: 100%;
}

#left .ballotbox .controls .next {
    float: right !important;
    padding: 5px 10px;
    background: #dcdcdc;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
}

#left .ballotbox .controls .next::after {
    content: ">>";
}

#left .ballotbox .controls .previous {
    float: left;
    padding: 5px 10px;
    background: #dcdcdc;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
}

#left .ballotbox .controls .previous::after {
    content: "<<";  
}

#left .ballotbox .detailed_results a{
    color: #2171b8;
    text-decoration: none;
    font-size: 13px;
}

#left .ballotbox div.wrap_up{
    margin: 12px 0 16px;
}

#left .ballotbox div.wrap_up .end_title{
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 10px;
}

#left .ballotbox div.wrap_up .end{
    font-size: 12px;
}

#left .ballotbox div.wrap_up a{
    color: #2171b8; 
    text-decoration: none;
}

#left .ballotbox .footer {
    font-size: 9px;
    color: #000;
    font-weight: 300;
    float: right;
}

#left .civicscience .ballotbox ul.answer_options::after{
    display: none;
}

#right .ballotbox,
#right .ballotbox,
#right .ballotbox span,
#right .ballotbox form,
#right .ballotbox label,
#right .ballotbox input,
#right .ballotbox .poll_title,
#right .ballotbox .poll_body,
#right .ballotbox .question_text,
#right .ballotbox .answer,
#right .ballotbox .answer .control,
#right .ballotbox .answer .answer_text,
#right .ballotbox .result,
#right .ballotbox .result .percent,
#right .ballotbox .result .answer_text,
#right .ballotbox .buttons,
#right .ballotbox .detailed_results,
#right .ballotbox .wrap_up {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    width: auto;
    color: #222;
    text-decoration: auto;
    text-align: left;
}
#right .ballotbox {
    width: 318px;
    padding: 5px 0 10px;
    background: #fff;
    font: 12px/18px 'Trebuchet MS', Helvetica, Jamrul, sans-serif;
    text-align: left;
    border: 1px solid #fc1e99;
    background-color: #fef1f2;
}
#right .civicscience .ballotbox .poll_body.loading {} #right .civicscience .ballotbox .poll_body {
    margin: 0 10px;
}
#right .ballotbox .header {
    font-size: 18px;
    font-weight: bold;
    margin: 10px;
    color: #fc1e99;
    text-transform: uppercase;
}
#right .ballotbox .question_text {
    font-size: 15px;
    padding: 0 !important;
    margin: 12px 0 10px !important;
    color: #555;
    font-weight: bold;
}
#right .ballotbox ul.answer_options {
    list-style: none;
    padding: 0;
}
#right .ballotbox.click ul.answer_options li {
    margin: 8px 0;
}
#right .ballotbox.click ul.answer_options li input {} #right .ballotbox.click ul.answer_options li label {
    display: table;
    font-weight: normal;
    font-size: 12px;
    color: #333;
    cursor: pointer;
}

@-moz-document url-prefix() { 
    #right .ballotbox.click ul.answer_options li input{
        margin: 4px 10px 0px 0px !important;
    }
}

#right .ballotbox.click ul.answer_options li input[type="radio"] {
    float: left;
    margin: 1px 10px 0 0;
}
#right .ballotbox.click ul.answer_options li input[type="checkbox"] {
    float:left;
    margin: 3px 10px 0 0;
}
#right .ballotbox input.submit {
    font-size: 12px;
    color: #fff;
    padding: 7px 16px;
    font-weight: 400;
    margin: 10px 0;
    background: #fc1e99;
    line-height: 18px;
    display: table;
    cursor: pointer;
    font-weight: bold;
}
#right .ballotbox input.submit:hover {
    cursor: pointer;
    opacity: .9;
}
#right .ballotbox .answer_results {
    display: table;
    width: 100%;
    font-size: 13px;
    margin: 15px 0 4px;
}
#right .ballotbox .answer_results .answer {
    margin: 0 0 10px 0;
}
#right .ballotbox .answer_percentage {
    width: 40px;
    float: left;
}
#right .ballotbox .answer_text {
    display: table;
    margin: 0 0 10px;
    border-bottom: 1px solid #ddd;
    padding: 0 0 5px;
}
#right .ballotbox .progress_bar {
    margin: 10px 0 10px;
    font-size: 9px;
    color: #000;
    font-weight: normal;
    float: left;
    width: 140px;
}
#right .ballotbox.question_1 .progress_bar::before {} #right .ballotbox.question_2 .progress_bar::before {} #right .ballotbox.question_3 .progress_bar::before {} #right .ballotbox .controls {
    height: 20px;
    margin: 0 0 10px 0;
    display: table;
    width: 100%;
}
#right .ballotbox .controls .next {
    float: right !important;
    font-size: 12px;
    color: #fff;
    padding: 7px 16px;
    font-weight: 400;
    margin: 10px 0;
    background: #fc1e99;
    line-height: 18px;
    display: table;
    cursor: pointer;
    font-weight: bold;
}
#right .ballotbox .controls .next::after {
    content: ">>";
}
#right .ballotbox .controls .previous {
    float: left;
    font-size: 12px;
    color: #fff;
    padding: 7px 16px;
    font-weight: 400;
    margin: 10px 0;
    background: #fc1e99;
    line-height: 18px;
    display: table;
    cursor: pointer;
    font-weight: bold;
}
#right .ballotbox .controls .previous::after {
    content: "<<";
}
#right .ballotbox .detailed_results a {
    color: #fc1e99;
    text-decoration: none;
    font-size: 13px;
}
#right .ballotbox .wrap_up {
    margin: 12px 0 16px;
}
#right .ballotbox .wrap_up .end_title {
    font-size: 15px;
    font-weight: bold;
    margin: 0 0 10px;
}
#right .ballotbox .wrap_up .end {
    font-size: 15px;
}
#right .ballotbox .wrap_up a {
    color: #fc1e99;
    text-decoration: none;
}
#right .ballotbox .footer {
    font-size: 9px;
    color: #000;
    font-weight: 300;
    float: right;
}

/*****Old CivicScience Widget Styles Start Here ****/

#right .civicscience .ballotbox ul.answer_options::after {
    display: none;
}
#right .civicscience .ballotbox .poll_title {
    font-size: 15px;
    font-weight: bold;
    margin: 10px 10px;
    color: #c06;
}
#right .civicscience .ballotbox .answer {
    clear: both;
    margin: 0;
    padding: 5px 0;
    display: table;
    width: 100%
}
#right .civicscience .ballotbox .answer .control {
    float: left;
    margin: 0 4px 0 0;
}
#right .civicscience .ballotbox .answer .control input {
    margin: 0;
    padding: 0;
    cursor: pointer;
}
#right .civicscience .ballotbox .answer .answer_text label {
    display: table;
    cursor: pointer;
    margin: 0 10px 0 0;
}
#right .civicscience .ballotbox .result {
    clear: both;
    margin: 6px 0;
    padding: 3px;
    display: table;
    width: 100%
}
#right .civicscience .ballotbox .result .percent {
    float: left;
    width: 40px;
}
#right .civicscience .ballotbox .result .answer_text label {
    display: table;
    cursor: pointer;
}
#right .civicscience .ballotbox .buttons input.vote,
#right .civicscience .ballotbox .buttons input.next,
#right .civicscience .ballotbox .buttons input.previous {
    margin: 10px 0;
    cursor: pointer;
    display: inline-block;
    background-color: #fc1e99;
    background-repeat: no-repeat;
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#fe4fb0), color-stop(25%, #fe4fb0), to(#fc1e99));
    background-image: -webkit-linear-gradient(#fe4fb0, #fe4fb0 25%, #fc1e99);
    background-image: -moz-linear-gradient(top, #fe4fb0, #fe4fb0 25%, #fc1e99);
    background-image: -ms-linear-gradient(#fe4fb0, #fe4fb0 25%, #fc1e99);
    background-image: -o-linear-gradient(#fe4fb0, #fe4fb0 25%, #fc1e99);
    background-image: linear-gradient(#fe4fb0, #fe4fb0 25%, #fc1e99);
    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#fe4fb0', endColorstr='#fc1e99', GradientType=0);
    padding: 5px 14px 6px;
    color: #fff;
    font-size: 13px;
    line-height: normal;
    border: 1px solid #ccc;
    border-bottom-color: #bbb;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    -moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    -webkit-transition: 0.1s linear all;
    -moz-transition: 0.1s linear all;
    transition: 0.1s linear all;
}
#right .ballotbox .detailed_results {
    display: block;
    clear: both;
}
#right .civicscience .ballotbox .buttons input.next {
    float: right;
}
#right .civicscience .ballotbox .buttons input.previous {
    float: left;
}

/* /CIVIC SCIENCE*/

#taboola-right-rail-thumbnails {
    border-bottom: #d4c6c5 solid 1px;
}

#left .post .OUTBRAIN img {
    width: auto;
    border: none;
}

/* MYEMMA NEWSLETTER */

#myemma {
    padding: 0;
}
#myemma p {
    display: block;
    width: 270px;
    height: 55px;
    padding: 10px !important;
    float: left;
    font-size: 12px !important;
}
#myemma p.signup_header {
    width: auto;
    height: auto;
}
#myemma p.signup_header img {
    border: 0;
    width: 100%;
}
#myemma p.last {margin-bottom:25px;}
#myemma p.full {
    float: none;
    width: auto;
    height: auto;
    clear: both;
    border-top: 1px solid #eee;
    padding-bottom: 35px;
    text-align:center;
}
#myemma input[type=submit] {
    display: block;
    width: 117px;
    height: 45px;
    border: 0;
    margin: 0 auto;
    background: url(http://i.perezhilton.com/wp-content/themes/default/images/newsletter/submitButton.png) no-repeat;
    overflow: hidden;
    text-indent: -999em;
}
#myemma p.full a {display:inline-block;margin: 10px 0 0 0;}
#myemma label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
}
#myemma label.span {
    display: inline;
    font-weight: normal;
    margin 0;
}
#myemma input[name=date] {
    display: none;
}
#myemma input[type=text] {
    width: 250px;
}
#myemma input.error {border:1px solid red;}
#myemma b.error {color:red;font-weight:normal;padding:2px;display:block;}
#subscribe_success {display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.8);z-index:10000;}
#subscribe_success_popup {position:fixed;top:50%;left:50%;margin:-172px 0 0 -294px;width:625px;height:309px;
background:url(http://i.perezhilton.com/wp-content/themes/default/images/newsletter/thankYouPopUpBg.png) no-repeat;z-index:10001;}
#subscribe_success_popup .close {display:block;position:absolute;top:0;right:0;width:80px;height:23px;}
#subscribe_success_popup .ok {display:block;position:absolute;top:239px;left:246px;width:95px;height:45px;}
#subscribe_success_popup p {margin:150px 60px 0 50px;font-size:20px;color:#FF11C5;text-align:justify;}

