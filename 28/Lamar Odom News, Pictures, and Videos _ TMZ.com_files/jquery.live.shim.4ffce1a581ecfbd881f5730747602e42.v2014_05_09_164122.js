jQuery.fn.live = function( types, data, fn ) { jQuery( this.context ).on( types, this.selector, data, fn ); return this; }

