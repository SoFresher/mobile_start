$(function(){
  $.ajax({
    url:"http://localhost/drupal/?q=services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
    success: function (token) {
      $('#register_submit').click(function(){
        var name = $('#userName').val();
        if (!name) { alert('Please enter your user name.'); return false; }
        var email = $('#userEmail').val();

        if (!email) { alert('Please enter your email address.'); return false; }
    
        // BEGIN: drupal services user login
        $.ajax({
          url: "http://localhost/drupal/?q=my_services/user/register.json",
          type: 'post',
          data: 'name=' + encodeURIComponent(name) + '&mail=' + encodeURIComponent(email),
          dataType: 'json',
          beforeSend: function (request) {
            request.setRequestHeader("X-CSRF-Token", token);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(JSON.stringify(errorThrown));
            // console.log(JSON.stringify(XMLHttpRequest));
            // console.log(JSON.stringify(textStatus));
            // console.log(JSON.stringify(errorThrown));
          },
          success: function (data) {
            alert('Succesfully registered ' + name + '. \n\n' + ' Kindly press OK to continue');
            window.location.replace("index.html", "slideup");
          }
        });
      });
    }
  });
    return false;
});