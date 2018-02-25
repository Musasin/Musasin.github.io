
jQuery(function() {

    var MODE = {
        NONE: 0,
        OBJECT_SELECTED: 1,
        PLAYER_WIN: 2,
        ENEMY_WIN: 3
    };
    var nowMode = MODE.NONE;
    var nowSelectionObject;
    var nowSelectionSquare = 0;
    var turn = 1;
    var isPlayerTurn = true;
    
    $('.square').on('click', function(){
        isPlayerTurn = (turn % 2 == 1);
        
        var targetObject = null;
        var isPlayerObject = null;
        var isEnemyObject  = null;

        var children = $('#' + this.id).children('div');
        if (children.length == 1) {
            targetObject = children[0];
            isPlayerObject = targetObject != null && $('#' + targetObject.id).hasClass('player-object');
            isEnemyObject  = targetObject != null &&$('#' + targetObject.id).hasClass('enemy-object');
        }
        
        switch (nowMode) {
            case MODE.NONE:
                if (targetObject != null &&
                    (isPlayerTurn && isPlayerObject || !isPlayerTurn && isEnemyObject)) {
                    nowSelectionObject = targetObject.id;
                    nowMode = MODE.OBJECT_SELECTED;
                    nowSelectionSquare = Number(this.id);
                    $('#' + nowSelectionObject).css({'background-color':'#FAA'});   
                }
                break;
            case MODE.OBJECT_SELECTED:
                if (targetObject != null &&
                    (isPlayerTurn && isPlayerObject || !isPlayerTurn && isEnemyObject)) {

                    // 選択対象の入れ替え
                    $('#' + nowSelectionObject).css({'background-color':'transparent'})
                    nowSelectionObject = targetObject.id;
                    nowSelectionSquare = Number(this.id);
                    $('#' + nowSelectionObject).css({'background-color':'#FAA'});
                    break;
                }
                var newPosition = Number(this.id);
                var isInRange = false;
                var okPosition = [];
                switch (nowSelectionObject) {
                    case 'player-hiyoko':
                    case 'enemy-hiyoko':
                        if ((newPosition == nowSelectionSquare - 10 && isPlayerTurn) ||
                            (newPosition == nowSelectionSquare + 10 && !isPlayerTurn)) {
                            isInRange = true;
                        }
                        break;
                    case 'player-kirin':
                    case 'enemy-kirin':
                        okPosition = [nowSelectionSquare - 11, nowSelectionSquare + 11, nowSelectionSquare + 9, nowSelectionSquare - 9];
                        if (okPosition.some(function(v){ return v == newPosition})) {
                            isInRange = true;
                        }
                        break;
                    case 'player-zou':
                    case 'enemy-zou':
                        okPosition = [nowSelectionSquare - 10, nowSelectionSquare + 10, nowSelectionSquare + 1, nowSelectionSquare - 1];
                        if (okPosition.some(function(v){ return v == newPosition})) {
                            isInRange = true;
                        }
                        break;
                    case 'player-lion':
                    case 'enemy-lion':
                        okPosition = [nowSelectionSquare - 11, nowSelectionSquare + 11, nowSelectionSquare + 9, nowSelectionSquare - 9, 
                                      nowSelectionSquare - 10, nowSelectionSquare + 10, nowSelectionSquare + 1, nowSelectionSquare - 1];
                        if (okPosition.some(function(v){ return v == newPosition})) {
                            isInRange = true;
                        }
                        break;
                    case 'player-niwatori':
                        // atode
                        break;
                    default:
                        break;
                }
                if (isInRange) {
                    var isSuccessMovement;
                    if ((isPlayerTurn && isPlayerObject) || !isPlayerTurn && isEnemyObject) {
                        // 自分のコマの上には移動できない
                        isSuccessMovement = false;
                    } else if(isPlayerObject || isEnemyObject) {
                        // 移動さきのオブジェクトを削除
                        if (targetObject.id == 'enemy-lion') {
                            nowMode = MODE.PLAYER_WIN;
                            $('#player-win').css({display:'block'});
                            $('#enemy-lose').css({display:'block'});
                            $('#retry').css({display:'block'});
                        } else if (targetObject.id == 'player-lion') {
                            nowMode = MODE.ENEMY_WIN;
                            $('#enemy-win').css({display:'block'});
                            $('#player-lose').css({display:'block'});
                            $('#retry').css({display:'block'});
                        }
                        $('#' + this.id).empty();
                        isSuccessMovement = true;
                    } else {
                        isSuccessMovement = true;
                    }
                    
                    if (isSuccessMovement) {
                        // 背景色をを消した上で移動
                        $('#' + this.id).append($('#' + nowSelectionObject).css({'background-color':'transparent'}));

                        // 移動元にあったオブジェクトを削除
                        $('#' + nowSelectionSquare).empty();
                        if (nowMode == MODE.OBJECT_SELECTED) {
                            nowMode = MODE.NONE;
                        }
                        turn++;
                    }
                }
        }
        console.log(nowSelectionSquare);
        console.log(nowMode);
        console.log(nowSelectionObject);
    });

    $('.retry-button').on('click', function(){
        location.reload();
    });
});
