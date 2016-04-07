(function ($) {
	$.fn.jcarouselSwipe = function (options) {
		options = $.extend({
			next: '+=1',
			prev: '-=1'
		}, options);

		return this.each(function () {
			var $this = $(this),
				carousel = $this.data('jcarousel');

			$this
				.hammer({
					drag_min_distance: 60,
					swipe_velocity: 0.3
				})
				.on('drag swipe', function (ev) {
					if (window.Hammer.utils.isVertical(ev.gesture.direction)) return;
					ev.gesture.preventDefault();

					carousel.scroll(options['left' === ev.gesture.direction ? 'next' : 'prev']);
				});
		});
	};
})(jQuery);
