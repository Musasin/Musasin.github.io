const KEY_CODE_LEFT=37;
const KEY_CODE_RIGHT=39;
const KEY_CODE_UP=38;
const KEY_CODE_DOWN=40;

const MIN_POSITION=0;
const MAX_POSITION=2;

var character = function(position){
    this.position = position;
};
var pakumen = new character(2);
var isAteming = false;

$(window).keydown(function(e){
    if (isAteming) {
        return;
    }
    switch(e.keyCode) {
        case KEY_CODE_RIGHT:
            isAteming = true;
            $('#pakumen').animate({marginLeft: '+=50px'}, 50).queue(function() {
                $(this).animate({marginLeft: '-=50px'}, 50).queue(function() {
                    isAteming = false;
                    $(this).dequeue();
                });
                $(this).dequeue();
            });
            break;
        case KEY_CODE_UP:
            if(pakumen.position < MAX_POSITION) {
                pakumen.position += 1;
                $('#pakumen').animate({
                    marginTop: '-=130px',
                    queue: false
                }, 100);
            }
            break;
        case KEY_CODE_DOWN:
            if(pakumen.position > MIN_POSITION) {
                pakumen.position -= 1;
                $('#pakumen').animate({
                    marginTop: '+=130px',
                    queue: false
                }, 100);
            }
            break;
        default:
            break;
    }
});
