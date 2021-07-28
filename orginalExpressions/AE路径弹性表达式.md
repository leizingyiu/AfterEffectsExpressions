<script id='parameter'>
{
"expressions":{
    "overShootForPath.js":{
        "download":["bounceBackForPath.ffx"]
    },

    "bounceBackForPath.js":{
        "download":"overShootForPath.ffx"
        }
    },

"title":"路径动画都也可以用的，万能弹性表达式",
"description":"在右边复制过去就好"
}
</script>

# 原来的弹性表达式在路径用不了，</br>现在，可以了！！！

<br>
<div style="background:#000;margin:0.5em;" class='shadow'>
<video src="http://pic.leizingyiu.net/bouncebackForPath_0.mp4" width="49%"  controls="controls" autoplay="autoplay" loop="loop"  style="display:inline" muted></video>
<video src="http://pic.leizingyiu.net/bouncdbackForPath_1.mp4" width="49%"  controls="controls" autoplay="autoplay" loop="loop"  style="display:inline" muted></video></br>
<video src="http://pic.leizingyiu.net/overShootForPath_0.mp4" width="49%"  controls="controls" autoplay="autoplay" loop="loop"  style="display:inline" muted></video>
<video src="http://pic.leizingyiu.net/overShootForPath_1.mp4" width="49%"  controls="controls" autoplay="autoplay" loop="loop"  style="display:inline" muted></video></div>

## 如何使用

做好路径动画之后，把表达式粘贴进去 <sub>(点击右边 COPY 按钮复制)

<div style="padding:0.5em;text-align: center;"><video src="http://pic.leizingyiu.net/overShootForPath_js_example.mp4" width="99%"  controls="controls" autoplay="autoplay" loop="loop" muted style=" display: inline;" class='shadow' ></video></div>

或者做好路径动画之后，选中路径属性，双击预设 <sub>(右边 download 按钮下载，存去预设文件夹)</sub>

<div style="padding:0.5em;text-align: center;">
<video src="http://pic.leizingyiu.net/bounceBackForPath_ffx_example.mp4" width="99%"  controls="controls" autoplay="autoplay" loop="loop" muted   style=" display: inline;" class='shadow' ></video></div>

## 表达式说明 <sub>(数学课时间)</sub>

我们通常这样制作弹性动画

譬如使用弹性表达式，又或者使用一些插件

<div>
<video src="http://pic.leizingyiu.net/overshootAndBounceback_oldExample_expression.mp4" width="96%"  controls="controls" autoplay="autoplay" loop="loop"   muted style="margin-top:1em;" class='shadow' ></video>
<video src="http://pic.leizingyiu.net/overshootAndBounceback_oldExample_plugin.mp4" width="96%"  controls="controls" autoplay="autoplay" loop="loop"    muted style="margin-top:1em;" class='shadow' ></video>
</div>

<p style="font-size:4rem;text-align:center">😎</p>

但是到目前<sub>（2021 年 6 月 5 日）</sub>为止，我没发现有什么其他办法，让路径动画轻松产生弹性

<div><img src="http://pic.leizingyiu.net/overshootAndBounceback_expression_error.png" width="49%" style="display:inline;margin:0!important;padding:0!important" class='shadow' /><video  src="http://pic.leizingyiu.net/overshootAndBounceback_plugin_error.mp4"   controls="controls"   width="49%"  autoplay="autoplay" loop="loop" muted  style="width:'49%!important' ;display:inline" class='shadow' ></video></div>

在 AE 推出路径相关表达式前，确实没有什么办法 🥺

<p style="font-size:4rem;text-align:center">😢😢😢</p>

而在 AE2018<sub>（还是 2017 来着？）</sub>后，新增了<a href="https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html#%E8%AE%BF%E9%97%AE%E6%9C%89%E5%85%B3%E5%BD%A2%E7%8A%B6%E8%92%99%E7%89%88%E5%92%8C%E7%94%BB%E7%AC%94%E6%8F%8F%E8%BE%B9%E7%9A%84%E8%B7%AF%E5%BE%84%E7%82%B9%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%BC%95%E7%94%A8"> points、inTangents、outTangents、createPath</a> 等方法

