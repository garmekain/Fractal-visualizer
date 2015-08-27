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

function submitBasePoints() {
	basePoints = document.getElementById("basepoints").value;
	s = "[" + basePoints + "]";
	base = eval(s);
	if (document.getElementById("baseasmotif").checked) {
		motif = base;
	}
	refreshCanvas();
}

function submitMotifPoints() {
	if (!document.getElementById("baseasmotif").checked) {
		motifPoints = document.getElementById("motifpoints").value;
		s = "[" + motifPoints + "]";
		motif = eval(s);
		refreshCanvas();
	}
}

function baseAsMotif() {
	if (document.getElementById("baseasmotif").checked) {
		motif = base;
		refreshCanvas();
		document.getElementById("motifpoints").disabled = true;
	} else {
		submitMotifPoints();
		document.getElementById("motifpoints").disabled = false;
	};
}

function changeBase() {
	base = eval(document.getElementById("presetsbase").value);
	printBasePoints();
}
function changeMotif() {
	motif = eval(document.getElementById("presetsmotif").value);
	printMotifPoints();
}