
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
            isEnemyObject  = targetObject != null && $('#' + targetObject.id).hasClass('enemy-object');
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
                var isCapturedObject = $('#' + nowSelectionObject).hasClass('captured-object');
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
                var changeNiwatori = false;
                switch (nowSelectionObject) {
                    case 'player-hiyoko':
                    case 'enemy-hiyoko':
                        if (isCapturedObject) {
                            if (!isPlayerObject && !isEnemyObject) {
                                var ngPosition;
                                if (isPlayerTurn) {
                                    ngPosition = [11, 12, 13];
                                } else {
                                    ngPosition = [41, 42, 43];
                                }
                                if (!ngPosition.some(function(v){ return v == newPosition})) {
                                    isInRange = true;
                                }
                            }
                        } else {
                            if ((newPosition == nowSelectionSquare - 10 && isPlayerTurn) ||
                                (newPosition == nowSelectionSquare + 10 && !isPlayerTurn)) {
                                isInRange = true;

                                if (newPosition <= 13 && isPlayerTurn) {
                                    changeNiwatori = true;
                                }
                                if (newPosition >= 41 && !isPlayerTurn) {
                                    changeNiwatori = true;
                                }
                            }
                        }
                        break;
                    case 'player-kirin':
                    case 'enemy-kirin':
                        if (isCapturedObject) {
                            if (!isPlayerObject && !isEnemyObject) {
                                isInRange = true;
                            }
                        } else {
                            okPosition = [nowSelectionSquare - 11, nowSelectionSquare + 11, nowSelectionSquare + 9, nowSelectionSquare - 9];
                            if (okPosition.some(function(v){ return v == newPosition})) {
                                isInRange = true;
                            }   
                        }
                        break;
                    case 'player-zou':
                    case 'enemy-zou':
                        if (isCapturedObject) {
                            if (!isPlayerObject && !isEnemyObject) {
                                isInRange = true;
                            }
                        } else {
                            okPosition = [nowSelectionSquare - 10, nowSelectionSquare + 10, nowSelectionSquare + 1, nowSelectionSquare - 1];
                            if (okPosition.some(function (v) {
                                    return v == newPosition
                                })) {
                                isInRange = true;
                            }
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
                    case 'enemy-niwatori':
                        if (isPlayerTurn) {
                            okPosition = [nowSelectionSquare - 11,                                                  nowSelectionSquare - 9,
                                          nowSelectionSquare - 10, nowSelectionSquare + 10, nowSelectionSquare + 1, nowSelectionSquare - 1];
                        } else {
                            okPosition = [                         nowSelectionSquare + 11, nowSelectionSquare + 9, 
                                          nowSelectionSquare - 10, nowSelectionSquare + 10, nowSelectionSquare + 1, nowSelectionSquare - 1];
                        }
                        if (okPosition.some(function(v){ return v == newPosition})) {
                            isInRange = true;
                        }
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
                        // 勝敗判定
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
                        } else {
                            // 決着が付いていない場合、持ち駒に加える
                            var capturedId;
                            var objectName = targetObject.id.split('-')[1];
                            // 鶏はひよこに戻す
                            if (objectName == 'niwatori') {
                                objectName = 'hiyoko';
                                if (isPlayerObject) {
                                    if (targetObject.id == 'player-niwatori') {
                                        $('#' + targetObject.id).empty().attr('id', 'player-hiyoko').append('<img src="images/game/shougi/animal_mark_hiyoko.png" style="width:100%; height:100%; transform:rotate(180deg);">');
                                    } else {
                                        $('#' + targetObject.id).empty().attr('id', 'enemy-hiyoko').append('<img src="images/game/shougi/animal_mark_hiyoko.png" style="width:100%; height:100%; transform:rotate(180deg);">');
                                    }
                                } else {
                                    if (targetObject.id == 'player-niwatori') {
                                        $('#' + targetObject.id).empty().attr('id', 'player-hiyoko').append('<img src="images/game/shougi/animal_mark_hiyoko.png" style="width:100%; height:100%;">');
                                    } else {
                                        $('#' + targetObject.id).empty().attr('id', 'enemy-hiyoko').append('<img src="images/game/shougi/animal_mark_hiyoko.png" style="width:100%; height:100%;">');
                                    }
                                }
                            }
                            if (isPlayerObject) {
                                capturedId = 'enemy-captured-piece-' + objectName;
                                $('#' + targetObject.id).removeClass('player-object').addClass('enemy-object').addClass('captured-object').children('img').css({transform:'rotate(180deg)'});
                            } else {
                                capturedId = 'player-captured-piece-' + objectName;
                                $('#' + targetObject.id).removeClass('enemy-object').addClass('player-object').addClass('captured-object').children('img').css({transform:'rotate(0deg)'});
                            }
                            if ($('#' + capturedId + '-1').children('div').length >= 1) {
                                capturedId = capturedId + '-2';
                            } else {
                                capturedId = capturedId + '-1';
                            }
                            $('#' + capturedId).append($('#' + targetObject.id));
                        }
                        
                        // 移動さきのオブジェクトを削除
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

                        // 鶏化チェック
                        if (changeNiwatori) {
                            var newId;
                            if (nowSelectionObject == 'player-hiyoko') {
                                newId = 'player-niwatori';
                            } else {
                                newId = 'enemy-niwatori';
                            }
                            if (isPlayerTurn) {
                                $('#' + newPosition).html('<div id="' + newId + '" class="player-object"><img src="images/game/shougi/animal_mark_niwatori.png" style="width:100%; height:100%;"></div>');
                            } else {
                                $('#' + newPosition).html('<div id="' + newId + '" class="enemy-object"><img src="images/game/shougi/animal_mark_niwatori.png" style="width:100%; height:100%; transform:rotate(180deg);"></div>');
                            }
                        }

                        if (isCapturedObject) {
                            $('#' + nowSelectionObject).removeClass('captured-object');
                        }
                        
                        turn++;
                    }
                }
        }
    });

    $('.retry-button').on('click', function(){
        location.reload();
    });
});
