
jQuery(function(){


    var isIncreasing = true;
    
    var power = 0.0;
    var aim = 1.6;
    var result = 0.0;
    
    var minPower = 0.0;
    var maxPower = 1.0;
    var powerGaugeHeight = 0;
    var powerGaugeMaxHeight = 248;
    
    var minAim = 0.0;
    var maxAim = 1.6;
    var bestAim = 0.8;
    var aimGaugeMargin = 295;
    var aimGaugeMinMargin = 50;
    var aimGaugeMaxMargin = 295;

    var reachPoint = '';
    var comment = '';

    var SCENES = {
        WAITING : 1,
        START : 2,
        FIRST : 3,
        SECOND : 4,
        SHOT : 5,
        END : 6
    };
    var scene = SCENES.WAITING;
    setInterval(function() {
        if (scene < SCENES.SHOT) {
            $('#yellow-circle').animate({width: '-=200', height: '-=200', margin: '+=100', opacity: '+=0.5'}, 300)
                .animate({width: '+=200', height: '+=200', margin: '-=100', opacity: '-=0.5'}, 0);
        }
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
                $('#power-data').html("power: " + power.toFixed(2));
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
                aimGaugeMargin = aimGaugeMinMargin + ((aimGaugeMaxMargin - aimGaugeMinMargin)/ maxAim * aim);
                $('#aim-gauge').css('margin-top', aimGaugeMargin);
                $('#aim-data').html("aim: " + aim.toFixed(2));
                break;
            case SCENES.SHOT:
                
                break;
            case SCENES.END:
                break;
        }
    },10);

    $('#click_button').on('click', function(){
        scene++;
        isIncreasing = true;
        $('#now_mode').html("now: " + scene);


        
        switch (scene) {
            case SCENES.WAITING:
                $('#title-display').css('display', 'block');
                $('#game-display').css('display', 'none');
                break;
            case SCENES.START:
                $('#title-display').css('display', 'none');
                $('#game-display').css('display', 'block');
                $('#power').css('display', 'block');
                scene = SCENES.FIRST;
                break;
            case SCENES.FIRST:
                break;
            case SCENES.SECOND:
                $('#yellow-circle').animate({width: '+=50', height: '+=50', margin: '-=25'}, 0);
    
                $('#power div').animate({width: '-=200', height: '-=200', 'margin': '+=100'}, 300, function() {
                    $('#power').css('display', 'none');
                });

                $('#aim').css('display', 'block');
                break;
            case SCENES.SHOT:
                $('#aim div').animate({width: '-=200', height: '-=200', margin: '+=100'}, 300, function() {
                    $('#aim').css('display', 'none');
                });
                
                var aimResult = (maxAim - Math.abs(bestAim - aim));
                result = Math.pow(aimResult, 3) * Math.pow(power, 3);
                
                $('#result-data').html("result: " + result.toFixed(2));
                
                $('#koa, #yellow-circle').animate({opacity: '-=1.0'}, 300, function() {
                    $('#koa-img').attr('src', 'images/game/chargeShot/koa2.png');
                    $('#yellow-circle').css({'margin-left': 200, width: 200, height:200});
                }).animate({opacity: '+=1.0'}, 300, function() {
                    
                    var gameDisplay = $('#game-display');
                    switch (true) {
                        case result > 4:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text08_kouseiroudousyou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:12000px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_building.png" height="200" style="position: absolute; margin-top: 100px; margin-left:11800px;" />');
                            reachPoint = (reachPoint == '' ? '厚生労働省' : reachPoint);
                            comment = (comment == '' ? '「ここを破壊し、労働という概念そのものを消し去るのだ...」' : comment);
                        case result > 3.9:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text06_zaimusyou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:11700px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_house.png" height="200" style="position: absolute; margin-top: 70px; margin-left:11200px;" />');
                            reachPoint = (reachPoint == '' ? '財務省' : reachPoint);
                            comment = (comment == '' ? '「とりあえず消費税を10倍にしましょう」' : comment);
                        case result > 3.7:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text_keishichou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:11100px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_building.png" height="200" style="position: absolute; margin-top: 40px; margin-left:10800px;" />');
                            reachPoint = (reachPoint == '' ? '警視庁' : reachPoint);
                            comment = (comment == '' ? '「官房長って実際どんなことする人なんですか？」' : comment);
                        case result > 3.5:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text03_soumusyou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:10500px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_house.png" height="200" style="position: absolute; margin-top: 40px; margin-left:10300px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_building.png" height="200" style="position: absolute; margin-top: 80px; margin-left:9800px;" />');
                            reachPoint = (reachPoint == '' ? '総務省' : reachPoint);
                            comment = (comment == '' ? '「キャッチフレーズは、「実はここにも総務省」」' : comment);
                        case result > 3:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text07_monbukagakusyou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:9000px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_house.png" height="200" style="position: absolute; margin-top: 80px; margin-left:8500px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_building.png" height="200" style="position: absolute; margin-top: 100px; margin-left:7000px;" />');
                            reachPoint = (reachPoint == '' ? '文部科学省' : reachPoint);
                            comment = (comment == '' ? '「学習やスポーツはもちろん、宗教に関する行政事務も行なっているそうです」' : comment);
                        case result > 2:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text13_boueisyou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:6000px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_house.png" height="200" style="position: absolute; margin-top: 20px; margin-left:5700px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_building.png" height="200" style="position: absolute; margin-top: 50px; margin-left:4500px;" />');
                            reachPoint = (reachPoint == '' ? '防衛省' : reachPoint);
                            comment = (comment == '' ? '「この位置、狙って出しづらいんですよ」': comment);
                        case result > 1:
                            gameDisplay.before('<img src="images/game/chargeShot/building_gyousei_text11_kokudokoutsusyou.png" height="200" style="position: absolute; margin-top: 300px; margin-left:3000px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_house.png" height="200" style="position: absolute; margin-top: 90px; margin-left:2700px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/jishin_building.png" height="200" style="position: absolute; margin-top: 100px; margin-left:2000px;" />');
                            gameDisplay.before('<img src="images/game/chargeShot/nozokimi_man.png" height="200" style="position: absolute; margin-top: 0px; margin-left:1500px;" />');
                            reachPoint = (reachPoint == '' ? '国土交通省' : reachPoint);
                            comment = (comment == '' ? '「もうちょっと頑張りましょ？」' : comment);
                        default:
                            comment = (comment == '' ? '「わざとやってます？」' : comment);
                            var reachDom = (reachPoint == '' ? '到達ならず...。' : '<p>' + reachPoint + 'まで到達!! </p>');
                            
                            $('#result-word').css({display: 'block', 'margin-left':(result * 3000 - 300)}).html(reachDom);
                            $('#tweet-button').css({display: 'block', 'margin-left':result * 3000});
                            $('#result-display > .reset-button').css({display: 'block', 'margin-left':result * 3000});
                            break;
                    }
                    $('#yellow-circle').animate({width: 3000 * result, opacity: '0.5'}, 300, function() {
                        $("html,body").animate({scrollLeft: 3000 * result}, 300 * result);
                    });
                });
                break;
            case SCENES.END:
                break;
        }
    });

    $('.reset-button').on('click', function(){
        location.reload();
    });
    
    $('#tweet-button').on('click', function(){
        var powerComment = "";
        if (reachPoint == '') {
            powerComment = (result * 3000).toFixed(2) + "パワーで到達ならず。 ";
        } else {
            powerComment = (result * 3000).toFixed(2) + "パワーで" + reachPoint + "まで到達!! ";
        }
        window.open(encodeURI('https://twitter.com/intent/tweet?text=' + powerComment + comment + " - チャージショットこあちゃん " + location.href))
    })
});
