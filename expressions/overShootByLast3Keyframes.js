decay = 2.0;

if (numKeys > 3 && time > key(numKeys).time) {
    nBefore = (numKeys - 2);
    nEnd = (numKeys - 1);
    nAfter = (numKeys);

    tBefore = key(nBefore).time;
    tEnd = key(nEnd).time;
    tAfter = key(nAfter).time;
    t = time - tAfter;

    freq = 1 / (tAfter - tBefore) / 2;
    w = freq * Math.PI * 2;
    K = Math.cos(t * w) / Math.exp(decay * t);

    if (K > 0) {
        tAdd = linear(Math.abs(K), 0, 1, 0, tAfter - tEnd);
    } else {
        tAdd = -linear(Math.abs(K), 0, 1, 0, tEnd - tBefore);
    }
    valueAtTime(tEnd + tAdd);
} else { value; }