function arraySum(a1, a2) {
	var newarray = [];
	for (var i = 0; i < a1.length; i++) {
		newarray.push(a1[i]+a2[i])
	};
	return newarray;
}
function dot(u, v) {
	var uv = 0;
	for (i = 0; i < u.length; i++) {
		uv += u[i]*v[i];
	};
	return uv;
}
function matrixMult(m, v) {
	var a = m[0][0],
		b = m[0][1],
		c = m[1][0],
		d = m[1][1],
		x = v[0],
		y = v[1];
	return [a*x+b*y, c*x+d*y];
}
function transfMatrix(u, v) {
	var s = Math.sqrt(u[0]*u[0] + u[1]*u[1]);
	s *= s;
	var m = [
			[dot(u, v)/s, dot(matrixMult([[0,1],[-1,0]], u), v)/s],
			[dot(matrixMult([[0,-1],[1,0]], u), v)/s, dot(u, v)/s]
		];

	return m;
}
function distance(p1, p2) {
	return Math.sqrt((p1[0]-p2[0])*(p1[0]-p2[0]) + (p1[1]-p2[1])*(p1[1]-p2[1]));
}