$(function() {
  var canvas = $("#myCanvas");
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

  $("#colorPalet div").click(function() {
    penColor = colorList[this.id];
  });

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

  function draw(e) {
    if (!drawFlag) return;
    var x = e.clientX;
    var y = e.clientY;
    var canvas = $("#myCanvas");
    var ctx = canvas[0].getContext("2d");

    ctx.strokeStyle = penColor;
    ctx.lineWidth = brushSize;
    ctx.lienJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
    oldX = x;
    oldY = y;
  }
});
