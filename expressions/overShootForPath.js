/* by leizingyiu */
/* 
"Created": "2021/05/09 23:59:06",
"Last modified": "2021/05/10 11:45:52"
*/
/*转载须署名，保留原始链接*/

var freq = 3;	/*频率*/
var decay = 5;	/*衰减*/
var amp=1;	/*振幅*/

/*——————————————修改以上三个参数调整回弹效果——————————————————*/

var n = 1;
if (numKeys >= 2) {
	n = nearestKey(time).index;
	if (key(n).time > time  ) {
		n--
	}
	var t = time - key(n).time;
	var w = freq * Math.PI * 2;
	var newT=amp * (Math.sin(t * w) / Math.exp(decay * t) / w);
	var T=key(n).time-Math.abs(newT);
}else{
	T=time;
}

var p=points();
var i=inTangents();
var o=outTangents();
var p2=points(T);		
var i2=inTangents(T);
var o2=outTangents(T);

var pBoo=p.toString()==points(key(n).time).toString();
var iBoo=i.toString()==inTangents(key(n).time).toString();
var oBoo=o.toString()==outTangents(key(n).time).toString();

if (pBoo&&iBoo&oBoo) {
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
