/*
"Created": "2021/05/08 00:00:00",
"Last modified": "2021/06/06 14:51:20",
*/

/*
在路径属性中粘贴此表达式，可生成 根据最后一个锚点对称 的路径
Paste this expression in any path property, to generate Symmetrical path based on the last anchor point .
*/

/*setting=[x是否对称,y是否对称]，填写true 或者false */
var setting = [true, false];
var p = points(); var i = inTangents(); var o = outTangents();
var p2 = []; var i2 = []; var o2 = [];
var pN = p[p.length - 1], iN = i[i.length - 1]; oN = o[o.length - 1];

o[o.length - 1] = i[i.length - 1].map((v, idx) => setting[idx] ? -v : v);

for (let j = 0; j < p.length - 1; j++) {
	p2.unshift(p[j].map((v, idx) => setting[idx] ? pN[idx] * 2 - p[j][idx] : p[j][idx]));
	i2.unshift(i[j].map((v, idx) => setting[idx] ? -o[j][idx] : o[j][idx]));
	o2.unshift(o[j].map((v, idx) => setting[idx] ? -i[j][idx] : i[j][idx]));
}

var p3 = p.concat(p2); var i3 = i.concat(i2); var o3 = o.concat(o2);

createPath(p3, i3, o3, false);


/*by Leizingyiu*/
/*转载须署名，保留原始链接*/