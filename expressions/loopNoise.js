/* 
循环的噪音曲线，可以理解为循环连续的随机数
by leizingyiu */
/*转载须署名，保留原始链接*/

/**
 * t,T,seed 是数值
 * t 是时间，T是周期，
 * seed是起始偏移，相当于‘自动滚动’的相位，
 * 
 * 当t不断增大，从 0 到 T ，
 * 不断输出 0 到 1 之间的连续随机数字
 * 
 * _____________________________
 * 
 * 在文本层使用时可以：
 * r=loopNoise(time,thisComp.duration,index)*最大值;
 * */

function loopNoise(t, T, seed) {


    var r1 = noise(t % T + seed);
    var r2 = noise(-(T - t % T) + seed);
    var r = linear(t % T, 0, T, r1, r2);
    return r;
}

