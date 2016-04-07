/**
 Provides asynchronous login functionality.
 Validates inputs as well.**
 **/
define('widgets/quick-login-val',
    ['jquery', 'tmz/members/1.0.3/members'],

    function quickLoginFormval($, members) {
      'use strict';

      function attachHandlers() {
        //if needed
      }

      var debug = true;
      var $parentSelector = 'aside.quick-login-form';
      var $loginIdSelector = 'input.userid';
      var $passwordSelector = 'input.password';
      var $submitBtnSelector = 'input.qlf-submit';
      var $privacySelector = '#privacy';
      var $rememberMeSelector = "#rememberme";

      var $errorClass = 'error';
      var $loginIdPlaceHolder = 'Email';
      var $passPlaceHolder = 'Password';

      var $processingSelector = '.processing';

      var $loginIdField = $($loginIdSelector);
      var $passField = $($passwordSelector);
      var $submitField = $($submitBtnSelector);
      var $privacyField = $($privacySelector);

      var $loginEndpoint = '/members/signin/ajax';
      var $emailFilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      //field validity object with initial values
      var $validFields = {};
      $validFields[$loginIdSelector] = false;
      $validFields[$passwordSelector] = false;
      $validFields[$privacySelector] = false;


      var hideLoginForm = function () {
        $($parentSelector).hide();
        debug_log('hiding login form');
      }

      var debug_log = function (txt) {
        if ((typeof window.SYSTEM_ENV !== 'undefined') && (window.SYSTEM_ENV == 'dev')) {
          if (window.console && typeof console.log != "undefined") {
            return console.log("QUICKLOGIN DEBUG::" + txt);
          }
        }
      }

      /**
       * @Description generic function for handling blur and focus for form inputs
       * @param $jFieldObj
       * @param $placeHolderTxt
       */
      var blurAndFocusHandler = function ($jFieldObj, $placeHolderTxt) {
      //disable submit by default
       // $submitField.prop("disabled", true);

        var $selector = '';
        if (typeof $jFieldObj.selector !== 'undefined') {
          $selector = $jFieldObj.selector;
        }

        if ($jFieldObj.prop('type') != 'checkbox') {
          //handle focus
          $jFieldObj.focus(function () {
            debug_log('focused on ' + $selector);
            var $fieldVal = $jFieldObj.val();
            if ($fieldVal === $placeHolderTxt) {
              $jFieldObj.val('');
              $jFieldObj.prop('placeholder', '');
              $validFields[$selector] = false;
            }
            $jFieldObj.removeClass($errorClass);

          });

          //handle blur

          $jFieldObj.on('blur focusout', function () {
            debug_log('blur event on ' + $selector);
            var $fieldVal = $jFieldObj.val();
            if ($fieldVal === '' || $fieldVal == $placeHolderTxt) {

              $jFieldObj.val($placeHolderTxt);
              $jFieldObj.prop('placeholder', $placeHolderTxt);
              setInvalidFieldBySelector($selector);

            } else {
              setValidFieldBySelector($selector);
            }
            if ($selector == $loginIdSelector) {
              if (!$emailFilter.test($fieldVal) && $fieldVal !== $placeHolderTxt) {
                setInvalidFieldBySelector($loginIdSelector);
                debug_log('invalid email: ' + $fieldVal);
              }
            }

            checkReleaseSubmit();
          });
        } else {
          //checkbox handling
          $(document).on("change", $selector, function () {

            if (this.checked) {
              debug_log('agreed to terms');
              setValidFieldBySelector($selector);
            } else {
              debug_log('must agree to terms');
              setInvalidFieldBySelector($selector);
            }
            checkReleaseSubmit();
          });
        }
      }

      var setInvalidFieldBySelector = function ($selector) {
        if ($($selector).length) {
          debug_log('Invalidating: ' + $selector);
          $validFields[$selector] = false;
          $($selector).addClass($errorClass);
        }
      }

      var setValidFieldBySelector = function ($selector) {
        if ($($selector).length) {
          debug_log('set Valid: ' + $selector);
          $validFields[$selector] = true;
          $($selector).removeClass($errorClass);
        }
      }

      /**
       * @Description returns an array of invalid fields from validityObject
       * @return array
       *
       */

      var getInvalidFieldsArray = function () {
        var _arrInvalid = [];
        for (var $field in $validFields) {
          if ($validFields[$field] == false) {
            _arrInvalid.push($field);
            debug_log('--Validy State: ' + $field + ' ' + $validFields[$field]);
          }
        }
        return _arrInvalid;
      }
      /**
       * @Description checks field if there are any invalid fields
       * @return bool
       *
       */
      var hasInValidFields = function () {
        var $result = false;
        if (getInvalidFieldsArray().length > 0) {
          //if the object has any keys, there are invalid fields.
          $result = true;
        }
        return $result;
      }

      var checkReleaseSubmit = function () {
        debug_log('checking submit button release state');

        var $hasInvalidFields = hasInValidFields();
        if (false == $hasInvalidFields) {
          //release submit button
          debug_log('releasing submit btn');
          // $submitField.removeAttr('disabled');
        } else {
          debug_log('NOT releasing submit btn');
          // $submitField.prop("disabled", true);
        }
      }

      var processingOverLay = function processingOverLay() {
        $($processingSelector).fadeToggle("fast", "linear");

              // hit escape to close the overlay
        $(document).keyup(function(e) {
            if (e.which === 27) {
                $('#overlay').remove();
            }
        });


      }

      function processLogin($loginVal, $passVal, $remVal) {
        debug_log('Processing login');

        var $postData = {};
        $postData['Email'] = $loginVal;
        $postData['Password'] = $passVal;
        $postData['rememberme'] = $remVal;

        $.ajax({
          type: "POST",
          url: $loginEndpoint,
          data: $postData,
          beforeSend: function () {
            //show an indicator
            processingOverLay();

          },
          success: function (data) {
            //was able to connect
            debug_log('Comm success');
            debug_log('Response code' + data.code);
            if (data.code == 0) {
              debug_log('BAD LOGIN');

              $($passwordSelector).addClass($errorClass);
              checkReleaseSubmit();
            }
            if (data.code == 1) {
              // window.location.reload()
              members.renderUserNav();
              hideLoginForm();
            }
          },
          error: function () {
            //invalid login
            debug_log('Comm error');

          },
          complete: function () {
            processingOverLay();
          },
          dataType: 'jsonp'
        });
      }

      return {

        initialize: function () {
          debug_log('validator initialized');
          debug_log('Signin button disabled');

          blurAndFocusHandler($loginIdField, $loginIdPlaceHolder);
          blurAndFocusHandler($passField, $passPlaceHolder);
          blurAndFocusHandler($privacyField, '');

        },

        loginValidation: function () {
          debug_log('-validating inputs');

          var $loginVal = $.trim($loginIdField.val());
          var $passVal = $.trim($passField.val());
          var $rememberMeVal = 0;
          if ($($rememberMeSelector).is(':checked')) {
            $rememberMeVal = 1;
          }

          if ($loginVal == '' || $loginVal == $loginIdPlaceHolder || !$emailFilter.test($loginVal)) {
            debug_log('-blank userid');
            setInvalidFieldBySelector($loginIdSelector);
          }
          if ($passVal == '' || $passVal == $passPlaceHolder) {
            debug_log('-blank password');
            setInvalidFieldBySelector($passwordSelector);
          }

          if (false == $($privacySelector).is(':checked')) {
            debug_log('must agree to terms');
            setInvalidFieldBySelector($privacySelector);
          }
          //checks if any invalid fields
          var $inValidInputs = hasInValidFields();

          if (!$inValidInputs) {
            //inputs are valid
            debug_log("INPUTs VALID");

            //enable submits
            // $submitField.prop("disabled", false);
            debug_log("enabling signing buttons");
            customAdId("mastheader-login-submit");

            processLogin($loginVal, $passVal, $rememberMeVal);

            return false;
          } else {
            //there was an error
            debug_log("INVALID INPUTS");
            // $submitField.prop("disabled", true);

            return false;
          }
        },

      }
    });