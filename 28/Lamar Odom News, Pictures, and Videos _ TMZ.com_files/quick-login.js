/**
 Provides asynchronous login functionality.**
 **/
define('widgets/quick-login',
    ['jquery', 'tmz/members/1.0.3/members', 'widgets/quick-login-val'],
    function quicklogin($, members, qlform) {
      'use strict';

      var attachHandlers = function (parentSelector) {
        //if needed
      };


      var methods = {
        render: function (toSelector) {
          attachHandlers(toSelector);
          qlform.initialize();
          window.qlform = qlform;
          $('.qlf-submit').on('click', function (e) {

            e.preventDefault();
            //alert('default prevented');

            return qlform.loginValidation();
          });
        }
      };
      return methods;
    });
