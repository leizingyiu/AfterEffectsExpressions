var setup = { keyTimeDura: { 'CompDura': true, 'keyDura': false } };
var prop = eval(parent.name);

var precision=2;
var timePrecision=4;
function mtrMultMtr(matrixA, matrixB) { [...arguments].map((function (arg) { var endM; 6 == arg.length && [0, 0, 1].map((i, idx) => arg.splice(3 * idx + 2, 0, i)) })); let res = [], b = 0, l = matrixA.length, L = Math.pow(l, .5); for (let k = 0; k < l; k++) { let a = Math.floor(k / L), N = 0; for (let j = 0; j < l; j += L)N += matrixA[a * L + j / L] * matrixB[b + j]; b++, b == L && (b = 0), res.push(N) } return res }

function mtrMults() { var arg = [...arguments], result; return arg.splice(0, 2), result = arguments.length > 1 ? arguments.length > 2 ? mtrMults(mtrMultMtr(arguments[0], arguments[1]), ...arg) : mtrMultMtr(arguments[0], arguments[1]) : arguments[0] }


function vecMultMtr(v, m) {
    var a = 0, b = 1, c = 3, d = 4, e = 6, f = 7, x = 0, y = 1;
    if (m.length == 6) {
        var endM = [0, 0, 1];
        endM.map((i, idx) => m.splice(idx * 3 + 2, 0, i));
    }
    let res = [];
    res[x] = v[x] * m[a] + v[y] * m[c] + m[e];
    res[y] = v[x] * m[b] + v[y] * m[d] + m[f];
    return res;
}


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
        range(1, p.numProperties, 1).map(j => (j, tMatrix = p(j).name == '变换' ? transformMatrix(p(j), tMatrix) : tMatrix));
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

} function transformMatrix(transformPropGroup, origMatrix) {
    var daPosition = transformPropGroup.position.value,
        daAnchor = transformPropGroup.anchorPoint.value,
        daScale = transformPropGroup.scale.value,
        daSkew = transformPropGroup.skew.value,
        daSkewAxis = transformPropGroup.skewAxis.value,
        daRotate = transformPropGroup.rotation.value;
    origMatrix = typeof origMatrix == 'undefined' || origMatrix.length == 0 ? [1, 0, 0, 0, 1, 0, 0, 0, 1] : origMatrix;
    return mtrMults(origMatrix, anchor(...daAnchor), skew(daSkew, daSkewAxis), scale(...daScale.map(i => i / 100)), rotate(daRotate), translate(...daPosition));
}

var range = (min, max, step) => [...new Array(Math.floor((max + step - min) / step))].map((n, idx) => idx * step + min);



function propGroupTransformKeyTimes(prop) {
    var i = 1, keyTimesArr = [], p;
    while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
        p = prop.propertyGroup(i);
        ('undefined' != typeof p.transform) && (range(1, p.transform.numProperties, 1).map(j => range(1, (p.transform(j).name != p.transform.opacity.name) && p.transform(j).numKeys, 1).map(k => keyTimesArr.push(p.transform(j).key(k).time))));
        i++
    }
    return keyTimesArr;
}
function propertyKeyTimes(prop) {
    return range(1, prop.numKeys, 1).map(i => prop.key(i).time);
}

function propAndGroupKeyTimes(prop) {
    return [...new Set([...propGroupTransformKeyTimes(prop), ...propertyKeyTimes(prop)].sort())]
}


function propLayerInThisComp(prop) { var i = 0; while (typeof (prop.propertyGroup(i + 1).hasParent) == 'undefined') { i++ } var result = thisComp.layer(prop.propertyGroup(i + 1).name); return result; }




var keyTimeDura = Object.keys(setup.keyTimeDura).map(i => setup.keyTimeDura[i] == true ? i : '').filter(Boolean)[0];


var pLayer = propLayerInThisComp(prop);

var P, I, O, values = '', keyTimes = '', begin = '', dur = '';
var tMatrix = aePropGroupTransformsMatrix(prop);


var keyTimesArr = propAndGroupKeyTimes(prop);

keyTimeDura == 'CompDura' && keyTimesArr.push(0) && keyTimesArr.push(thisComp.duration);
keyTimesArr.sort();




for (let i = 0; i < keyTimesArr.length; i++) {
    let T = keyTimesArr[i];
    P = prop.points(T);
    I = prop.inTangents(T);
    O = prop.outTangents(T);
    P.map(function (p, idx) {
        I[idx] = add(I[idx], P[idx]);
        O[idx] = add(O[idx], P[idx]);
        return p;
    })
    for (let j = 0; j < P.length; j++) {
        let CP = pLayer.toComp(vecMultMtr(P[j], tMatrix)).map(z=>z.toFixed(precision));
        if (j == 0) {
            values += ' M '+CP.join(' ') + ' ';

        } else {
            let pO = pLayer.toComp(vecMultMtr(O[j - 1], tMatrix)).map(z=>z.toFixed(precision));
            let pI = pLayer.toComp(vecMultMtr(I[j], tMatrix)).map(z=>z.toFixed(precision));
            let pP = pLayer.toComp(vecMultMtr(P[j], tMatrix)).map(z=>z.toFixed(precision));
            values += ' C '+pO.join(' ') + ' , ' + pI.join(' ') + ',' + pP.join(' ');
        }
    }
    values += ';\n';
    keyTimes += (keyTimesArr[i] / (keyTimesArr[keyTimesArr.length - 1] - keyTimesArr[0])).toFixed(timePrecision) + ((i < keyTimesArr.length - 1) ? ';':'');
}

begin = keyTimeDura == 'CompDura' ? 0 : prop.key(1).time - pLayer.inPoint;
dur = keyTimeDura == 'CompDura' ? thisComp.duration : (prop.key(prop.numKeys).time - prop.key(1).time);

var beforeText = '<animate attributeName="d" attributeType="XML" ';
var afterText = 'repeatCount="indefinite" fill="freeze"></animate>';
var result = (beforeText +
    ' values="' + values + '\n"' +
    ' keyTimes="' + keyTimes + '"' +
    ' begin="' + begin + '"' +
    ' dur="' + dur + '" ' +
    afterText);

result;
