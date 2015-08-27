var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d');

var width = window.innerWidth,
	height = window.innerHeight,
	scale = 300,
	base = hexagon,
	motif = halfhexagon.reverse();

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

function draw() {
	if (steps != 0) {
		fractal = eval(nestString("fractalPoints(base, motif)", "base", steps));
		fractalLine(fractal);
	} else {
	  	fractalLine(base);
	};
	if (showbase) {
		baseLine(base);
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
	for (var i = 0; i < motif.length; i++) {
		s += "[" + motif[i][0] + "," + motif[i][1] + "]";
		if (i < motif.length -1) {
			s += ",";
		};
	};
	basepointbox = document.getElementById("motifpoints");
	basepointbox.value = s;
}

function initialize() {
	initializeCanvas();
	printBasePoints();
	printMotifPoints();
}