/* 
"Created": "2021/05/10 13:03:26",
"Last modified": "2021/06/05 04:04:05",
*/

/*转载须署名，请保留此页面原始链接*/
/* by leizingyiu */
/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */

/**
 * freq是反弹频率
 * decay是衰减
 * 这两个值的详细解释，请查看base on 链接
 * 
 * 由于路径属性无法获取velocity，
 * 所以使用deltaT作为关键帧前速度的速度取样时间
 * 
 * 默认情况下，k是deltaT的倒数
 * 如果需要突出反弹效果，可以将k调大
 */

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



