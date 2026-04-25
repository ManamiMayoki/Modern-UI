/**
 * Premium Parallax Script
 * Optimized for hardware acceleration and smooth footer reveal
 */

$(window).on("load", function () {
    // 1. Initialize Dimensions
    const $window = $(window);
    const $mainContainer = $("#scroll-animate-main");
    const $scrollContainer = $("#scroll-animate");
    const $header = $("header");
    const $footer = $("footer");
    const $wrapper = $(".wrapper-parallax");

    function updateDimensions() {
        const windowHeight = $window.height();
        const footerHeight = $footer.outerHeight();
        const contentHeight = $(".content").outerHeight();

        // The "fake" height allows the browser to have a scrollbar
        const totalHeight = windowHeight + contentHeight + footerHeight;

        $scrollContainer.css("height", totalHeight + "px");
        $mainContainer.css("height", totalHeight + "px");
        
        // Push content down so it starts after the full-screen header
        $wrapper.css("margin-top", windowHeight + "px");
        
        return { windowHeight, footerHeight, contentHeight, totalHeight };
    }

    // Initialize dimensions on load
    let dims = updateDimensions();

    // Re-calculate dimensions if user resizes window
    $window.on("resize", function() {
        dims = updateDimensions();
    });

    // 2. Scroll Logic
    $window.on("scroll", function () {
        const scroll = $window.scrollTop();

        // Move the main wrapper upwards using GPU-accelerated Transform
        $mainContainer.css({
            "transform": "translateY(-" + scroll + "px)",
            "-webkit-transform": "translateY(-" + scroll + "px)"
        });

        // Parallax Effect: Slowly shift the background image position
        // This creates a sense of depth as the header disappears
        const bgShift = 50 + (scroll / dims.totalHeight * 100);
        $header.css({
            "background-position-y": bgShift + "%"
        });

        /**
         * Footer "Reveal" Logic
         * The footer is fixed at the bottom (z-index: 1).
         * The content (z-index: 2) slides over it.
         * We ensure the footer is only "active" when the scroll reaches the end.
         */
        const scrollTrigger = dims.contentHeight;

        if (scroll >= scrollTrigger) {
            $footer.css({
                "visibility": "visible",
                "opacity": "1"
            });
        } else {
            $footer.css({
                "visibility": "hidden",
                "opacity": "0"
            });
        }
    });
});