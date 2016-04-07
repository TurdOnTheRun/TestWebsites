
define('widgets/quick-subscribe',
  ['jquery', 'widgets/quick-subscribe-val'],
  function quicksubscribe($,fform, quickSubTemplate) {
    'use strict';
    function attachHandlers() {
    //if needed

    }

    var methods = {
      render: function(toSelector) {
        attachHandlers();
        fform.initialize();
        $('.quick-subscribe-form').on('submit', function(e){
            return fform.emailValidation();
        });
      }
    };
    return methods;
  });
