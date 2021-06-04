/* 
"Created": "2021/05/10 20:23:52",
"Last modified": "2021/06/04 22:49:02",
*/

/* by leizingyiu */
/* base on http://www.motionscript.com/articles/bounce-and-overshoot.html */
obj = thisProperty;
e = 0.7;
g = 5000;
nMax = 9;
deltaTime = 0.001;

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



