
jQuery(function(){


    var isIncreasing = true;
    
    var power = 0.0;
    var aim= 0.0;
    var axis = 0.0;
    
    var minPower = 0.0;
    var maxPower = 1.0;
    var powerGaugeHeight = 0;
    var powerGaugeMaxHeight = 248;
    
    var minAim = 0.0;
    var maxAim = 1.6;
    var bestAim = 0.8;
    
    var minAxis = 0.0;
    var maxAxis = 1.0;
    var bestAxis = 0.5;
    
    var SCENES = {
        WAITING : 1,
        START : 2,
        FIRST : 3,
        SECOND : 4,
        THIRD : 5,
        END : 6
    };
    var scene = SCENES.WAITING;
    setInterval(function() {
        $('#yellow-circle').animate({width: '-=200', height: '-=200', margin: '+=100', opacity: '+=0.5'}, 300)
            .animate({width: '+=200', height: '+=200', margin: '-=100', opacity: '-=0.5'}, 0);
    },300);
    setInterval(function(){
        
        switch (scene) {
            case SCENES.WAITING:
                break;
            case SCENES.START:
                break;
            case SCENES.FIRST:
                if (isIncreasing) {
                    power += 0.01;
                } else {
                    power -= 0.01;
                }
                if (power <= minPower) {
                    isIncreasing = true;
                } else if (power >= maxPower) {
                    isIncreasing = false;
                }
                powerGaugeHeight = powerGaugeMaxHeight / maxPower * power;
                $('#power-gauge').css('height', powerGaugeHeight)
                    .css('margin-top', powerGaugeMaxHeight - powerGaugeHeight);
                $('#power').html("power: " + power.toFixed(2));
                break;
            case SCENES.SECOND:
                if (isIncreasing) {
                    aim += 0.01;
                } else {
                    aim -= 0.01;
                }
                if (aim <= minAim) {
                    isIncreasing = true;
                } else if (aim >= maxAim) {
                    isIncreasing = false;
                }
                $('#aim').html("aim: " + aim.toFixed(2));
                break;
            case SCENES.THIRD:
                if (isIncreasing) {
                    axis += 0.01;
                } else {
                    axis -= 0.01;
                }
                if (axis <= minAxis) {
                    isIncreasing = true;
                } else if (axis >= maxAxis) {
                    isIncreasing = false;
                }
                $('#axis').html("axis: " + axis.toFixed(2));
                break;
            case SCENES.END:
                break;
        }
    },10);

    $('#click_button').on('click', function(){
        scene++;
        isIncreasing = true;
        $('#now_mode').html("now: " + scene);


        var titleDisplayObject = $('#title-display');
        var ganeDisplayObject = $('#game-display');
        switch (scene) {
            case SCENES.WAITING:
                titleDisplayObject.css('display', 'block');
                ganeDisplayObject.css('display', 'none');
                break;
            case SCENES.START:
                titleDisplayObject.css('display', 'none');
                ganeDisplayObject.css('display', 'block');
                scene = SCENES.FIRST;
                break;
            case SCENES.FIRST:
                break;
            case SCENES.SECOND:
                break;
            case SCENES.THIRD:
                break;
            case SCENES.END:
                break;
        }
    });

    $('#reset_button').on('click', function(){
        power = 0.0;
        aim= 0.0;
        axis = 0.0;
        scene = SCENES.WAITING;
        $('#power').html("power: " + power.toFixed(2));
        $('#aim').html("aim: " + aim.toFixed(2));
        $('#axis').html("axis: " + axis.toFixed(2));
        $('#now_mode').html("now: " + scene);
        $('#title-display').css('display', 'block');
        $('#game-display').css('display', 'none');
    });
});
