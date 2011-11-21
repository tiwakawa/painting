$(function() {
  var canvas = $("#myCanvas");
  var ctx = canvas[0].getContext("2d");
  var drawFlag = false;
  var brushSize = 1;
  var penColor = "rgba(255, 0, 0, 1)";
  var oldX = 0;
  var oldY = 0;
  var colorList = {
    "black"  : "rgba(0, 0, 0, 1)",
    "blue"   : "rgba(0, 0, 255, 1)",
    "red"    : "rgba(255, 0, 0, 1)",
    "magenta": "rgba(255, 0, 255, 1)",
    "green"  : "rgba(0, 255, 0, 1)",
    "cyan"   : "rgba(0, 255, 255, 1)",
    "yellow" : "rgba(255, 255, 0, 1)",
    "white"  : "rgba(255, 255, 255, 1)"
  }
  reloadPictures();


  canvas.mousemove(function(e) {
    draw(e);
  });

  canvas.mousedown(function(e) {
    drawFlag = true;
    oldX = e.clientX;
    oldY = e.clientY;
  });

  canvas.mouseup(function(e) {
    drawFlag = false;
  });

  // select color
  $("#colorPalet div").click(function() {
    penColor = colorList[this.id];
  });

  // select pen width
  $("#pen-width-slider").change(function() {
    brushSize = $(this).val();
  });

  // clear
  $("#clear-button").click(function() {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
  });

  // save
  $("#save-button").click(function() {
    var url = canvas[0].toDataURL();
    $.post(
      '/pictures',
      {data: url},
      function() {
        reloadPictures();
      }
    );
  });

  function draw(e) {
    if (!drawFlag) return;
    var x = e.clientX;
    var y = e.clientY;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    oldX = x;
    oldY = y;
  }

  function reloadPictures() {
    $.get(
      '/pictures',
      function(data, status, xhr) {
        ids = data.split(',');
        pictures = $("#pictures");
        pictures.empty();
        $.each(ids, function(i, val) {
          if(parseInt(val) > 0){
            pictures.append("<img src=\"/images/" + val + ".png\" class=\"thumbnail\" />")
          }
        });

        // copy
        $("#pictures img").click(function() {
          var image = new Image();
          image.src = $(this).attr("src");
          ctx.clearRect(0, 0, canvas.width(), canvas.height());
          ctx.drawImage(image, 0, 0);
        });
      }
    )
  }
});
