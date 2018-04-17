$('#pageCreate').click(function(){
  $.ajax({
    url:"http://localhost/drupal/?q=services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
    success: function (token) {
      var title = $('#pageTitle').val()
      if (!title) { alert('Please enter a title.'); return false; }

      var body = $('#pageBody').val();
      if (!body) { alert('Please enter a body.'); return false; }

      // BEGIN: drupal services node create login
      $.ajax({
        url: "http://localhost/drupal/?q=my_services/node.json",
        type: 'post',
        data: 'node[type]=page&node[title]=' + encodeURIComponent(title) + '&node[language]=und&node[body][und][0][value]=' + encodeURIComponent(body),
        dataType: 'json',
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert(JSON.stringify(errorThrown));
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
          alert('Basic Page ' + "'" + title + "'" + ' has been created');
          window.location.replace("index.html", "slideup");
        }
      });
      // END: drupal services node create
    }
  });
  return false;
});