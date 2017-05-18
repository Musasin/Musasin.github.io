const KEY_CODE_LEFT=37;
const KEY_CODE_RIGHT=39;
const KEY_CODE_UP=38;
const KEY_CODE_DOWN=40;

const MIN_POSITION=0;
const MAX_POSITION=2;

var character = function(position){
    this.position = position;
};
var pakumen = new character(1);

$(window).keydown(function(e){
    switch(e.keyCode) {
        case KEY_CODE_UP:
            if(pakumen.position < MAX_POSITION) {
                pakumen.position += 1;
                console.log( pakumen.position );
                $('#pakumen').animate({
                    marginTop: '-=150px'
                }, 200);
            }
            break;
        case KEY_CODE_DOWN:
            if(pakumen.position > MIN_POSITION) {
                pakumen.position -= 1;
                console.log(pakumen.position);
                $('#pakumen').animate({
                    marginTop: '+=150px',
                    queue: false
                }, 200);
            }
            break;
        default:
            break;
    }
});
