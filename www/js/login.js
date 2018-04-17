$(function(){
  $.ajax({
    url:"http://localhost/drupal/?q=services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
    success: function (token) {
      $('#login_submit').click(function(){
        var name = $('#userName').val();
        if (!name) { alert('Please enter your user name.'); return false; }
        var pass = $('#userPass').val();
        if (!pass) { alert('Please enter your password.'); return false; }
    
        // BEGIN: drupal services user login
        $.ajax({
          url: "http://localhost/drupal/?q=my_services/user/login.json",
          type: 'post',
          data: 'username=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(pass),
          dataType: 'json',
          beforeSend: function (request) {
            request.setRequestHeader("X-CSRF-Token", token);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
          },
          success: function (data) {
            alert('Succesfully Logged in as ' + name + '. \n\n' + ' Kindly press OK to continue');
            window.location.replace("index.html", "slideup");
          }
        });
        // END: drupal services user login
      });
    }
  });
    return false;
});