/**
 * https://blog.csdn.net/github_38108899/article/details/90480584
 * js计算matrix 实现transform_天边那朵云的博客-CSDN博客_js matrix
 * 
 * https://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%e7%9f%a9%e9%98%b5/
 * 理解CSS3 transform中的Matrix(矩阵) « 张鑫旭-鑫空间-鑫生活
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix3d()
 * matrix3d() - CSS（层叠样式表） | MDN 
 * 
 * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix()
 * matrix() - CSS: Cascading Style Sheets | MDN
 * */
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
    origMatrix = typeof origMatrix == 'undefined' ? [1, 0, 0, 0, 1, 0, 0, 0, 1] : origMatrix;
    return mtrMults(origMatrix, anchor(...daAnchor), skew(daSkew, daSkewAxis), scale(...daScale.map(i => i / 100)), rotate(daRotate), translate(...daPosition));
}

var res = transform([100, 100], transformPropGroup);


/** from ae  */

parentAnchor = transformPropGroup("锚点").value;
parentPosition = transformPropGroup("位置").value;
parentScale = transformPropGroup("比例").value;
parentSkew = transformPropGroup("倾斜");
parentSkewAxis = transformPropGroup("倾斜轴");
parentRotate = transformPropGroup("旋转");

var res = vecMultMtr([100, 100],
    mtrMults(
        anchor(...parentAnchor),
        skew(parentSkew, parentSkewAxis),
        scale(...parentScale.map(i => i / 100)),
        rotate(parentRotate),
        translate(...parentPosition),
    )
);
