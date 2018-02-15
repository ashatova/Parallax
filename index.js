(function ($) {
    var NUMBER_AFTER_DELIMITER = 2;

    $.fn.parallaxFooter = function (params) {
        var currentElement = $(this),
            prevElement = currentElement.prev(),
            options = $.extend({}, $.fn.parallaxFooter.defaults, params),
            units = options.overlay.replace(/[0-9]/g, ''),
            percentage = (units == 'px') ? (parseInt(options.overlay) * 100 / currentElement.height()) : parseInt(options.overlay);

        currentElement.wrap(options.wrapper.replace('{{element-height}}', currentElement.height()));

        options.style.transform = options.styleResult.replace('{{result}}', $.fn.parallaxFooter.getPercentage(currentElement, percentage));
        currentElement.css(options.style);

        $(window).on(options.transformEvent, function () {
            var isCurrentElementInScreen = $(window).scrollTop() + $(window).height() < prevElement.offset().top + prevElement.height();
            if (isCurrentElementInScreen) {
                options.style.position = 'absolute';
            } else {
                options.style.position = 'fixed';
            }

            options.style.transform = options.styleResult.replace('{{result}}', $.fn.parallaxFooter.getPercentage(currentElement, percentage));
            currentElement.css(options.style);
        });

        $(window).on('resize', function () {
            currentElement.parent().css({ 'padding-bottom': currentElement.height() });
        });
    };

    $.fn.parallaxFooter.defaults = {
        overlay: '50%',
        style: {
            position: 'fixed',
            bottom: '0'
        },
        wrapper: '<div style="position: relative;  padding-bottom:{{element-height}}px;"></div>',
        styleResult: 'translate3d(0, {{result}}%, 0)',
        transformEvent: 'scroll'
    };

    $.fn.parallaxFooter.getPercentage = function (wrap, params) {
        var element = wrap.parent()[0].getBoundingClientRect(),
            transformPercentage = Math.min(1, Math.max(0, (window.innerHeight - element.top) / element.height)),
            options = params.toFixed(NUMBER_AFTER_DELIMITER);

        return (100 * (1 - transformPercentage)) / (100 / (options));
    }

}(jQuery));
