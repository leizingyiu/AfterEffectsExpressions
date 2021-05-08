/*
在路径属性中粘贴此表达式，可生成 根据最后一个锚点对称 的路径

Paste this expression in any path property, to generate Symmetrical path based on the last anchor point .

by Leizingyiu

*/
var p=points();
var i=inTangents();
var o=outTangents();
o[o.length-1]=-i[i.length-1];

var p2=[];
var i2=[];
var o2=[];

for(let j=0;j<p.length-1;j++){
	p2.unshift(p[p.length-1]-p[j]);	
	i2.unshift(i[j]);
	o2.unshift(o[j]);
}

var p3=p.concat(p2);
var i3=i.concat(i2);
var o3=o.concat(o2);

createPath(p3,i3,o3,false);
