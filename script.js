document.addEventListener('DOMContentLoaded', function () {
    // Initialize Vanta.js Background
    if (typeof VANTA !== 'undefined' && VANTA.FOG) {
        VANTA.FOG({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 700.00,
            minWidth: 300.00,
            highlightColor: 0xc31432,
            midtoneColor: 0x240b36,
            lowlightColor: 0x2900ff,
            baseColor: 0x000000,
        });
    }
   
});
