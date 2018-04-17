$(function(){
  $('#logout').click(function(){
    $.ajax({
    url:"http://localhost/drupal/?q=services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
    success: function (token) {
      $.ajax({
        url: "http://localhost/drupal/?q=my_services/user/logout.json",
        type: 'post',
        dataType: 'json',
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert(JSON.stringify(errorThrown));
          // console.log(JSON.stringify(XMLHttpRequest));
          // console.log(JSON.stringify(textStatus));
          // console.log(JSON.stringify(errorThrown));
        },
         success: function (data) {
           alert("You are logging out.");
           window.location.replace("index.html", {reloadPage:true},{allowSamePageTranstion:true},{transition:'none'});
          }
          });
          // END: drupal services user login
      }
    });
    return false;
  });
});