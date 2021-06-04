/* 环形线性插值 */
/* by leizingyiu */
/*转载须署名，保留原始链接*/

/**
 * 0  <  a,b  <  range  
 * 
 * a,b 都大于0，小于range
 * _________________________________________
 * 
 * [0=>k=>1]  ==>  [a==>b]/[a==>0,range==>b]
 * 
 * k 从 0 到 1 时，逐渐输出从 a 到 b 之间的值，
 * 假如 a 和 b 的差，小于 range/2，则输出 a 到 b ，
 * 假如 a 和 b 的差，大于 range/2，则输出 a 到 0 , range 到 b ，
 * 
 * 具体应用参考 loopHslLinear.js 
 * */

function loopLinear(k, a, b, range) {
  var difference = (Math.abs(a - b) > range / 2) ? (range - Math.abs(a - b)) : (-Math.abs(a - b));
  var direction = b - a > 0 ? -1 : 1;
  var result = (a + k * difference * direction + range) % range;
  return result;
}