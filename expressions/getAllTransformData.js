function mtrMultMtr(matrixA, matrixB) {

    let res = [];
    let b = 0;
    for (let k = 0; k < 16; k++) {
        let a = Math.floor(k / 4);
        let n = 0;

        for (let j = 0; j < 16; j += 4) {
            n += matrixA[a + j] * matrixB[b + j];
        }
        b++;
        if (b == 4) b = 0;
        res.push(n)
    }
    return res;
}

function mtrMultMtr(matrixA, matrixB) {

    let res = [];
    let b = 0;
    let l = matrixA.length;
    let L = Math.pow(l, 0.5)
    for (let k = 0; k < l; k++) {
        let a = Math.floor(k / L);
        let n = 0;

        for (let j = 0; j < l; j += L) {
            n += matrixA[a + j] * matrixB[b + j];
        }
        b++;
        if (b == L) b = 0;
        res.push(n)
    }
    return res;
}

m = mtrMultMtr([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 1, 2, 3, 1, 2, 3])
console.log(m)


function scale(x, y) {
    return [
        x, 0, 0,
        y, 0, 0
    ];
}
function translate(x, y) {
    return [
        1, 0, 0,
        1, x, y
    ];
}

function rotate(a) {
    a = a / 360 * 2 * Math.PI;
    return [
        cos(a), sin(a), -sin(a),
        cos(a), 0, 0
    ]
}

function matrixArrayToCssMatrix(array) {
    return "matrix3d(" + array.join(',') + ")";
}





var prop = thisComp.layer("“图层 2”轮廓 2").content("组 1").content("组 1").content('path').path;


var range = (min, max, step) => [...new Array(Math.floor((max + step - min) / step))].map((n, idx) => idx * step + min);

var txt = '';
var txt2 = '';
var i = 1;
var p;
var t, T;
var transformObj = {};
while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
    p = prop.propertyGroup(i);
    t = '';
    P = range(1, p.numProperties, 1).map(i => ' [' + p(i) + '.name=' + p(i).name + '] ');
    t = range(1, p.numProperties, 1).map(i => p(i).name == '变换' ? (range(1, p(i).numProperties, 1).map(j => p(i)(j).name + ':' + p(i)(j).value)) : '');
    T = range(1, p.numProperties, 1).map(i => p(i).name == '变换' ? true : false);

    t = range(1, p.numProperties, 1).map(i => p(i).name == '变换' ? (range(1, p(i).numProperties, 1).map(function (j) {
        var objName = p(i)(j).name;
        txt2 += transformObj[p(i)(j).name] + '\n'
        transformObj[p(i)(j).name] = typeof transformObj[p(i)(j).name] == undefined ? p(i)(j).value : add(transformObj[p(i)(j).name], p(i)(j).value);
        return p(i)(j).name + ':' + p(i)(j).value
    })) : '');

    txt = p.name + ': numProp=' + p.numProperties + '\n\t' + P.join('\n\t') + '\n t:' + t + '\n' + txt;
    i++
}
txt;
JSON.stringify(transformObj);