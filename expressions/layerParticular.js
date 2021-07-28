/** by leizingyiu */
var k = 1000;
var full = 3600;
var i = index;

var t1 = (noise(i * k * noise(i)) + 1) / 2 * thisComp.duration;
var t2 = (noise((thisComp.numLayers - i) * k * noise(i)) + 1) / 2 * thisComp.duration;
var T = 0;
var offset = noise(i * k) * full;
if (numKeys > 1) {
    T = linear(time, t1, t2, key(0).time, key(numKeys).time);
    valueAtTime(T) + offset;
} else {
    linear(time, t1, t2, offset, value);
}



