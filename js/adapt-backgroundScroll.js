define(function(require) {

	var ComponentView = require('coreViews/componentView');
	var Adapt = require('coreJS/adapt');

	var BackgroundScroll = ComponentView.extend({

		events: {
			"click .bg-scroll-next": "nextItem"
		},

		preRender: function() {
			// Checks to see if the text should be reset on revisit
			this.viewHeight = $(window).height();
			if (this.model.get("_isComplete")) {
				this.setCompletionStatus();
			}
		},

		postRender: function() {
			this.offsetTop = $(".navigation").height();
			this.numItems = this.model.get("_items").length;
			this.$items = this.$(".bg-scroll-item");
			this.$images = this.$(".bg-scroll-background");
			this.visitedItems = 1;
			this.setupScrollListener();
			this.setupHeights();
			this.setReadyStatus();
			this.setupTimer();
		},

		setupTimer: function() {
			this.time = 0;
			this.timer = setInterval(function() {
				this.time++;
			}.bind(this), 1000);
		},

		setupScrollListener: function() {
			$(window).on("scroll", function() {
				var st = window.pageYOffset || document.documentElement.scrollTop;
				var top = this.$el.offset().top;
				var iStart = this.model.get("_fadeFirstImage") ? 0 : 1;
				var opacity;

				if (st > top - this.viewHeight && st < top) {
					var imgTop = 100 - (((st - (top - this.viewHeight)) / this.viewHeight) * 100);
					this.$(".bg-scroll-images").css({top: imgTop + "%"});
				}

				if (iStart === 1) {
					opacity = st + this.viewHeight >= top - 60 ? 1 : 0;
					this.$images[0].style.opacity = opacity;
				}

				for (var i = iStart; i < this.numItems; i++) {
					var item = this.$items.eq(i);
					var diff = item.offset().top - st - (this.viewHeight / 3);
					var img = this.$images[i];
					if (diff < 0) {
						var currItem = i;
						opacity = 1;
					} else if (diff < 400) {
						opacity = 1 - (diff / 400);
					} else {
						opacity = 0;
					}

					img.style.opacity = opacity;
				}

				if (currItem && currItem !== this.currItem) this.setCurrItem(currItem);
			}.bind(this));
		},

		setupHeights: function() {
			var $item = this.$items.eq(0);
			//this.el.style.paddingTop = this.viewHeight - $item.offset().top - $item.outerHeight() - 50 + "px";
			_.each(this.$items, function(el, i) {
				var $el = $(el);
				var padding = (this.viewHeight - $el.height()) / 2 + "px 0";
				$el.css({padding: padding});
			}, this);
		},

		setCurrItem: function(i) {
			// Prevent user from scrolling straight to bottom
			// 2 Seconds should be about right to ensure they have read the material
			if (this.time < 2) return;
			this.currItem = i;
			this.time = 0;
			this.visitedItems ++;
			if (this.checkCompletionStatus()) {
				this.onComplete();
			}
		},

		nextItem: function() {

		},

		prevItem: function() {

		},

		checkCompletionStatus: function() {
			return this.numItems === this.visitedItems;
		},

		onComplete: function () {
			this.setCompletionStatus();
		}
	});

	Adapt.register('backgroundScroll', BackgroundScroll);

	return BackgroundScroll;

});
