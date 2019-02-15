define([
    'core/js/adapt'
], function(Adapt) {

    return Backbone.View.extend({

        template: 'backgroundScroll',

        className: 'bgscroll-images',

        initialize: function() {
            this.offsetTop = $('.navigation').height();
            this.viewHeight = $(window).height() - this.offsetTop;
            this.listenTo(Adapt, 'remove', this.remove);
            this.render();
        },

        preRender: function() {

        },

        render: function() {
            var template = Handlebars.templates[this.template];
            var modelType = this.model.get('_bgScroll')._children || 'blocks';
            var data = {
                _bgImages: this.model.findDescendantModels(modelType).reduce(function(images, model) {
                    var src = model.get('_bgScroll').src;
                    return src ? images.concat(src) : images;
                }, [])
            };

            this.$el.html(template(data)).appendTo('.page');

            var selector = '.' + modelType.slice(0, modelType.length - 1);
            this.$children = $(selector);

            $('.page').addClass('bgscroll');

            this.postRender();
        },

        postRender: function() {
            this.$images = this.$('.bgscroll-background');
            this.numItems = this.$images.length;
            this.setupScrollListener();
            this.setupHeights();
        },

        setupScrollListener: function() {
            $(window).on('scroll.bgScroll', function() {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                var top = this.$el.offset().top;
                var iStart = this.model.get('_fadeFirstImage') ? 0 : 1;
                var distanceFromBottom = st - (this.$el.height() + top - (this.viewHeight / 2));
                var distanceFromTop = st - (top - this.viewHeight);
                var opacity;
                var imgTop = 100;
                
                // Scroll the first image into view
                if (distanceFromTop > 0 && distanceFromTop < this.viewHeight) {
                    imgTop = 100 - ((st - (top - this.viewHeight)) / this.viewHeight) * 100;
                } else if (distanceFromBottom > 0) {
                    // Scroll last image when user reaches the bottom of the component
                    imgTop = -(distanceFromBottom / this.viewHeight) * 100;
                } else if (distanceFromTop > this.viewHeight) {
                    imgTop = 0;
                }
                
                this.$('.bgscroll-images').css({ top: imgTop + '%' });

                if (iStart === 1) {
                    opacity = st + this.viewHeight >= top - 60 ? 1 : 0;
                    this.$images[0].style.opacity = opacity;
                }

                for (var i = iStart; i < this.numItems; i++) {
                    var item = this.$children.eq(i);
                    var diff = item.offset().top - st - (this.viewHeight / 2);
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
            this.el.style.paddingBottom = this.viewHeight / 2 + 'px';
            _.each(this.$children, function(el) {
                var $el = $(el);
                var padding = (this.viewHeight - $el.height()) / 2 + 'px 0';
                $el.css({ padding: padding });
            }, this);
        },

        setCurrItem: function(i) {
            this.currItem = i;
        },

        onRemove: function() {
            $(window).off('scroll.bgScroll');
            this.remove();
        }
    });

});
