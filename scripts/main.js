//canvas.addEventListener('mousedown', onmousedown, false);
//canvas.addEventListener('mousemove', onmousemove, false);
//canvas.addEventListener('mouseup', onmouseup, false);
canvas.addEventListener('mousewheel', onmousescroll, false); // Chrome
canvas.addEventListener('DOMMouseScroll', onmousescroll, false); // Firefox
var controls = document.getElementById("controls");
controls.addEventListener('mousedown', function() {clicked=true}, false);
controls.addEventListener('mousemove', function() {if(clicked=true) {clicked=false}}, false);


function getMousePos(e) {
	mouse = {
		x: e.layerX,
		y: e.layerY
	};
}

function canvasMouse() {
	return [(mouse.x - offset.x)/scale, (offset.y - mouse.y)/scale];
}

var clicked = false,
	dragging = false,
	panning = false,
	selectedPoint = -1;

canvas.onmousedown = function(e) {
	clicked = true;

	getMousePos(e);
	last = {x: mouse.x, y: mouse.y}
	for (var i = 0; i < base.length; i++) {
		dist = distance(canvasMouse(), base[i]);
		if (dist <= 10/scale) {
			dragging = true;
			index = i;
			break;
		} else {
			panning = true;
		};
	};
}

canvas.onmousemove = function(e) {
	if (clicked) {
		getMousePos(e);
		if (dragging) {
			base[index] = canvasMouse();
		} else if (panning) {
			diff = [mouse.x - last.x, mouse.y - last.y];
			offset = {x: offset.x + diff[0], y: offset.y + diff[1]};
			ctx.translate(diff[0]/scale, -diff[1]/scale);

			last = mouse;
		};
		refreshCanvas();
	};
}

canvas.onmouseup = function(e) {
	clicked = false;
	dragging = false;
	panning = false;
}

function onmousescroll(e) {
	if (e.detail) {
		delta = e.detail/3;
	} else if (e.wheelDelta) {
		delta = -e.wheelDelta/120
	};
	getMousePos(e);
	zoom(canvasMouse(), delta);
}


// Inizialization


window.onload = function() {
	initialize();
	draw();
}
window.onresize = function() {
	initialize();
	draw();
}