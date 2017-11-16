
jQuery(function(){

    var time = 5.0;
    var clickCount = 0;

    setInterval(function(){
        if (clickCount > 0 && time > 0) {
            time -= 0.01;
        }
        if (time < 0) {
            time = 0.00;
        }
        $('#time').html("time: " + time.toFixed(2));
    },10);

    $('#click_button').on('click', function(){
        if (time > 0) {
            clickCount++;
        }
        $('#click_count').html("クリック数: " + clickCount);
    });

    $('#reset_button').on('click', function(){
        clickCount = 0;
        time = 5.0;
        $('#time').html("time: " + time.toFixed(2));
        $('#click_count').html("クリック数: " + clickCount);
    });
});
