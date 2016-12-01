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
    $('#tries').html("Tries: 0/"+String(maxTries));
});
