// Copyright © Mackan <thormax5@gmail.com>

var s = 0; // State
var diff = "medium"; // Diffculty
var cool = false; // Cooldown
var coolTime = 250; // Cooldown time
var sX = 1; // Selection X
var sY = 1; // Selection Y
var time = 2500; // Time between boxes
var score = 0; // Score
var boxX; // Box X
var boxY; // Box Y
var gameTime = 60; // Game length in seconds
var gamePlay = false; // Is game in progress
var colors = ["green", "yellow", "blue"]; // Colors
var color = 0; // Current color
var pressed = [];
var pressing = false;
var pressCool = false;
var ptc = 10;

var keys = { // Keys
  arrows:{
    left: 37,
    up: 38,
    right: 39,
    down: 40
  },
  regular: {
    enter: 13,
    a: 65,
    b: 66,
    space: 32,
    x: 88,
    y: 89
  },
  custom: {
    back: 2000,
    select: 2001,
    lb: 2002,
    rb: 2003,
    lt: 2004,
    rt: 2005,
    start: 2006,
    stick1: 2007,
    stick2: 2008
  }
};

var xbox = {};

// Stats

var stats = {
  clicked: 0,
  played: 0,
  time: 0,
  highscore: 0
};


// Time formatting

function fTime(seconds) {
  var sec_num = parseInt(seconds, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  var time = minutes+':'+seconds;
  return time;
}

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

function antiScroll(){
  window.scrollTo(0, 0);
}

// Random number in range

function rNum(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Gameframe away

$("#game").css("display", "none");

// Hide gameover

$("#over").css("display", "none");
$("#highscore").css("display", "none");

// Hide stats

$("#statsI").css("display", "none");

// Hide other stuff

$("#codeIn").css("display", "none");

// Time thing set

$("#tim").html(fTime(gameTime));

function setTime(){
  stats.time++;
  $("#time").html(fTime(gameTime));
}

// Actual game

function setGame(){
  if(diff == "easy"){
    time = 1000;
    coolTime = 900;
    drawGame();
  }else if(diff == "medium"){
    time = 500;
    coolTime = 400;
    drawGame();
  }else if(diff == "hard"){
    time = 250;
    coolTime = 150;
    drawGame();
  }else if(diff == "extreme"){
    time = 100;
    coolTime = 50;
    drawGame();
  }else if(diff == "uber"){
    time = 10;
    coolTime = 2;
    drawGame();
  }else if(diff == "stats"){
    if(!cool){
        s = 6;
        $("#statsI").css("display", "");
        $("#menu").css("display", "none");
        //$("#menu").css("display", "");
        $("#"+diff).removeClass("selected");
        diff = "back";
        $("#"+diff).addClass("selected");
        $("#stats-caught").html(stats.clicked);
        $("#stats-played").html(stats.played);

        s = 6;
      }
  }
}


function drawGame(){

  stats.played++;  

  $("#game").css("display", "");
  var boxes = $(".box");
  $(".box").removeClass("red");
  $("#over").css("display", "none");
  gamePlay = true;
  

  $(boxes[rNum(0, boxes.length-1)]).addClass(colors[color]);

  setInterval(function(){
    if(gamePlay){
      $(".box").removeClass("green").removeClass("yellow").removeClass("blue");
      boxX = rNum(1, 5);
      boxY = rNum(1, 5);

      var cChance = rNum(0, 1000);
      var cMax = 0;

      if(cChance <= 900){
        cMax = 0;
      }else if(cChance >= 901 && cChance <= 998){
        cMax = colors.length-2;
      }else if(cChance >= 999 && cChance <= 1000){
        cMax = colors.length-1;
      }

      color = rNum(0, cMax);

      if(boxX == sX && boxY == sY){
        boxX = rNum(1, 5);
        boxY = rNum(1, 5);
      }

      $(".box").removeClass("green").removeClass("yellow").removeClass("blue");
      $("#g"+boxY+"-"+boxX).addClass(colors[color]);
      cMax = 0;
    }
  }, time);
}

setTime();

function gameOver(){
  gamePlay = false;
  $(".box").removeClass("green").removeClass("yellow").removeClass("blue").addClass("red");
  $("#over").css("display", "");
  s = 2;
  if(score > stats.score){
    $("#highscore").css("display", "");
  }
}

// Controls

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

function buttonHold(b){
  var x = 0;
  if(buttonPressed(b)){
    x++;
    if(x >= 10){
      return true;
    }
  }
  
}

function setBox(){
  $(".box").removeClass("box-select");
  $("#g"+sY+"-"+sX).addClass("box-select");
}

$(document).on("keydown", function(e){
  
  pressing = true;
  pressed.push(e.keyCode);
  if(e.keyCode == keys.arrows.up){
    // Arrow up
    e.preventDefault();
    if(s == 0){
      if(!cool){
        // Difficulty select
        antiScroll();
        removeClass($i(diff), "selected");
        if(diff == "easy"){
          diff = "stats";
        }else if(diff == "medium"){
          diff = "easy";
        }else if(diff == "hard"){
          diff = "medium";
        }else if(diff == "extreme"){
          diff = "hard";
        }else if(diff == "uber"){
          diff = "extreme";
        }else if(diff == "stats"){
          diff = "uber";
        }
        
        addClass($i(diff), "selected");
        cool = true;
        antiScroll();
        e.preventDefault();
      }

    }else if(s == 1){
      // Game
      if(sX == 1 && sY <= 5 && sY > 1){
        sY--;
      }else if(sX == 2 && sY <= 5 && sY > 1){
        sY--;
      }else if(sX == 3 && sY <= 5 && sY > 1){
        sY--;
      }else if(sX == 4 && sY <= 5 && sY > 1){
        sY--;
      }else if(sX == 5 && sY <= 5 && sY > 1){
        sY--;
      }


      setBox();
    }
  }else if(e.keyCode == keys.arrows.down){
    // Arrow down
    e.preventDefault();
    if(s == 0){
      // Diff select
      antiScroll();
      if(!cool){
        removeClass($i(diff), "selected");
        if(diff == "easy"){
          diff = "medium";
        }else if(diff == "medium"){
          diff = "hard";
        }else if(diff == "hard"){
          diff = "extreme";
        }else if(diff == "extreme"){
          diff = "uber";
        }else if(diff == "uber"){
          diff = "stats";
        }else if(diff == "stats"){
          diff = "easy";
        }
        
        addClass($i(diff), "selected");
        cool = true;
        e.preventDefault();
        antiScroll();

      }

    }else if(s == 1){
      // Game
      if(sX == 1 && sY >= 1 && sY < 5){
        sY++;
      }else if(sX == 2 && sY >= 1 && sY < 5){
        sY++;
      }if(sX == 3 && sY >= 1 && sY < 5){
        sY++;
      }if(sX == 4 && sY >= 1 && sY < 5){
        sY++;
      }if(sX == 5 && sY >= 1 && sY < 5){
        sY++;
      }

      setBox();
    }
  }else if(e.keyCode == keys.arrows.left){
    // Arrow left
    e.preventDefault();
    if(s == 1){
      // Game
      if(sY == 1 && sX <= 5 && sX > 1){
        sX--;
      }else if(sY == 2 && sX <= 5 && sX > 1){
        sX--;
      }else if(sY == 3 && sX <= 5 && sX > 1){
        sX--;
      }else if(sY == 4 && sX <= 5 && sX > 1){
        sX--;
      }else if(sY == 5 && sX <= 5 && sX > 1){
        sX--;
      }

      setBox();
    }else if(s == 0){
      if(!cool){
        if(gameTime > 10){
          gameTime -= 5;
        }else{
          gameTime = 600;
        }
        $("#tim").html(fTime(gameTime));
        cool = true;
      }
    }
  }else if(e.keyCode == keys.arrows.right){
    // Arrow right
    e.preventDefault();
    if(s == 1){
      // Game
      if(sX >= 1 && sX < 5 && sY == 1){
        sX++;
      }else if(sX >= 1 && sX < 5 && sY == 2){
        sX++;
      }else if(sX >= 1 && sX < 5 && sY == 3){
        sX++;
      }else if(sX >= 1 && sX < 5 && sY == 4){
        sX++;
      }else if(sX >= 1 && sX < 5 && sY == 5){
        sX++;
      }

      setBox();
    }else if(s == 0){
      if(!cool){
        if(gameTime < 600){
          gameTime += 5;
        }else{
          gameTime = 10;
        }
        $("#tim").html(fTime(gameTime));
        cool = true;
      }
    }
  }else if(e.keyCode == keys.regular.enter){
    // Enter
    e.preventDefault();
    if(s == 0){
      // Diff select
      s = 1; // Game
      $("#menu").css("display", "none");
      setGame();
      setBox();
      setInterval(function(){
        if(gameTime == 0){
          gameOver();
          gameTime = 0;
          setTime();
        }else{
          if(gamePlay){
            gameTime--;
            setTime();
          }
        }
      }, 1000);
    }else if(s == 1){
      if(sY == boxY && sX == boxX){
        if(color == 0){
          score++;
        }else if(color == 1){
          score += 2;
        }else if(color == 2){
          score += 3;
        }
        boxY = -1;
        boxX = -1;
        color = -1;
        stats.clicked++;
        $(".box").removeClass("green").removeClass("yellow").removeClass("blue");
        $("#score").html(score);
      }
    }else if(s == 6){
      diff = "stats";
      $("#statsI").css("display", "none");
      $("#menu").css("display", "");
      $("#"+diff).addClass("selected");
      s = 0;
    }
  }else if(e.keyCode == keys.regular.space){
    // Spacebar
    e.preventDefault();
    var e = jQuery.Event("keydown");
    e.keyCode = 13;
    $(document).trigger(e);
  }else if(e.keyCode == keys.regular.x && !e.ctrlKey){
    // X
    //console.log(preS+" , "+s);
    if(s != 1){
      var preS = s;
      s = 4;

      swal({
        title: "Saved!",
        text: "",
        type: "input",
        closeOnConfirm: false,
        allowEscapeKey: false,
        animation: "slide-from-top",
        inputValue: btoa(JSON.stringify(stats))
      });

      // Swal button
      $(".confirm").on("click", function(){
        if(s == 4){
          s = preS;
          $(".confirm").off();
        }
      });
    }

  }else if(e.keyCode == keys.regular.y && !e.ctrlKey){
    // Y
    if(s != 1){
      var preS = s;
      s = 5;

      //$("#codeIn").css("display", "");

      $("body").append('<div class="sweet-overlay" tabindex="-1" style="opacity: 1.33; display: block;"></div>').append('<div id="codeIn" class="sweet-alert showSweetAlert show-input visible" data-custom-class="" data-has-cancel-button="false" data-has-confirm-button="true" data-allow-outside-click="false" data-has-done-function="false" data-animation="slide-from-top" data-timer="null" style="display: block; margin-top: -146px;"><div class="sa-icon sa-success" style="display: none;"><span class="sa-line sa-tip"></span><span class="sa-line sa-long"></span></div><h2>Savecode:</h2><input type="text" id="code"><button id="confirm" class="confirm" method="0">Load</button></div>');

      $(".confirm").on("click", function(){
        if(s == 5){
          s = preS;
          if($("#confirm").attr("method") == 0){
            $(".confirm").off();
            try{
              var tstats = JSON.parse(atob($("#code").val()));
              stats.clicked = tstats.clicked;
              stats.played = tstats.played;
              stats.time = tstats.time;
              stats.highscore = tstats.highscore;
            }catch(InvalidCharacterError){
              console.log("error");
            }
            $("#confirm").attr("method", "0");
            $("#code").val("");
            $("#codeIn").css("display", "none");
            $(".sweet-overlay").remove();
            $(".sweet-alert").remove();
          }else{
            $(".confirm").off();
            $("#confirm").attr("method", "0");
            $("#code").val("");
            $("#codeIn").css("display", "none");
            $(".sweet-overlay").remove();
            $(".sweet-alert").remove();

          }
          $("#codeIn").remove();
        }
      });
    }
  }
});

function gameLoop(){
  
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  if(!gamepads){
    return;
  }

  var gp = gamepads[0];

  if(buttonPressed(xbox.a)){
    // A button
    //console.log(buttonHold(gp.buttons[0]));
    if(s == 0){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.regular.enter;
      $(document).trigger(e);
    }else if(s == 1){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.regular.enter;
      $(document).trigger(e);
      cool = true;
    }else if(s == 3){
        var e = jQuery.Event("keydown");
        e.keyCode = keys.regular.enter;
        $(document).trigger(e);
        cool = true;
    }
  }else if(buttonPressed(xbox.dpad.up)){
    // Dpad Up
    var e = jQuery.Event("keydown");
    e.keyCode = keys.arrows.up;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.dpad.down)){
    // Dpad down
    var e = jQuery.Event("keydown");
    e.keyCode = keys.arrows.down;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.b)){
    // B button
    if(s == 2){
      // RESET
      location.reload();
    }else if(s == 4){
      $(".confirm").click();
    }else if(s == 5){
      // Remove fields
      $(".confirm").attr("method", "1");
      $(".confirm").click();
    }
  }else if(buttonPressed(xbox.dpad.left)){
    // Dpad left
    var e = jQuery.Event("keydown");
    e.keyCode = keys.arrows.left;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.dpad.right)){
    // Dpad right
    var e = jQuery.Event("keydown");
    e.keyCode = keys.arrows.right;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.x)){
    // X Button
    var e = jQuery.Event("keydown");
    e.keyCode = keys.regular.x;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.y)){
    // Y Button
    var e = jQuery.Event("keydown");
    e.keyCode = keys.regular.y;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.select)){ // Custom codes
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.back;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.start)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.start;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.lb)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.lb;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.rb)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.rb;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.lt)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.lt;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.rt)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.rt;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.stick1)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.stick1;
    $(document).trigger(e);
  }else if(buttonPressed(xbox.stick2)){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.custom.stick2;
    $(document).trigger(e);
  }

  if(Math.round(gp.axes[xbox.axes.sticks.right.y])+1 == xbox.axes.up){
    if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.up;
      $(document).trigger(e);
      pressCool = true;
    }
  }else if(Math.round(gp.axes[xbox.axes.sticks.right.y])+1 == xbox.axes.down){
    if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.down;
      $(document).trigger(e);
      pressCool = true;
    }
  }else if(Math.round(gp.axes[xbox.axes.sticks.right.x])+1 == xbox.axes.left){
    if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.left;
      $(document).trigger(e);
      pressCool = true;
    }
  }else if(Math.round(gp.axes[xbox.axes.sticks.right.x])+1 == xbox.axes.right){
  if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.right;
      $(document).trigger(e);
      pressCool = true;
    }
  }

  if(Math.round(gp.axes[xbox.axes.sticks.left.y])+1 == xbox.axes.up){
  if(!pressCool){
    var e = jQuery.Event("keydown");
    e.keyCode = keys.arrows.up;
    $(document).trigger(e);
    pressCool = true;
  }
  }else if(Math.round(gp.axes[xbox.axes.sticks.left.y])+1 == xbox.axes.down){
    if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.down;
      $(document).trigger(e);
      pressCool = true;
    }
  }else if(Math.round(gp.axes[xbox.axes.sticks.left.x])+1 == xbox.axes.left){
    if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.left;
      $(document).trigger(e);
      pressCool = true;
    }
  }else if(Math.round(gp.axes[xbox.axes.sticks.left.x])+1 == xbox.axes.right){
    if(!pressCool){
      var e = jQuery.Event("keydown");
      e.keyCode = keys.arrows.right;
      $(document).trigger(e);
      pressCool = true;
    }
  }

  start = requestAnimationFrame(gameLoop);
}