让路径自动产生弹性，成为可能 👍

<div style="padding:0.5em;">
<video src="http://pic.leizingyiu.net/bouncdbackForPath_1.mp4" width="49%"  controls="controls" autoplay="autoplay" loop="loop"  style="display:inline" muted class='shadow' ></video>
<video src="http://pic.leizingyiu.net/overShootForPath_1.mp4" width="49%"  controls="controls" autoplay="autoplay" loop="loop"  style="display:inline" muted class='shadow' ></video></div>

<br>

原来的弹性表达式，有 <a href="https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html#property_attributes_and_methods_expression_reference">velocity</a> 这个点，

```javascript:
Keyframe Overshoot:
……
t = time - key(n).time;
amp = velocityAtTime(key(n).time - .001);
……
```

<br>

而 <a href="https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html#property_attributes_and_methods_expression_reference">velocity</a> 是为了获得关键帧之前极短时刻的速度

> velocity —— 返回类型：数值或数组。 返回当前时间的临时速度值。对于空间属性（例如位置），它返回正切矢量值。结果与属性的维度相同。

> velocityAtTime(t) —— 返回类型：数值或数组。 参数类型：t 是数值。返回指定时间的临时速度值。

详情见：[https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html](https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html)

<br><br>

但是路径属性 <sub><a href="https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html#%E8%AE%BF%E9%97%AE%E6%9C%89%E5%85%B3%E5%BD%A2%E7%8A%B6%E8%92%99%E7%89%88%E5%92%8C%E7%94%BB%E7%AC%94%E6%8F%8F%E8%BE%B9%E7%9A%84%E8%B7%AF%E5%BE%84%E7%82%B9%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%BC%95%E7%94%A8">path</a></sub> 中，没办法获得速度值<sub>（你可以去上面的的链接里面的 _<a href="https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html#%E8%AE%BF%E9%97%AE%E6%9C%89%E5%85%B3%E5%BD%A2%E7%8A%B6%E8%92%99%E7%89%88%E5%92%8C%E7%94%BB%E7%AC%94%E6%8F%8F%E8%BE%B9%E7%9A%84%E8%B7%AF%E5%BE%84%E7%82%B9%E7%9A%84%E8%A1%A8%E8%BE%BE%E5%BC%8F%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%BC%95%E7%94%A8">访问有关形状、蒙版和画笔描边的路径点的表达式</a>_ 找找</sub>

<p style="font-size:4rem;text-align:center">🤓</p>

在物理上，平均速度是物体在一段时间里的位移

$$
\overline{v}=\frac{S}{t}
$$

只要这段时间足够足够短，短到变成一个瞬间，平均速度，就会变成这个时间点的瞬时速度

$$
v=\frac{\Delta{s}}{\Delta{t}}
$$

而在 AE 属性的关键帧的速度，也可以用这个办法来获得很接近的近似值，只要

$$
{velocity}=\frac{valueAtTime(key(n).time)-valueAtTime(key(n).time-\Delta{t})}{\Delta{t}}
$$

所以对于路径来说，只要得到很短时间内的变化值，再除以这个很短的时间，就得到对应的速度了

```javascript
......

deltaTime = 0.001;
keyNTime = obj.key(n).time;

......

var vMapFn = (i => i.map(j => j * (0 - e) / deltaTime));
var pvArr = [...subArr(obj.points(keyNTime), obj.points(keyNTime-deltaTime))].map(vMapFn);

/* ( 点(keyNTime) - 点(keyNTime - deltaTime) ) / deltaTime */

......
```

剩下的事情，就是把原来只对 value 值做的处理，对路径的每一个 point<sub>（点）</sub>、 inTangent、outTangent<sub>（出入切线点，也就是平时画曲线的杠杆点）</sub> 逐一进行处理，就行了 👀

<p style="font-size:3rem;text-align:center">而你只需要在右边下载保存，或者点击 [COPY] 复制，</br>就可以用啦🥳🥳🥳</p>
