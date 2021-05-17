/* by leizingyiu
base on http://www.motionscript.com/articles/bounce-and-overshoot.html */

/* 
"Created": "2021/05/10 13:03:26",
"Last modified": "2021/05/17 22:32:40",
*/

/*转载须署名，保留原始链接*/

freq = 3;
decay = 5;

deltaT = 0.001;
k = 1000;

var n = 0;
if (numKeys > 0) {
	n = nearestKey(time).index;
	if (key(n).time > time) {
		n--
	}
}

if (n > 0) {
	var t = time - key(n).time;
	var w = freq * Math.PI * 2;

	var pK = points(key(n).time);
	var iK = inTangents(key(n).time);
	var oK = outTangents(key(n).time);

	var pk = points(key(n).time - deltaT)
	var ik = inTangents(key(n).time - deltaT);
	var ok = outTangents(key(n).time - deltaT);

	var pNow = points();
	var iNow = inTangents();
	var oNow = outTangents();

	var p = []; var i = []; var o = []; var pAmp, iAmp, oAmp;

	var delta = (Math.sin(t * w) / Math.exp(decay * t) / w) * k;

	for (let j = 0; j < pNow.length; j++) {
		pAmp = pK[j] - pk[j];
		iAmp = iK[j] - ik[j];
		oAmp = oK[j] - ok[j];
		p[j] = pNow[j] + pAmp * delta;
		i[j] = iNow[j] + iAmp * delta;
		o[j] = oNow[j] + oAmp * delta;
	}

	createPath(p, i, o, isClosed());
} else {
	value
};
