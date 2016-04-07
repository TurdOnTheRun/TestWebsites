define([
    'jquery', 
    'version!fly/components/base'
], function($) {

    //Determines which click event to use depending if jQuery mobile is used and if it is a touch device
    var isTouchDevice = (('ontouchstart' in window) || ('onmsgesturechange' in window)) ? true : false,
        clickEventName = ($.mobile) ? 'vclick' : 'click';
    

    /**
     * Show and hide content based on a set of tabs
     *
     * @extends cbsi.component
     * 
     * Example Usage: 
     *      
     *      $('#my-dropdown').dropdown();
     *      
     *      <div id="my-dropdown" data-dropdown-options='{}'></a>
     *          <a data-item="trigger">Dropdown</a>
     *          <div>Content</div>
     *      </div>
     *
     */
    $.widget( 'fly.dropdown', $.fly.base, {
        
        /**
         * Optional data configuration
         * @define {object}
         */
        options: {
            classSelected: 'selected',
            event: 'click', // click | hover
            selectorTrigger: '[data-item="trigger"]'
            //shown: $.noop dropdown is shown
            //hidden: $.noop dropdown is hidden
        },

        // Vars
        $element: null, // {Object} Dropdown element
        $trigger: null, // {Object} Dropdown trigger element

        enterTimeout: null,
        leaveTimeout: null,
        
        /**
         * Instantiate Tabs
         * @constructor
         */
        _create: function() {
            var o = this.options,
                eventMap = {};
            
            this._setup();
            
            //If touch is supported, force the event to be click
            if (isTouchDevice) {
                o.event = 'click';
            }
            
            // DOM els
            this.$element = this.$element;
            this.$trigger = this.$element.find(o.selectorTrigger).first();

            // click 
            if ('click' === o.event) {
                eventMap[clickEventName] = '_handleClick';
                this._on(this.$trigger, eventMap);
            // hover
            } else if ('hover' === o.event) {
                this._on(this.$element, {
                    'mouseenter': '_handleMouseEnter',
                    'mouseleave': '_handleMouseLeave'
                });
            }
        
            
        },

        /**
         * Handle the tab click event
         *
         * @param e The click event
         * @private
         */        
        _handleClick: function(e) {
            e.preventDefault();
            //e.stopPropagation();
        
            this.toggle();
        },


        /**
         * Handle the mouseenter event
         *
         * @param e The click event
         * @private
         */        
        _handleMouseEnter: function(e) {
            var self = this;
            
            clearTimeout(this.leaveTimeout);
            
            this.enterTimeout = setTimeout(function() {
                self.show();
            }, 50);
        },

        /**
         * Handle the mouseleave event
         *
         * @param e The click event
         * @private
         */        
        _handleMouseLeave: function(e) {
            var self = this;
            
            clearTimeout(this.enterTimeout);

            this.leaveTimeout = setTimeout(function() {
                self.hide();
            }, 150);
        },

        /**
         * Close dropdown on a click outside of it
         *
         * @param e The click event
         * @private
         */  
        _handleDocClick: function(e) {
            var $el = $(e.target);
        
            // If the element clicked on is not a child of the dropdown and is still in the doc
            // then allow hide
            if (this.$element.has($el).length === 0 && $.contains(document.documentElement, $el[0])) {
                this.hide();
            }
        },

        /**
         * Show the dropdown
         */ 
        show: function() {
            var self = this,
                o = this.options,
                eventMapClick = {};
            
            this.$element.addClass(o.classSelected);
            
            // delay docClick so it doesn't fire on show click
            setTimeout(function() {
                eventMapClick[clickEventName] = '_handleDocClick';
                self._on(self.$document, eventMapClick);
            }, 1);
            
            this._trigger('shown', null, {
                $element: this.$element,
                $trigger: this.$trigger
            });
        },

        /**
         * Hide the dropdown
         */ 
        hide: function() {
            var o = this.options;
            
            this.$element.removeClass(o.classSelected);
            
            this._off(this.$document, clickEventName); 
            
            this._trigger('hidden', null, {
                $element: this.$element,
                $trigger: this.$trigger
            });
        },

        /**
         * Toggle the show/hide states of the dropdown
         */ 
        toggle: function() {
            var o = this.options,
                isSelected = this.$element.hasClass(o.classSelected);

            this[(isSelected) ? 'hide' : 'show' ]();
        }
    });
});

