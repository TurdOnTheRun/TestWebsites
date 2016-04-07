var Fandango = Fandango || {};
"use strict";

var currentShareContainer;

Fandango.share = function () {
	var windowWidth = 0;

	var initialize = function () {
		windowWidth = $(window).width();
		enableShare();
	};

	var enableShare = function () {
		// move any share-panel-containers to the body for easier positioning
		var $shareContainer = $(".share-panel-container");
		$shareContainer.appendTo("body");

		// event handler for btn-share
		$(".btn-share").on("click", function (e) {
			e.preventDefault();

			// determine position of this exact context
			var $elOffset = $(this).offset(),
				$thisShareContainer = $("#" + $(this).attr("data-id")),
				$posOffset = parseInt($thisShareContainer.height());

			currentShareContainer = $("#" + $(this).attr("data-id"));

			// position control
			$thisShareContainer.css("top", $elOffset.top - $posOffset).css("left", $elOffset.left);
			toggleShare($thisShareContainer, false);
			return false;
		});

		$("body").on("click", function (e) {
			if (typeof currentShareContainer != "undefined") {
				toggleShare(currentShareContainer, true);
			}
		});
	};

	var toggleShare = function (container, forceHide) {
		if (container.hasClass("is-visible") || forceHide) {
			container.removeClass("is-visible");
			$(".btn-share").removeClass("is-active");
			setTimeout(function () {
				container.addClass("hide");
			}, 100);
		} else {
			container.removeClass("hide");
			container.addClass("is-visible");
			$(".btn-share").addClass("is-active");


			$(window).resize(function () {
				var buttonOffset = $(".btn-share").offset();
				var containerHeight = parseInt(container.height());
				container.css("top", buttonOffset.top - containerHeight).css("left", buttonOffset.left);
			});
		}

	};

	return { initialize: initialize };
}();

Fandango.share.initialize();