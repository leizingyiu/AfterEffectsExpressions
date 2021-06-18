/**
 * 

obj = thisProperty;
e = 0.7;
g = 5000;
nMax = 9;
n = 0;
if (obj.numKeys > 0) {
    n = obj.nearestKey(time).index;
    if (obj.key(n).time > time) {
        n--
    }
}
if (n > 0) {
    t = time - obj.key(n).time;
    v = -obj.velocityAtTime(obj.key(n).time - 0.001) * e;
    vl = length(v);
    if (obj.value instanceof Array) {
        vu = (vl > 0) ? normalize(v) : [0, 0, 0]
    } else {
        vu = (v < 0) ? -1 : 1
    }
    tCur = 0;
    segDur = 2 * vl / g;
    tNext = segDur;
    nb = 1;
    while (tNext < t && nb <= nMax) {
        vl *= e;
        segDur *= e;
        tCur = tNext;
        tNext += segDur;
        nb++
    }
    if (nb <= nMax) {
        delta = t - tCur;
        vAdd=vu * delta * (vl - g * delta / 2);
        value + vAdd;
    	
    } else {
        value
    }


} else {
    value
}




















































obj = thisProperty;
e = 0.7;
g = 5000;
nMax = 9;
n = 0;

vk = 1;

if (numKeys > 3 && time > key(numKeys).time) {
    n = numKeys;


    tArr = [obj.key(n - 2).time, obj.key(n - 1).time, obj.key(n).time];
    t = tArr[2] - tArr[1];
    T = 0.1;
    nMax = 20;
    n = 0;

    l = tArr.length;
    k = (tArr[l - 1] - tArr[l - 2]) / (tArr[l - 1] - tArr[l - 3]);
    console.log(k);

    while (t > T && n < nMax) {
        l = tArr.length;
        tArr[tArr.length] = tArr[l - 1] + (tArr[l - 1] - tArr[l - 2]) * k;
        t = tArr[l - 2] - tArr[l - 3];
        n++;
    }
 
    TArr[TArr.length]=time;
    TArr=[...new Set(TArr)].sort();
    b=TArr[TArr.indexOf(time)-1];
    a=TArr[TArr.indexOf(time)+1];
    T = Math.sin(((time - b) / (a - b)) * Math.PI) * (a - b);
    valueAtTime(key(n).time - T);
} else {
    value
}

*/



var prop = thisProperty;
var NMax = 9;
var minDeltaTime = 0.01;

if (prop.numKeys > 3 && time > prop.key(prop.numKeys).time) {

    var n = prop.numKeys;
    var tArr = [prop.key(n - 2).time, prop.key(n - 1).time, prop.key(n).time];
    var t = tArr[2] - tArr[1];

    var l = tArr.length;
    var k = (tArr[l - 1] - tArr[l - 2]) / (tArr[l - 1] - tArr[l - 3]);

    var N = 0;
    while (t > minDeltaTime && N < NMax) {
        l = tArr.length;
        tArr[tArr.length] = tArr[l - 1] + (tArr[l - 1] - tArr[l - 2]) * k;
        t = tArr[l - 2] - tArr[l - 3];
        N++;
    }

    tArr = tArr.slice(2, tArr.length);
    tArr = tArr.map(function (ta, idx) {
        ta = (idx + 1) % 2 == 0 ? false : ta;
    })
    tArr = tArr.filter(Boolean);

    tArr[tArr.length] = time;
    tArr = tArr.sort();
    var b = tArr[tArr.indexOf(time) - 1];
    var a = tArr[tArr.indexOf(time) + 1];


    deltaTime = a - b > minDeltaTime ? Math.sin(((time - b) / (a - b)) * Math.PI) * (a - b) : 0;



    prop.valueAtTime(prop.key(n).time - deltaTime);

} else {
    value;

}




var prop = thisProperty;
var NMax = 10;
var minDeltaTime = 0.01;
var extraDecay = effect("滑块控制")("滑块") / 100;

if (prop.numKeys >= 3 && time > prop.key(prop.numKeys).time) {
    NMax *= 2;
    var n = prop.numKeys;
    var tArr = [prop.key(n - 2).time, prop.key(n - 1).time, prop.key(n).time];
    var t = tArr[2] - tArr[1];

    var l = tArr.length;
    var k = (tArr[l - 1] - tArr[l - 2]) / (tArr[l - 1] - tArr[l - 3]);

    var N = 0;
    while (t > minDeltaTime && N < NMax) {
        l = tArr.length;
        tArr[tArr.length] = tArr[l - 1] + (tArr[l - 1] - tArr[l - 2]) * k * (1 - extraDecay);
        t = tArr[l - 2] - tArr[l - 3];
        N++;
    }

    tArr = tArr.slice(2, tArr.length);
    tArr = tArr.map(function (ta, idx) {
        ta = (idx + 1) % 2 == 0 ? false : ta;
        return ta;
    })
    tArr = tArr.filter(Boolean);

    tArr[tArr.length] = time;
    tArr = tArr.sort();
    var b = tArr[tArr.indexOf(time) - 1];
    var a = tArr[tArr.indexOf(time) + 1];


    deltaTime = a - b > minDeltaTime ? Math.sin(((time - b) / (a - b)) * Math.PI) * (a - b) : 0;



    prop.valueAtTime(prop.key(n).time - deltaTime);

} else {
    value;

}


