$(document).ready(function(){
  var Snoocore = window.Snoocore;
  var reddit = new Snoocore({userAgent: '/u/Mackan90095 RandRedd@0.0.1'});


  function get(sub){
    reddit("/r/"+sub+"/hot").listing({limit: 10}).then(function(slice){
      $("#link").text(slice.children);
   });
  }

 $('#btn').on("click", function(){
    var txt = $("#subs").val();
    get(txt);
 });
});
