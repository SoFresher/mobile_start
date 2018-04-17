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
        url: "http://localhost/drupal/?q=my_drupal_pages",
        type: 'get',
        dataType: 'json',
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          alert('JSON.stringify(errorThrown)');
          console.log(JSON.stringify(XMLHttpRequest));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function (data) {
          $("#pageList").html("");
          $.each(data.nodes,function (node_index,node_value) {
            console.log(JSON.stringify(node_value));
            $("#pageList").append($("<li></li>",{"html":
              "<button class= 'form-control'><a href='' id='" + node_value.node.Nid + "' class='pages_list_title'>"
               + node_value.node.title + "</a></button>"}));
          });
          $("#pageList").listview("destroy").listview();
        }
      });

    }
  });  
  $('a.pages_list_title').click(function(){
    console.log (nid = $(this).attr('id')); // set the global nid to the node that was just clicked
    window.location.replace("./pageView.html");
  });
});