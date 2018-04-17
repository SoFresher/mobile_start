$(function () {
  $.ajax({
    url:"http://localhost/drupal/?q=services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    },
    success: function (token) {    
      $.ajax({
        url: "http://localhost/drupal/?q=my_services/node/" + encodeURIComponent(nid) + ".json",
        type: 'get',
        dataType: 'json',
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert('page_node_view - failed to retrieve page node');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
          console.log(JSON.stringify(data));
          $('#page_node_view h1').html(data.title); // set the header title
          $('#page_node_view .content').html(data.body.und[0].safe_value); // display the body in the content div
        }
      });
    }
  });
});