/**—————— */



var prop = thisProperty;
var NMax = 10;
var minDeltaTime = 0.01;
var decay = 1;

if (prop.numKeys >= 3 && time > prop.key(prop.numKeys).time) {
    NMax *= 2;
    var n = prop.numKeys;
    var tArr = [prop.key(n - 2).time, prop.key(n - 1).time, prop.key(n).time];
    var t = tArr[2] - tArr[1];

    var l = tArr.length;
    var k = (tArr[l - 1] - tArr[l - 2]) / (tArr[l - 1] - tArr[l - 3]);

    var N = 0;
    while (t > minDeltaTime && N < NMax) {
        l = tArr.length;
        tArr[tArr.length] = tArr[l - 1] + (tArr[l - 1] - tArr[l - 2]) * k ;
        t = tArr[l - 2] - tArr[l - 3];
        N++;
    }

    tArr = tArr.slice(2, tArr.length);
    tArr = tArr.map(function (ta, idx) {
        ta = (idx + 1) % 2 == 0 ? false : ta;
        return ta;
    })
    tArr = tArr.filter(Boolean);

    tArr[tArr.length] = time;
    tArr = tArr.sort();
    var b = tArr[tArr.indexOf(time) - 1];
    var a = tArr[tArr.indexOf(time) + 1];


    deltaTime = a - b > minDeltaTime ? Math.sin(((time - b) / (a - b)) * Math.PI) * (a - b) / Math.exp((time - key(n).time) * decay)  : 0;



    prop.valueAtTime(prop.key(n).time - deltaTime);

} else {
    value;

}




/**____________ */



var prop = thisProperty;

var NMax = 20;
var minDeltaTime = 0.005;
var e = 0.8;

if (prop.numKeys >= 3 && time >= prop.key(prop.numKeys).time) {
    NMax *= 2;
    var n = prop.numKeys;
    var tArr = [prop.key(n - 2).time, prop.key(n - 1).time, prop.key(n).time];
    var t = tArr[2] - tArr[1];

    var l = tArr.length;
    var k = (tArr[l - 1] - tArr[l - 2]) / (tArr[l - 1] - tArr[l - 3]);

    var N = 0;
    while (t > minDeltaTime && N < NMax) {
        l = tArr.length;
        t *= e;
        tArr[tArr.length] = tArr[l - 1] + t;
        N++;
    }

    tArr = tArr.slice(2, tArr.length).map((ta, idx) => (idx + 1) % 2 == 0 ? false : ta).filter(Boolean);
    tArr[tArr.length] = time;
    tArr = tArr.sort();
    var b = tArr[tArr.indexOf(time) - 1];
    var a = tArr[tArr.indexOf(time) + 1];

    deltaTime = a - b >= minDeltaTime ? Math.sin(((time - b) / (a - b)) * Math.PI) * (a - b) : 0;
    prop.valueAtTime(prop.key(n).time - deltaTime);
} else {
    value;
}






/**__________________ */







var prop = thisProperty;

var NMax = 20;
var minDeltaTime = 0.005;
var e = 0.8;
var decay = 3;
if (prop.numKeys >= 3 && time >= prop.key(prop.numKeys).time) {
    NMax *= 2;
    var n = prop.numKeys;
    var tArr = [prop.key(n - 2).time, prop.key(n - 1).time, prop.key(n).time];
    var t = tArr[2] - tArr[1];
    var l = tArr.length;
    var k = (tArr[l - 1] - tArr[l - 2]) / (tArr[l - 1] - tArr[l - 3]);
    var N = 0;
    while (t > minDeltaTime && N < NMax) {
        l = tArr.length;
        t *= e;
        tArr[tArr.length] = tArr[tArr.length - 1] + t;
        N++;
    }

    tArr = tArr.slice(2, tArr.length).filter(Boolean)
    tArr[tArr.length] = time;
    tArr = tArr.sort();

    var b = tArr[tArr.indexOf(time) - 1];
    var a = tArr[tArr.indexOf(time) + 1];
    deltaTime = a - b >= minDeltaTime ? Math.sin(((time - b) / (a - b)) * Math.PI) * (a - b) / Math.exp((time - key(n).time) * decay) : 0;
    prop.valueAtTime(prop.key(n).time - deltaTime);
} else {
    value;
}