/* 沿着色环的渐变 */
/* by leizingyiu */
/*转载须署名，保留原始链接*/
var c1 = thisComp.layer("layer1").content("rect").content("color1").color;
var c2 = thisComp.layer("layer1").content("rect").content("color2").color;
var k = time; var a = 0; var b = thisComp.duration;
/**
 * c1、c2 是使用拾取器获取的颜色；
 * k 是当前时间轴指针对应的时间；
 * a 和 b 是时间轴的起始和结束。
 * 
 * 当 k 从 a 到 b 的时候，最后会输出从 c1 到 c2 的颜色，
 * 中间保持艳度、明度，色相沿色环变化。
 * 
 * 关于loopLinear，请查看 loopLinear.js
*/

function loopHslLinear(t, tMin, tMax, color1, color2) {
	var loopLinear = function (k, a, b, range) {

		/* 关于 loopLinear 的介绍，请查看 loopLinear.js */

		var difference = (Math.abs(a - b) > range / 2) ? (range - Math.abs(a - b)) : (-Math.abs(a - b));
		var direction = b - a > 0 ? -1 : 1;
		var result = (a + difference * k * direction + range) % range;
		return result;
	}
	var hslColor = linear(t, tMin, tMax, rgbToHsl(color1), rgbToHsl(color2));
	hslColor[0] = loopLinear(linear(t, tMin, tMax, 0, 1), rgbToHsl(color1)[0], rgbToHsl(color2)[0], 1);
	return hslToRgb(hslColor);
}

loopHslLinear(k, a, b, c1, c2);