
jQuery(function() {

    var min = 1;
    var count = 0;

    $('#click_button').on('click', function(){
        var form = document.forms.diceForm;
        var diceCount = form.diceCount.value;
        var maxValue = form.maxValue.value;
        
        if (isNaN(diceCount) || isNaN(maxValue)) {
            $('#result').append('<div class="row" style="text-align: center;">数字以外が含まれてるよ！</div>');
            return;
        }
        count++;

        var i;
        var result;
        var sum = 0;
        $('#result').append('<div id="detail' + count + '" class="row">');
        for (i = 1; i <= diceCount; i++) {
            result = Math.floor(Math.random() * maxValue) + min;
            sum += result;
            $('#detail' + count).append('<div class="col-xs-1">' + result + '</div>');
        }
        $('#result').append('</div>');
        $('#result').append(
            '<div id="sum" class="row" style="text-align:center; font-size:20px;">' + count + '回め 合計: ' + sum + ', 平均: ' + sum / diceCount + '</div>'
        );
    });
    $('.reset-button').on('click', function(){
        location.reload();
    });
});