setInterval(function(){
  if(cool){
    cool = false;
  }
}, coolTime);

setInterval(function(){
  pressing = false;
}, 500);

// Add controller to keymap

var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

if(gamepads[0] != undefined){
  var gmp = gamepads[0];

  xbox = {
    a: gmp.buttons[0],
    b: gmp.buttons[1],
    x: gmp.buttons[2],
    y: gmp.buttons[3],
    lb: gmp.buttons[4],
    rb: gmp.buttons[5],
    lt: gmp.buttons[6],
    rt: gmp.buttons[7],
    select: gmp.buttons[8],
    start: gmp.buttons[9],
    stick1: gmp.buttons[10],
    stick2: gmp.buttons[11],
    dpad: {
      up: gmp.buttons[12],
      down: gmp.buttons[13],
      left: gmp.buttons[14],
      right: gmp.buttons[15]
    },
    axes: {
      sticks: {
        left: {
          x: 0,
          y: 1
        },
        right: {
          x: 2,
          y: 3
        }
      },
      up: 0,
      down: 2,
      left: 0,
      right: 2
    }
  };
}


// Totally not cheats

function arraysEqual(arr1, arr2){
  if(arr1.length !== arr2.length){
    return false;
  }
        
  for(var i = arr1.length; i--;){
    if(arr1[i] !== arr2[i]){
      return false;
    }
  }

  return true;
}

function beforeArray(array, value1, value2){
  if(array.indexOf(value1) > -1){
    if(array.indexOf(value2) > -1){
      var i = array.indexOf(value1);
      var i2 = array.indexOf(value2);

      if(i < i2){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }else{
    return false;
  }
}

// Seriously, this aray is NOT filled with the cheatcodes

var cheats = {
  konami: [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
  xbox: [keys.custom.rb, keys.custom.lb, keys.custom.rt, keys.custom.lt]
};

setInterval(function(){
  if(arraysEqual(pressed, cheats.konami)){
    $("body").addClass("konami");
    $("html").addClass("konami");

  }else if(arraysEqual(pressed, cheats.xbox)){
    console.log("God mode activated");
  }
  pressed = [];
}, 5000);

setInterval(function(){
  pressCool = false;
}, ptc);

setInterval(function(){
  if(!gamePlay){
    $("#tim").html(fTime(gameTime));
  }
}, 50);