var steps = document.getElementById("steps").value,
  showbase = document.getElementById("showBase").checked;

function polygon(sides) {
  pts = [];
  for (var i = 0; i <= sides; i++) {
    pts.push([Math.round(10000*Math.cos(2*Math.PI*i/sides+Math.PI/2))/10000,Math.round(10000*Math.sin(2*Math.PI*i/sides+Math.PI/2))/10000])
  };
  return pts;
}

var line=[[-2,0],[2,0]],
    koch=[[-3,-.5],[-1,-.5],[0,Math.round(10000*(Math.sqrt(3)-.5))/10000],[1,-.5],[3,-.5]],
    dragon=[[-1,0],[0,1],[0,-1],[1,0]],
    dragon2=[[-2,0],[0,1],[0,-1],[2,0]],
    quadratickochtype1=[[-1.5,0],[-.5,0],[-.5,1],[.5,1],[.5,0],[1.5,0]],
    quadratickochtype2=[[-2,0],[-1,0],[-1,1],[0,1],[0,0],[0,-1],[1,-1],[1,0],[2,0]],
    peano=[[0,0],[1,0],[1,1],[2,1],[2,0],[1,0],[1,-1],[2,-1],[2,0],[3,0]],
    levi=[[-1,0],[0,1],[1,0]],
    vertline=[[-1,0],[0,0],[0,1],[0,0],[1,0]],
    sierpinski=[[-1,0],[0,0],[-.5,Math.round(10000*Math.sqrt(3))/10000/2],[.5,Math.round(10000*Math.sqrt(3))/10000/2],[0,0],[1,0]],
    triangle=polygon(3),
    square=[[-1,-1],[1,-1],[1,1],[-1,1],[-1,-1]],
    pentagon=polygon(5),
    hexagon=polygon(6),
    heptagon=polygon(7),
    halfhexagon=[[1,0],[.5,Math.round(10000*Math.sqrt(3))/10000/2],[-.5,Math.round(10000*Math.sqrt(3))/10000/2],[-1,0]],
    spike=[[-1,0],[-.1,0],[0,.92],[.1,0],[1,0]],
    spiral=[[-2.7,0],[-2,1],[2,-1],[2.7,0]],
    nuclear=[[-4.5,0],[-3.75,1.5],[-3,0],[3,0],[3.75,1.5],[4.5,0]],
    tree=[[0,-2],[0,0],[-1,1],[0,0],[1,1],[0,0]],
    forest=[[-2,0],[-1,.05],[-.1,-.1],[0,1.25],[.1,-.15],[.8,-.21],[1.5,-.24]];


function nestString(string, word, steps) {
  var s = string;
  for (var i = 1; i < steps; i++) {
    s = s.replace("("+ word + ",", "(" + string + ",");
  }
  return s;
}

function fractalLine(pts) {
  
  ctx.beginPath();
  for (i = 0; i < pts.length; i++) {
    ctx.lineTo(pts[i][0], pts[i][1]);
  };
  ctx.lineJoin = "round";
  ctx.lineWidth = 2/scale;
  ctx.stroke();
};

function baseLine(base) {
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

function fractalPoints(base, motif) {
	var pts = [];
	for (var j = 0; j < base.length-1; j++) {
		u = [motif[motif.length-1][0] - motif[0][0], motif[motif.length-1][1] - motif[0][1]],
		v = [base[j+1][0] - base[j][0], base[j+1][1] - base[j][1]];
		if (j == base.length - 2) {
			for (var i = 0; i < motif.length; i++) {
				pt = arraySum(matrixMult(transfMatrix(u, v), [motif[i][0] - motif[0][0], motif[i][1] - motif[0][1]]),base[j]);
				pts.push(pt);
			};
		} else {
			for (var i = 0; i < motif.length - 1; i++) {
				pt = arraySum(matrixMult(transfMatrix(u, v), [motif[i][0] - motif[0][0], motif[i][1] - motif[0][1]]),base[j]);
				pts.push(pt);
			};
		}
	};
	return pts;
}