$(function () {
  $.ajax({
    url: "http://dawahnigeria.com/dawahcast/api/lec-web-service2",
    type: 'get',
    dataType: 'json',
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(errorThrown);
      // console.log(JSON.stringify(XMLHttpRequest));
      // console.log(JSON.stringify(textStatus));
      // console.log(JSON.stringify(errorThrown));
    },
    success: function (data) {
      $("#listItem").html("");
      $.each(data,function (node_index,lecture) {
        // console.log(JSON.stringify(lecture));
        $("#listItem").append($("<li></li>",{"html":
        "<div class= 'col-md-12 col-sm-12 col-xs-12 "+ lecture.count +"' style='padding: 10px 0px 10px 10px;'><div class= 'col-md-10 col-sm-10 col-xs-12'>"+ lecture.title +"<p>"+ lecture.date +"</p></div><div class= 'col-md-2 col-sm-2 col-xs-12'><button class= 'form-control a' id= '" + lecture.Nid + "'>View</button></div></div>"}));
    });
      $('button.a').click(function(){
        // nid = $(this).attr('id'); // set the global nid to the node that was just clicked
        localStorage.id = $(this).attr('id');
        window.location.replace("testView.html");
      });
    }
  });
});
