var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

var width = window.innerWidth,
	height = window.innerHeight,
	scale = 200,
	base = koch,
	motif = base;

function resizeCanvas() {
	width = window.innerWidth;
	height = window.innerHeight;
	offset = {x: width/2+200/2, y: height/2}
	canvas.width = width;
	canvas.height = height;
}

function clearCanvas() {
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
}

function initializeCanvas() {
	resizeCanvas();
	ctx.translate(offset.x, offset.y);
	ctx.scale(scale,-scale);
}

function refreshCanvas() {
	clearCanvas();
	draw();
}

function zoom(pt, dir) {
	if (dir == -1) {
		s = 1.1;
	} else if (dir == 1) {
		s = 1/1.1;
	};
	mappedPoint = canvasToWindow(pt);
	scale *= s;
	ctx.setTransform(1,0,0,1,0,0);
	offset = { x: -scale*pt[0] + mappedPoint.x, y: pt[1]*scale + mappedPoint.y };
	ctx.translate(offset.x, offset.y);
	ctx.scale(scale, -scale);
	refreshCanvas();
}

function canvasToWindow(pt) {
	return {x: offset.x + scale*pt[0], y: offset.y - scale*pt[1]};
}

function draw() {
	if (steps != 0) {
		fractal = eval(nestString("fractalPoints(base, motif)", "base", steps));
		fractalLine(fractal);
	} else {
	  	fractalLine(base);
	};
	if (showbase) {
		drawBaseLine();
		drawDots(base);
	};
}

function printBasePoints() {
	s = "";
	for (var i = 0; i < base.length; i++) {
		s += "[" + base[i][0] + "," + base[i][1] + "]";
		if (i < base.length -1) {
			s += ",";
		};
	};
	basepointbox = document.getElementById("basepoints");
	basepointbox.value = s;
}

function printMotifPoints() {
	s = "";
	var motifPoints = eval(document.getElementById("presetsmotif").value);
	for (var i = 0; i < motifPoints.length; i++) {
		s += "[" + motifPoints[i][0] + "," + motifPoints[i][1] + "]";
		if (i < motifPoints.length -1) {
			s += ",";
		};
	};
	motifpointbox = document.getElementById("motifpoints");
	motifpointbox.value = s;
}

function drawBaseLine() {
  ctx.beginPath();
  for (var i = 0; i < base.length; i++) {
    ctx.lineTo(base[i][0],base[i][1]);
  }
  ctx.lineWidth = 6/scale;
  ctx.save();
  ctx.strokeStyle = "rgb(0,100,225)";
  ctx.stroke();
  ctx.restore();
}

function drawDots(pts) {
  for (var i = pts.length - 1; i >= 0; i--) {
  	ctx.save();
    ctx.beginPath();
    ctx.arc(pts[i][0], pts[i][1], 8/scale, 0, 2*Math.PI);
    ctx.fillStyle = "rgb(0,100,225)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(pts[i][0], pts[i][1], 4/scale, 0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
  };
}

function initialize() {
	initializeCanvas();
	printBasePoints();
	printMotifPoints();
}