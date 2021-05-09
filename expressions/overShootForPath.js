/* by leizingyiu */
/* 
"Created": "2021/05/10 02:18:20",
"Last modified": "2021/05/18 02:23:14"
*/

var freq = 3;
var decay = 5;
var amp=1;

var n = 0;
if (thisProperty.numKeys >= 2) {
	n = thisProperty.numKeys;
}
if (thisProperty.numKeys>1 && time>key(n).time) {
	var t = time - key(n).time;
	var w = freq * Math.PI * 2;
	var newT=amp * (Math.sin(t * w) / Math.exp(decay * t) / w);
	var T=key(n).time-Math.abs(newT);

	var p=points();
	var i=inTangents();
	var o=outTangents();
	var p2=points(T);		
	var i2=inTangents(T);
	var o2=outTangents(T);

	if(newT<0){
		createPath(p2,i2,o2,false);
	}else{
		var p3=[];var i3=[];var o3=[];
		for(let j=0;j<p.length;j++){
			p3[j]=p[j]*2-p2[j]
			i3[j]=i[j]*2-i2[j];
			o3[j]=o[j]*2-o2[j];			
		}
		createPath(p3,i3,o3,false);
		}
	} else {
	value
};
