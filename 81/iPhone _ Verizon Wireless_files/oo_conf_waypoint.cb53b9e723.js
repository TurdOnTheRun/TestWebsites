/*
OnlineOpinion v5.9.0
Released: 11/17/2014. Compiled 11/17/2014 01:01:01 PM -0600
Branch: master 7cffc7b9a0b11594d56b71ca0cb042d9b0fc24f5
Components: Waypoint
UMD: disabled
The following code is Copyright 1998-2014 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. https://www.opinionlab.com
*/

/* global window, OOo */

/*
Waypoint configuration
************************
May pass up to 4 categories.
Passing a link instead of an object will setup a normal link
*/

(function (w, o) {
    'use strict';

    var cv_transType = typeof App !== 'undefined' ? (typeof App.constants !== 'undefined' ? App.constants.transactionType : typeof App.vars !== 'undefined' ? App.vars.transactionType : '') : '';
    var cv_platform = typeof App !== 'undefined' ? (typeof App.constants !== 'undefined' ? App.constants.platformType : typeof App.vars !== 'undefined' ? App.vars.platformType : '') : '';
    var cv_exitConfirmation = typeof App !== 'undefined' ? (typeof App.constants !== 'undefined' ? App.constants.checkoutExit : typeof App.vars !== 'undefined' ? App.vars.checkoutExit : false) : '';

    var OpinionLabInit = function () {

        var createTab = function () {
            var el,
                tab_cust = document.createElement('div'),
                tab_div  = document.createElement('div'),
                regSpan  = document.createElement('span');
            tab_cust.id = 'oo_tab';
            tab_cust.className = 'oo_tab_right';
            tab_cust.style.index = '0';
            document.body.appendChild(tab_cust);
            el = document.getElementById('oo_tab');
            el.appendChild(tab_div);
            el.appendChild(regSpan);

            // Drop the preventOL cookie whenever the Waypoint tab is clicked
            // to prevent the user from receiving an EDCC card during their visit
            o.addEventListener(tab_cust, 'mousedown', function() {
                o.createCookie('oo_prevent', true, 2592000);
            }, false);
        };

        createTab();

        o.oo_waypoint = new o.Waypoint({
        /* REQUIRED - Asset identification */
            pathToAssets: '/omni/common/onlineopinionv5/',
            companySlogan: 'Give us feedback',
            companyLogo: '/omni/common/onlineopinionv5/verizon_waypoint.png',
        /* OPTIONAL - Configuration */
            categories: {
                Website_Feedback: {
                    oCode: {
                        tealeafCookieName: 'GLOBALID',
                        customVariables: {
                            s_vi: OOo.readCookie('s_vi'),
                            s_pageName: typeof s !== 'undefined' ? (typeof s.pageName !== 'undefined' ? s.pageName : '') : '',
                            cv_platform: typeof cv_platform !== 'undefined' ? cv_platform : '',
                            cv_transType: typeof cv_transType !== 'undefined' ? cv_transType : '',
                            cv_exitConfirmation: typeof cv_exitConfirmation !== 'undefined' ? cv_exitConfirmation : '',
                            ol_mtn: typeof ol_mtn !== 'undefined' ? ol_mtn : '',
                            sc_ECPDNumber: typeof sc_ECPDNumber !== 'undefined' ? sc_ECPDNumber : '',
                            s_tnt: typeof s_tnt !== 'undefined' ? s_tnt : '',
                            s_channel: typeof s_channel !== 'undefined' ? s_channel : '',
                            checkout_legacy: typeof checkout_legacy !== 'undefined' ? checkout_legacy : '',
                            ol_primary_mdn: typeof ol_primary_mdn !== 'undefined' ? ol_primary_mdn : '',
                            ol_accountId: typeof ol_accountId !== 'undefined' ? ol_accountId : '',
                            ol_cust_email: typeof ol_cust_email !== 'undefined' ? ol_cust_email : ''
                        }
                    },
                    icon: 'icon-website-feedback.png'
                },
                Store_Feedback: {
                    oCode: {
                        referrerRewrite: {
                            searchPattern: /:\/\/[^\/]*/,
                            replacePattern: '://stores.verizonwireless.com/'
                        },
                        tealeafCookieName: 'GLOBALID',
                        customVariables: {
                            s_vi: OOo.readCookie('s_vi'),
                            s_pageName: typeof s !== 'undefined' ? (typeof s.pageName !== 'undefined' ? s.pageName : '') : '',
                            cv_platform: typeof cv_platform !== 'undefined' ? cv_platform : '',
                            cv_transType: typeof cv_transType !== 'undefined' ? cv_transType : '',
                            cv_exitConfirmation: typeof cv_exitConfirmation !== 'undefined' ? cv_exitConfirmation : '',
                            ol_mtn: typeof ol_mtn !== 'undefined' ? ol_mtn : '',
                            sc_ECPDNumber: typeof sc_ECPDNumber !== 'undefined' ? sc_ECPDNumber : '',
                            s_tnt: typeof s_tnt !== 'undefined' ? s_tnt : '',
                            s_channel: typeof s_channel !== 'undefined' ? s_channel : '',
                            checkout_legacy: typeof checkout_legacy !== 'undefined' ? checkout_legacy : '',
                            ol_primary_mdn: typeof ol_primary_mdn !== 'undefined' ? ol_primary_mdn : '',
                            ol_accountId: typeof ol_accountId !== 'undefined' ? ol_accountId : '',
                            ol_cust_email: typeof ol_cust_email !== 'undefined' ? ol_cust_email : ''
                        }
                    },
                    icon: 'icon-store-feedback.png'
                }
            },
            disableMobile: false,
            disableNoniOS: false
        });

        o.appendWaypoint('oo_tab');
        // o.appendWaypoint('id-of-link');

    };

    o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, OOo);
