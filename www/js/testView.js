$(function () {
  $.ajax({
    url: "http://dawahnigeria.com/dawahcast/api/lec-web-service2",
    type: 'get',
    dataType: 'json',
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(JSON.stringify(errorThrown));
      // console.log(JSON.stringify(XMLHttpRequest));
      // console.log(JSON.stringify(textStatus));
      // console.log(JSON.stringify(errorThrown));
    },
    success: function (data) {
      $("#listItem").html("");
      $.each(data,function (node_index,node_value) {
        // console.log(JSON.stringify(node_value));
        $("#listItem").append($("<li></li>",{"html":
          "<div class= 'col-md-12 col-sm-12 col-xs-12 "+ node_value.count +"' style='padding: 10px 0px 10px 10px;'><div class= 'col-md-10 col-sm-10 col-xs-12'><a href='"+ node_value.Link +"' id= '' class='pages_list_title'>"
           + node_value.title + "</a></div><div class= 'col-md-2 col-sm-2 col-xs-12'><button class= 'form-control' id= '" + node_value.Nid + "'>View</button></div></div>"}));
      });
      $('button').click(function(){
        var nid = $(this).attr('id');
        console.log(nid);
      });
    }
  });
});  