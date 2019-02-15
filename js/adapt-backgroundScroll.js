define([
    'core/js/adapt',
    './BackgroundScrollView',
], function(Adapt, BackgroundScrollView) {

    Adapt.on('pageView:ready', function(view) {
        var config = view.model.get('_bgScroll');
        
        if (config && config._isEnabled) {
            new BackgroundScrollView({model: view.model});
        }
    });

});
