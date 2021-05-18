/*  三角波
    t在cycle周期中
    输出 0 到 1 再到 0 
*/
/* by leizingyiu */
/*转载须署名，保留原始链接*/
function triWave(t, cycle) {
    return 1 - Math.abs((t % (cycle) + cycle) % (cycle) - cycle / 2) / (cycle / 2);   //by leizingyiu
}
triWave(time, 1);