
function mtrMultMtrConsole(matrixA, matrixB) {
    [...arguments].map(function (arg) {
        if (arg.length == 6) {
            var endM = [0, 0, 1];
            endM.map((i, idx) => arg.splice(idx * 3 + 2, 0, i));
        }
    })
    let txt = '';
    let idTxt = '';
    let res = [];
    let b = 0;
    let l = matrixA.length;
    let L = Math.pow(l, 0.5);
    let m = 0, n = 0;
    for (let k = 0; k < l; k++) {
        let a = Math.floor(k / L);
        let N = 0;


        for (let j = 0; j < l; j += L) {
            m = j / L;
            n = j;
            txt += matrixA[a * L + m] + ' x ' + matrixB[b + n] + ' + ';
            idTxt += (a * L + m + 1) + ' x ' + (b + n + 1) + '   ';

            N += matrixA[a * L + m] * matrixB[b + n];
        }
        b++;
        if (b == L) {
            txt += '\n';
            idTxt += '\n';
            b = 0;
        } else {
            txt += '    ';
            idTxt += '    ';
        };
        res.push(N)
    }
    console.log(txt);
    console.log(idTxt);
    return res;
}

function mtrMultMtr(matrixA, matrixB) {
    [...arguments].map(function (arg) {
        if (arg.length == 6) {
            var endM = [0, 0, 1];
            endM.map((i, idx) => arg.splice(idx * 3 + 2, 0, i));
        }
    })
    let res = [];
    let b = 0;
    let l = matrixA.length;
    let L = Math.pow(l, 0.5);
    for (let k = 0; k < l; k++) {
        let a = Math.floor(k / L);
        let N = 0;


        for (let j = 0; j < l; j += L) {
            N += matrixA[a * L + j / L] * matrixB[b + j];
        }
        b++;
        if (b == L) {
            b = 0;
        }
        res.push(N)
    }
    return res;
}

function mtrMults() {
    var arg = [...arguments];
    arg.splice(0, 2);
    var result;
    result = arguments.length > 2 ? mtrMults(mtrMultMtr(arguments[0], arguments[1]), ...arg) : mtrMultMtr(arguments[0], arguments[1]);
    return result;
}

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

function scale(x, y) {
    return [
        x, 0, 0,
        0, y, 0,
        0, 0, 1
    ];
}
function translate(x, y) {
    return [
        1, 0, 0,
        0, 1, 0,
        x, y, 1
    ];
}

function rotate(a) {
    return [
        Math.cos(a), Math.sin(a), 0,
        -Math.sin(a), Math.cos(a), 0,
        0, 0, 1
    ];
}

function skewX(a) {
    return [
        1, Math.tan(a), 0,
        0, 1, 0,
        0, 0, 1
    ]
}

function skew(a, axisDeg) {
    let mixMatrix = mtrMultMtr(rotate(axisDeg), skewX(a));
    return mtrMultMtr(mixMatrix, rotate(-axisDeg));
}

translate(-100, -50)



/** */





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
console.log(scale(2, 1.5));
var res = vecMultMtr([80, 80], scale(2, 1.5))
console.log(res)

