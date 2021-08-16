function overShoot(obj, freq, decay) {
    obj = obj == undefined ? thisProperty : obj;
    freq = freq == undefined ? 3 : freq;
    decay = decay == undefined ? 5 : decay;
    var n = 0;
    if (obj.numKeys > 0) {
        n = obj.nearestKey(time).index;
        if (obj.key(n).time > time) {
            n--
        }
    }
    if (n > 0) {
        t = time - obj.key(n).time;
        amp = obj.velocityAtTime(key(n).time - 0.001);
        w = freq * Math.PI * 2;
        result = obj.value + amp * (Math.sin(t * w) / Math.exp(decay * t) / w)
    } else {
        result = value
    };
    return result
}

overShoot(thisProperty, 3, 5);