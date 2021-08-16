function bounceBack(obj, e, g, nMax) {
    obj = obj == undefined ? thisProperty : obj;
    e = e == undefined ? 0.7 : e;
    g = g == undefined ? 5000 : g;
    nMax = nMax == undefined ? 9 : nMax;
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
            result = value + vu * delta * (vl - g * delta / 2)
        } else {
            result = obj.value
        }
    } else {
        result = obj.value
    }
    return result
}

bounceBack(thisProperty, 0.7, 5000, 9);