/*
当用 time*value 想变速，调小数值发现不是变慢，而是倒车；
这时候用这个 timeSumUp 就可以把value作为速度调节了。
（实际上就是数学的积分）

timeSumUp(t,prop)
t   时间参数，单位为秒；使用time时，计算每一刻的累积值；使用数字时，计算该时间点的累计值。
prop 属性参数，填写thisProperty时，相当于value；可获取其他属性进行计算，不影响其他属性值。


When you using time*value,and you wanna change the speed, 
you will find that reducing the value is not to slow it down , but reverse it;
At this moment, you can use this timeSumUp()　, to adjust the value as the speed.

timeSumUp(t,prop)

't' is the time parameter, in seconds;
when using 'time', calculate the cumulative value at each moment;
when using number, calculate the cumulative value at that point in time.

'prop' is the property parameter,
when filling in 'thisProperty', is equivalent to value;
other properties can be obtained for calculation without affecting other property values.

*/

/* by leizingyiu */
/*转载须署名，保留原始链接*/

function timeSumUp(t, prop) {
    f = timeToFrames(t);
    if (f == 0) {
        return prop.valueAtTime(0) * thisComp.frameDuration;
    } else {
        T = framesToTime(f - 1);
        return valueAtTime(t) * thisComp.frameDuration + timeSumUp(T, prop);
    }
}
timeSumUp(time, thisProperty);