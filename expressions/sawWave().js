/*  锯齿波
    t在cycle周期中
    输出 0 到 1 
*/
/* by leizingyiu */
/*转载须署名，保留原始链接*/
function sawWave(t, cycle) {
    return ((t) % cycle + cycle) % cycle / cycle;   //by leizingyiu
}
sawWave(time, 1)