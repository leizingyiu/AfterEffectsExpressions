/* 
"Created": "2021/05/10 20:23:52",
"Last modified": "2021/06/05 03:54:08",
*/

/* by leizingyiu */
/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */

/** 
 * e是衰减速度，e越小，衰减越快；e越大，衰减越慢；可以理解为阻力；
 * g是每次衰减的数量，可以理解成重力；
 * nMax是反弹的最大次数；
 * deltaTime是检测碰撞前的速度取样值，假如碰撞时物体不是匀速运动，对取样范围进行调整，可能会获得不同的碰撞初速；
 * obj用来指定对某个属性进行弹性运算，默认为当前属性，可以获取其他属性使用 
 * */


e = 0.7;
g = 5000;
nMax = 9;
deltaTime = 0.001;

obj = thisProperty;
n = 0;
if (obj.numKeys > 0) {
    n = obj.nearestKey(time).index;
    if (obj.key(n).time > time) {
        n--;
    }
}

function operatingArr(fn) { return function () { let l = arguments[0].length; let arr = []; for (let i = 0; i < l; i++) { arr[i] = fn(...[...arguments].map(j => j[i])); } return arr; } }
var addArr = operatingArr((a, b) => a + b); var subArr = operatingArr((a, b) => a - b);

const range = (s, e) => (s === e) ? [s] : [s, ...range(s + 1, e)]; /*John•Apr 24 '19 • Edited on Apr 25 https://dev.to/ycmjason/how-to-create-range-in-javascript-539i */


if (n > 1) {


    var t = time - obj.key(n).time;
    var nTime = obj.key(n).time;
    var dTime = nTime - deltaTime;

    var pArr = obj.points(time); var iArr = obj.inTangents(time); var oArr = obj.outTangents(time);
    var vMapFn = (i => i.map(j => j * (0 - e) / deltaTime));
    var pvArr = [...subArr(obj.points(nTime), obj.points(dTime))].map(vMapFn);
    var ivArr = [...subArr(obj.inTangents(nTime), obj.inTangents(dTime))].map(vMapFn);
    var ovArr = [...subArr(obj.outTangents(nTime), obj.outTangents(dTime))].map(vMapFn);


    var fn = ((arr, vArr) => (function () {
        var result;

        var vlFn = (vArr => vArr.map(v => length(v)));
        var vlArr = vlFn(vArr);

        var L = arr.length;

        var vuFn = ((vlArr, vArr) => [...range(0, L - 1)].map(i => vlArr[i] > 0 ? normalize(vArr[i]) : [0, 0]));
        var vuArr = vuFn(vlArr, vArr);

        var segdurFn = (vlArr => vlArr.map(vl => 2 * vl / g));
        var segdurArr = segdurFn(vlArr);

        var vFn = (arr, vlArr, vuArr, segdurArr) => [...range(0, L - 1)].map(i => (function () {
            let val = arr[i]; let vu = vuArr[i]; let vl = vlArr[i];
            let segDur = segdurArr[i]; let tNext = 0 + segDur;

            let tCur = 0; let nb = 1;
            while (tNext < t && nb <= nMax) {
                vl *= e;
                segDur *= e;
                tCur = tNext;
                tNext += segDur;
                nb++
            }
            let result;
            if (nb <= nMax) {
                delta = t - tCur;
                result = val + (vu * delta * (vl - g * delta / 2));
                return result;
            } else {
                result = val;
                return result;
            }
        })());

        result = vFn(arr, vlArr, vuArr, segdurArr);
        return result;

    })())

    var p = fn(pArr, pvArr);
    var i = fn(iArr, ivArr);
    var o = fn(oArr, ovArr);

    createPath(p, i, o, isClosed());

} else { value; }



