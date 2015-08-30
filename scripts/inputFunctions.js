var showbase = document.getElementById("showBase").checked;

function changeSteps() {
	steps = document.getElementById("steps").value;
	refreshCanvas();
}

function showBase() {
	showbase = document.getElementById("showBase").checked;
	refreshCanvas();
}

function invertMotif() {
	motif = motif.reverse();
	refreshCanvas();
}

function isValid(string) {
	array = string.split("");
	var valid = true;
	for (var i = 0; i < array.length; i++) {
		if (array[i] != '[' &&
			array[i] != ']' &&
			array[i] != ',' &&
			array[i] != '-' &&
			array[i] != '.' &&
			array[i] != '0' &&
			array[i] != '1' &&
			array[i] != '2' &&
			array[i] != '3' &&
			array[i] != '4' &&
			array[i] != '5' &&
			array[i] != '6' &&
			array[i] != '7' &&
			array[i] != '8' &&
			array[i] != '9') {
			valid=false;
			break;
		}
	}

	return valid;
}

function refreshControls() {
	document.getElementById("steps").value=3;
	document.getElementById("levelLabel").innerHTML=3;
	steps=document.getElementById("steps").value;
	maxSteps = Math.floor((Math.log(50000/(base.length-1)))/Math.log(motif.length-1));
	document.getElementById("steps").max = maxSteps;
}

function submitBasePoints() {
	basePoints = document.getElementById("basepoints").value;
	if (isValid(basePoints)) {
		s = "[" + basePoints + "]";
		base = eval(s);
		if (document.getElementById("baseasmotif").checked) {
			motif = base;
		};
		refreshControls();
		refreshCanvas();
	} else {
		alert('Invalid points. Format: [x1,y1],[x2,y2]')
	}
}

function submitMotifPoints() {
	if (!document.getElementById("baseasmotif").checked) {
		motifPoints = document.getElementById("motifpoints").value;
		if (isValid(motifPoints)) {
			s = "[" + motifPoints + "]";
			motif = eval(s);
			refreshControls();
			refreshCanvas();
		};
	}
}

function baseAsMotif() {
	if (document.getElementById("baseasmotif").checked) {
		motif = base;
		document.getElementById("motifpoints").disabled = true;
		refreshControls();
	} else {
		motif = eval(document.getElementById("presetsmotif").value);
		document.getElementById("motifpoints").disabled = false;
		refreshControls();
	};
	refreshCanvas();
}

function changeBase() {
	base = eval(document.getElementById("presetsbase").value);
	printBasePoints();
}
function changeMotif() {
	motif = eval(document.getElementById("presetsmotif").value);
	printMotifPoints();
}