jQuery(function(){
    var dpr = window.devicePixelRatio || 1;
    $('#unityContainer').css('width', 1024 * dpr);
    $('#unityContainer').css('height', 768 * dpr);
    $('#unityContainer').scale(1 / dpr, 1 / dpr);
});