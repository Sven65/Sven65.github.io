/*
  Copyright 2015 Mackan <thormax5@gmail.com>

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/


var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
var p = 0;
var gamepads = {};

function $i(id){
  return document.getElementById(id);
}

function hasClass(ele,cls){
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function removeClass(ele,cls){
    if(hasClass(ele,cls)){
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,' ');
    }
}

function addClass(ele, cls){
  ele.className = ele.className+" "+cls;
}

function deltaHandle(delta){
  if(delta == 120){
    if(p <= 99){
      p++;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(p-1));
      addClass($i("cirlI"), "progress-"+p);
    }else{
      p = 0;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(100));
      addClass($i("cirlI"), "progress-"+p);
    }

  }else if(delta == -120){
    if(p >= 1){
      p--;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(p+1));
      addClass($i("cirlI"), "progress-"+p);
    }else{
      p = 100;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(0));
      addClass($i("cirlI"), "progress-"+p);
    }
  }
}

 
if(document.attachEvent){
    document.attachEvent("on"+mousewheelevt, function(e){
      //console.log(e);
      deltaHandle(e.wheelDelta);
    });

}else if(document.addEventListener){
    document.addEventListener(mousewheelevt, function(e){
     //console.log(e);
      deltaHandle(e.wheelDelta);
    }, false);
}

// Gamepad

function gamepadHandler(event, connecting){
  var gamepad = event.gamepad;

  if(connecting){
    gamepads[gamepad.index] = gamepad;
  }else{
    delete gamepads[gamepad.index];
  }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

var interval;

if(!('ongamepadconnected' in window)){
  // No gamepad events available, poll instead.
  interval = setInterval(pollGamepads, 500);
}

function pollGamepads(){
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  for(var i = 0; i < gamepads.length; i++){
    var gp = gamepads[i];
    if(gp){
      gameLoop();
      clearInterval(interval);
    }
  }
}

function buttonPressed(b){
  if(typeof(b) == "object"){
    return b.pressed;
  }
  return b == 1.0;
}



function gameLoop(){
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if(!gamepads){
    return;
  }

  var gp = gamepads[0];

  if(buttonPressed(gp.buttons[0])){
    $("body").dblclick();
  }else if(buttonPressed(gp.buttons[1])){
    $(".confirm").click();
  }

  if(Math.round(gp.axes[3])+1 == 0 ){
    if(p <= 99){
      p++;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(p-1));
      addClass($i("cirlI"), "progress-"+p);
    }else{
      p = 0;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(100));
      addClass($i("cirlI"), "progress-"+p);
    }
  }else if(Math.round(gp.axes[3])+1 == 2){
    if(p >= 1){
      p--;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(p+1));
      addClass($i("cirlI"), "progress-"+p);
    }else{
      p = 100;
      $i("cirlL").innerHTML = p+'<span class="smaller">%</span>';
      removeClass($i("cirlI"), "progress-"+(0));
      addClass($i("cirlI"), "progress-"+p);
    }
  }

  start = requestAnimationFrame(gameLoop);
}

$("body").dblclick(function(e){
  swal("Progress", p+"%", "success");
  $("button").on("click", function(e){
    $("button").off("click");
  });
});

