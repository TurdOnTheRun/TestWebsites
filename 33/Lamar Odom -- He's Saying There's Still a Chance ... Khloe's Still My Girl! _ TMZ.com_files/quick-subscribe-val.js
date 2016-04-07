/**
 * Created by xoefada on 9/9/15.
 */




define(
    'widgets/quick-subscribe-val',
    ['jquery'],

    function quickSubscribeFormVal($) {
      'use strict';

      var debug = true;
      var $inputSelector = 'input.quicksub-email';
      var $errorTextSelector = '.quick-subscribe-form .optin-errortxt';
      var $submitBtnSelector = '.quick-subscribe-submit';

      var $errorClass = 'error';


      var $inputField = $($inputSelector);
      var $submitField = $($submitBtnSelector);
      var errorsContainer = $($errorTextSelector);

      function debug_log(txt) {
        if((typeof window.SYSTEM_ENV !== 'undefined') &&( window.SYSTEM_ENV =='dev')){
          if (window.console && typeof console.log != "undefined"){
              return console.log("QUICKSUB DEBUG::" + txt);
          }
        }
      }


      return {

        initialize: function () {
          debug_log('validator initialized');

          $inputField.focus(function () {
            debug_log('focused');
            var email = $inputField.val();
            if (email === 'Email Address') {
              $inputField.val('');
              $inputField.prop('placeholder', '');
            }
            $inputField.removeClass($errorClass);
            $submitField.removeClass($errorClass);
            errorsContainer.empty();
          });
          $inputField.blur(function () {
            debug_log('blur event ');
            var email = $inputField.val();
            if (email === '') {
              $inputField.val('Email Address');
              $inputField.prop('placeholder', 'Email Address');
            }
          });
        },

        emailValidation: function () {
          debug_log('QUICKSUB: -validating email');


          var validEmail = false;
          var email = $('input.quicksub-email');

          var emailVal = $('input.quicksub-email').val();
          var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
          var errorMessage = null;
          if (email != null && emailVal.length !== 0 && emailVal !== 'Email Address') {
            if (filter.test(emailVal)) {
              validEmail = true;
              debug_log('setting email as valid');
              email.value = emailVal;
            }
          }

          if (validEmail) {
            //address is valid
            debug_log("EMAIL VALID");
            customAdId("follow-widget.tmz.newsletter.submit");
            errorMessage = 'Subscribing in progress... check your email.';

            errorsContainer.html(errorMessage);
            $inputField.removeClass($errorClass);
            $submitField.removeClass($errorClass);

            $('.quicksub-iframe').one('load', function () {
              $('.quick-subscribe-form form').empty();
              $('.quick-subscribe-form form').html('<p class="thankyou">Thank you!<br /> ' +
                  'You Have Successfully Signed Up</p>');
            });

            return true;
          } else {
            //there was an error
            debug_log("EMAIL INVALID");
            errorMessage = 'E-mail address is not valid!';

            errorsContainer.html(errorMessage);
            $inputField.addClass($errorClass);
            $submitField.addClass($errorClass);

            return false;
          }
        },
      }
    });