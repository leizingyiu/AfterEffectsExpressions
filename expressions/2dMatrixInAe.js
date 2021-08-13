

function mtrMultMtr0(matrixA, matrixB) {

    let res = [];
    let b = 0;
    for (let k = 0; k < 16; k++) {
        let a = Math.floor(k / 4);
        let n = 0;

        for (let j = 0; j < 16; j += 4) {
            console.log([a, b, j]);
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
    var l = matrixA.length;
    console.log(l);
    for (let k = 0; k < l; k++) {
        let a = Math.floor(k / Math.pow(l, 0.5));
        let n = 0;

        for (let j = 0; j < l; j += Math.pow(l, 0.5)) {
            console.log([a, b, j]);
            n += matrixA[a + j] * matrixB[b + j];
        }
        b++;
        if (b == Math.pow(l, 0.5)) {
            b = 0
        };
        res.push(n)
    }
    return res;
}

function mtrMultMtr(matrixA, matrixB) {
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
            txt += matrixA[a + m] + ' x ' + matrixB[b + n] + ' + ';
            idTxt += (a + m + 1) + ' x ' + (b + n + 1) + '   ';

            N += matrixA[a + m] * matrixB[b + n];
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
M = mtrMultMtr([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 1, 2, 3, 1, 2, 3])
console.log(M)



mtrMultMtr([1, 0, 1, 1], [1, 0, 4, 5])


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
        1, 0, x,
        0, 1, y,
        0, 0, 1
    ];
}

function rotate(a) {
    return [
        Math.cos(a), -Math.sin(a), 0,
        Math.sin(a), Math.cos(a), 0,
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