var prop = thisComp.layer("“图层 2”轮廓 2").content("组 1").content("组 1").content('path').path;




function mtrMultMtr(matrixA, matrixB) { [...arguments].map((function (arg) { var endM; 6 == arg.length && [0, 0, 1].map((i, idx) => arg.splice(3 * idx + 2, 0, i)) })); let res = [], b = 0, l = matrixA.length, L = Math.pow(l, .5); for (let k = 0; k < l; k++) { let a = Math.floor(k / L), N = 0; for (let j = 0; j < l; j += L)N += matrixA[a * L + j / L] * matrixB[b + j]; b++, b == L && (b = 0), res.push(N) } return res }
function mtrMults() { var arg = [...arguments], result; return arg.splice(0, 2), result = arguments.length > 1 ? arguments.length > 2 ? mtrMults(mtrMultMtr(arguments[0], arguments[1]), ...arg) : mtrMultMtr(arguments[0], arguments[1]) : arguments[0] }
function vecMultMtr(v, m) { return 6 != m.length ? null : (6 == m.length && [0, 0, 1].map((i, idx) => m.splice(3 * idx + 2, 0, i)), [v[0] * m[0] + v[1] * m[3] + m[6], v[0] * m[1] + v[1] * m[4] + m[7]]) }
function arrToStrInMtr(arr, n) {
    arr = arr instanceof Array != true ? [] : arr;
    var res = [];
    for (let i = 0; i < Math.ceil(arr.length / n); i++) {
        res.push(arr.slice(i * n, i * n + n));
    }
    return (res.map(i => i.join(' , ')).join('\n'));
}
function aePropGroupTransformsMatrix(prop) {
    var i = 1, p, tMatrix = [];
    while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
        p = prop.propertyGroup(i);
        range(1, p.numProperties, 1).map(j => (j, tMatrix = p(j).name == '变换' ? transformMatrix(p(j),tMatrix) : tMatrix));
        i++;
    }
    arrToStrInMtr(tMatrix, 3);
    return tMatrix;
}
function anchor(x, y) { return [1, 0, 0, 0, 1, 0, -x, -y, 1]; }
function scale(x, y) { return [x, 0, 0, 0, y, 0, 0, 0, 1] }
function translate(x, y) { return [1, 0, 0, 0, 1, 0, x, y, 1] }
function rotate(a) { return a = a / 180 * Math.PI, [Math.cos(a), Math.sin(a), 0, -Math.sin(a), Math.cos(a), 0, 0, 0, 1] }
function skewX(a) { return [1, 0, 0, -Math.tan(a), 1, 0, 0, 0, 1] }
function skew(a, axisDeg) { a = a / 180 * Math.PI; let mixMatrix = mtrMultMtr(rotate(axisDeg), skewX(a)); return mtrMultMtr(mixMatrix, rotate(-axisDeg)) }
function transform(v2d, transformPropGroup) {
    var daPosition = transformPropGroup.position.value,
        daAnchor = transformPropGroup.anchorPoint.value,
        daScale = transformPropGroup.scale.value,
        daSkew = transformPropGroup.skew.value,
        daSkewAxis = transformPropGroup.skewAxis.value,
        daRotate = transformPropGroup.rotation.value;
    return vecMultMtr(v2d, mtrMults(anchor(...daAnchor), skew(daSkew, daSkewAxis), scale(...daScale.map(i => i / 100)), rotate(daRotate), translate(...daPosition)))
}
function transformMatrix(transformPropGroup, origMatrix) {
    var daPosition = transformPropGroup.position.value,
        daAnchor = transformPropGroup.anchorPoint.value,
        daScale = transformPropGroup.scale.value,
        daSkew = transformPropGroup.skew.value,
        daSkewAxis = transformPropGroup.skewAxis.value,
        daRotate = transformPropGroup.rotation.value;
    origMatrix = typeof origMatrix == 'undefined'||origMatrix.length==0 ? [1, 0, 0, 0, 1, 0, 0, 0, 1] : origMatrix;
    return mtrMults(origMatrix, anchor(...daAnchor), skew(daSkew, daSkewAxis), scale(...daScale.map(i => i / 100)), rotate(daRotate), translate(...daPosition));
}
var range = (min, max, step) => [...new Array(Math.floor((max + step - min) / step))].map((n, idx) => idx * step + min);


var i = 1;
var p;
var tMatrix = [];
while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
    p = prop.propertyGroup(i);
    range(1, p.numProperties, 1).map(i => (i, tMatrix = p(i).name == '变换' ? transformMatrix(p(i)) : tMatrix));
    i++;
}

arrToStrInMtr(tMatrix, 3);


var pathProp = thisComp.layer("sourcePath2").content("组 1").content("组 1").content("path").path;

var P = pathProp.points();
var I = pathProp.inTangents();
var O = pathProp.outTangents();

P.map(function (p, idx) {
    I[idx] = add(I[idx], P[idx]);
    O[idx] = add(O[idx], P[idx]);
    return p;
})

var tMatrix = aePropGroupTransformsMatrix(pathProp);

[P, I, O].map(arr => arr.map(a => vecMultMtr(a, tMatrix)))