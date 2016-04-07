define([
    'jquery',
    'version!fly/managers/debug',
    'version!fly/components/base'
], function($, debugMgr) {
    
    var debug = debugMgr.get('livefyre');
    
    /**
     * Display the comment count for a livefyre conversation.
     *
     * @extends fly.base
     * 
     * Prerequisites:
     *      Needs 'livefyre-commentcount' path defined in require.config().
     *
     * Example usage:
     *     <div data-lf-site-id="..." data-lf-article-id="..." class="livefyre-commentcount"></div>
     *
     * Optional format attr: data-lf-format="fullText"
     *
     * See also:
     *      https://github.com/Livefyre/livefyre-docs/wiki
     */
    
    $.widget('fly.livefyreCommentcount', $.fly.base, {
        
        // Options
        options: {
            // The replacer can be a function or a regex or a string that references one of the standard replacer formats.
            format: 'fullText'
        },
        
        /**
         * Define the standard replacer types.
         */
        formats: {
            fullText: function($el, count) {
                $el.html(count +' <span>Comment'+ (count === 1 ? '</span>' : 's</span>'));
            },
            numberOnly: function($el, count) {
                $el.html(count);
            }
        },

        /**
         * Initialize the livefyre comment count javascript.
         *
         * @param options
         * @private
         */
        _create: function() {
            var self = this;

            this._setup();
            
            // Initialize the livefyre js.
            require(['livefyre-commentcount'], function() {
                // TODO: Call some livefyre function (when they eventually have one) that displays the comment count 
                // in case the js has been loaded before this element existed.

                LF.CommentCount({
                    replacer: $.proxy(self.replace, self)
                });
                
                debug.log('calling livefyre for comment counts');
            });
        },

        /**
         * Replace
         *
         * @param el
         * @param count
         */        
        replace: function(el, count) {
            var o = this.options,
                $el = $(el),
                format = $el.data('lf-format') || o.format;
        
            if ($.isFunction(this.formats[format])) {
                this.formats[format]($el, count);
            }
            
            debug.log('set comment count: ', format, $el);
        }
        
    });
    
});