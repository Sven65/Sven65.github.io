$(document).ready(function(){
    
    function load(){
        $.get( "js/config.json", function( data ) {
            nu = data['nu'],
            code = data['code'],
            tries = data['tries'],
            maxTries = data['maxTries'];
        });
    }
    
    function checkCode(){
        if(tries < maxTries){
            nu = nu.replace(/ok/g, '');
            if(nu == code){
                nu = '';
                $('#tries').html();
                $('#tries').html("Ok!");
            }else{
                tries += 1;
                $('#tries').html("Tries: "+String(tries)+"/"+String(maxTries));
                nu = '';
            }
        }else{
            $('#tries').html("Too many tries!");
        }
    }
    
    function construct(el){
        $(el).append("<div id='keys'><h2 id='display' class='keypad-text'>----</h2><h2 id='tries' class='keypad-text'></h2><button val='1' class='key keypad-key'>1</button><button val='2' class='key keypad-key'>2</button><button val='3' class='key keypad-key'>3</button><button val='4' class='key keypad-key'>4</button><button val='5' class='key keypad-key'>5</button><button val='6' class='key keypad-key'>6</button><button val='7' class='key keypad-key'>7</button><button val='8' class='key keypad-key'>8</button><button val='9' class='key keypad-key'>9</button><button val='clear' class='key keypad-key'>&#10006;</button><button val='0' class='key keypad-key'>0</button><button val='ok' class='key keypad-key'>&#10003;</button></div>")
    }
    
    $('.key').on('click',function(){
        num = $(this).attr('val');
        if(num != 'ok' || num != 'clear'){
            nu += num;
            nu = nu.replace(/ok/g, '');
            $('#display').html(nu);
        }
        if(String(num) == 'ok'){
            nu.replace(/ok/g, '');
            checkCode();
        }else if(String(num) == 'clear'){
            nu = '';
            $('#display').html(nu);
        }
    });
    load();
});
