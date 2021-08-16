/* http://www.motionscript.com/articles/bounce-and-overshoot.html */

freq = 3;
decay = 5;

n = 0;
if (numKeys > 0) {
    n = nearestKey(time).index;
    if (key(n).time > time) n--;
}
if (n > 0) {
    t = time - key(n).time;
    amp = velocityAtTime(key(n).time - .001);
    w = freq * Math.PI * 2;
    value + amp * (Math.sin(t * w) / Math.exp(decay * t) / w);
} else
    value