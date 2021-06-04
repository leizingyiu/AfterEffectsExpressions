/*来源      https://www.motionscript.com/design-guide/looping-wiggle.html */
/*source:   https://www.motionscript.com/design-guide/looping-wiggle.html */

fr = effect("freq")(1); /* 频率，添加滑块控制器，按回车改名 freq ，或者直接填数字 fr=5;  */
am = effect("amp")(1);  /* 振幅，添加滑块控制器，按回车改名 amp ，或者直接填数字 amp=10;  */
lt = thisComp.duration; /* 周期，thisComp.duration 是这个合成的持续时间，或者直接填数字 lt=3;  */

function loopWiggle(freq, amp, loopTime) {


    var t = time % loopTime;
    var wiggle1 = wiggle(freq, amp, 1, 0.5, t);
    var wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);
    var result = linear(t, 0, loopTime, wiggle1, wiggle2);
    return result;
}
loopWiggle(fr, am, lt);