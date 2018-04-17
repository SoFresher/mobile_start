$(function () {

  var nid; // global node id variable
  $.ajax({
    url:"http://localhost/drupal/?q=services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
    success: function (token) {
      // $('#page_dashboard').beforeonload(function(){
        $.ajax({
          url: "http://localhost/drupal/?q=my_services/system/connect.json",
          type: 'post',
          dataType: 'json',
          beforeSend: function (request) {
            request.setRequestHeader("X-CSRF-Token", token);
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('page_dashboard - failed to system connect');
            console.log(JSON.stringify(XMLHttpRequest));
            console.log(JSON.stringify(textStatus));
            console.log(JSON.stringify(errorThrown));
          },
          success: function (data) {
            var drupal_user = data.user;
            if (drupal_user.uid == 0) { // user is not logged in, show the login button, hide the create article button, hide the logout button
              $('#login').show();
              $('#register').show();
              $('#logout').hide();
              $('#createPage').hide();
              $('#viewPage').hide();
              $('#viewLec').hide();
            }
            else { // user is logged in, hide the login button, show the crate article button, show the logout button
              $('#login').hide();
              $('#register').hide();
              $('#logout').show();
              $('#createPage').show();
              $('#viewPage').show();
              $('#viewLec').show();
            }
          }
        });
      // });
    }
  });

  $('#login').click(function(){
    window.location.replace("./Login.html");
  });    
  $('#register').click(function(){
    window.location.replace("./register.html");
  });  
  $('#createPage').click(function(){
    window.location.replace("./createPage.html");
  });
  $('#viewPage').click(function(){
    window.location.replace("./pageList.html");
  });
  $('#viewLec').click(function(){
    window.location.replace("./testPage.html");
  });  
});
  