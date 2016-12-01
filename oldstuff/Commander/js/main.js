$(document).ready(function() {

  if (annyang) {

    annyang.debug(true);

    var voice = false;
  

    console.log("Annyang loaded");
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'define *x': define,
      'out *text': out,
      'help': commands,
      'up *url': isup,
      'list *thing': list,
      'set *vari *option': set,
      'convert *amt *from to *to': convert
    };

      // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.

    annyang.start({ autoRestart: false, continuous: true });

  }
    // COMMANDS




      function commands(){
        out("<h1>Commands: </h1><br>define &lt;term&gt;<br>out &lt;term&gt;<br>help<br>up &lt;url&gt;<br>set &lt;variable&gt; &lt;on/off&gt;", true);
      }

      function set(vari, option){
        if(vari == "voice"){
            if(option == "on"){
              voice = true;
              out("Voice enabled", false);
            }else if(option == "off"){
              voice = false;
              out("Voice disabled", false);
            }else{
              out(option+" is not a option!", false);
            }
        }else{
          out("No such variable "+vari+"!", false);
        }
      }

      function list(thing){
        if(thing == "variables"){
          out("Variables: <br>Voice", true);
        }else{
          out("Can't list "+thing, false);
        }
      }

      function out(text, override){
        $('#out').html("");
        $('#out').html(text);
        if(voice && !override){
          responsiveVoice.speak(text);
        }
      }

      function isup(url){
        url = url.replace("http://", "").replace("www.", "").replace("https://", "");
        out("Checking if "+url+" is up!", false);
        $.ajax({
          url: "https://isitup.p.mashape.com/"+url+".json",
          beforeSend: function(xhr) { 
            xhr.setRequestHeader("X-Mashape-Key", "SzdL9CEQ81mshGutLDJEe2U0ADRkp1qUaLVjsnXabQW1hJfugX"); 
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          success: function (data) {
            var m = data['domain'];
            if(data['status_code'] == 1){
              m += " is up at port "+data['port'];
            }else{
              m += " isn't up.";
            }
            m += " Server at "+data['domain']+" responded with code "+data['response_code']+" in "+data['response_time']+" seconds";
            out(m, false);
          },
          error: function(){
            out("Cannot get data", false);
          }
        });
      }

      function define(x) {
        out("Defining "+x, false);
        $.ajax({
          url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term="+x,
          beforeSend: function(xhr) { 
            xhr.setRequestHeader("X-Mashape-Key", "SzdL9CEQ81mshGutLDJEe2U0ADRkp1qUaLVjsnXabQW1hJfugX"); 
          },
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json',
          processData: false,
          success: function (data) {
            var m = "Tags: ";
            for(i=0;i<data['tags'].length;i++){
              m+= data['tags'][i]+", ";
            }
            m += "<br><h1>Definitions for "+x+": </h1>";
            for(i2=0;i2<data['list'].length;i2++){
              m+="<div class='def'>"+data['list'][i2]['definition']+"</div>";
            }
            out(m, true);
          },
          error: function(){
            out("Cannot get data", false);
          }
        });
    }

    function convert(amt, from, to){
        out("Converting "+amt+" "+from+" to "+to, false);
        var convert = Qty.swiftConverter(from, to);
        var converted = convert(amt);
        out(amt+" "+from+" is "+converted+" "+to);
    }

  // TEXT HELPER

    function parseText(text){
      if(text.substring(0, 6) == "define"){
        define(text.replace("define", ""));
      }else if(text.substring(0, 3) == "out"){
        out(text.replace("text", ""));
      }else if(text.substring(0, 4) == "help"){
        out("<h1>Commands: </h1><br>define &lt;term&gt;<br>out &lt;term&gt;<br>help<br>up &lt;url&gt;<br>set &lt;variable&gt; &lt;on/off&gt;", true);
      }else if(text.substring(0, 2) == "up"){
        isup(text.replace("up", ""));
      }else if(text.substring(0, 4) == "list"){
        list(text.replace("list", ""));
      }else if(text.substring(0, 3) == "set"){
        var xx = text.replace("set", "").split(" ");
        set(xx[0], xx[1]);
      }else if(text.substring(0, 7) == "convert"){
        var yy = text.replace("convert", "").replace("to", "").split(" ");
        convert(yy[0], yy[1], yy[2]);
      }
    }


    $('#txt_btn').on('click', function(){
      var text = $('#text_in').val();
      $('#text_in').val("");
      parseText(text);
    });

});