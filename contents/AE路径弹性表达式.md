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

# 原来的弹性表达式在路径用不了，现在，可以了！！！

## 如何使用

做好路径动画之后，把表达式粘贴进去 <sub>(点击右边 COPY 按钮复制)  
![img ]()

或者做好路径动画之后，选中路径属性，双击预设 <sub>(右边 FFX 按钮下载，存去预设文件夹)</sub>  
![img ]()

## 表达式说明 <sub>(数学课时间)</sub>

我们通常这样制作弹性动画

譬如使用弹性表达式

!(img 弹性表达式 回弹)[]49%

!(img 弹性表达式 反弹)[]49%

<br>

又或者使用一些插件

!(img motion2 回弹)[]49%

!(img motion2 反弹)[]49%

<br>

!(img 表情包 赞)[]

<br>

但是到目前（2021 年 6 月 5 日）为止，我没发现有什么办法，让路径动画产生弹性

!(img 路径弹性表达式报错)[]49%

!(img 路径 motion2 报错)[]49%

在 AE 推出路径相关表达式前，确实没有什么办法 😢😢😢<br><br>

!(img 表情包)[]

<br>

而在 AE2018<sub>（还是 2017 来着？）</sub>后，新增了 points、inTangents、outTangents、createPath 等方法

让路径自动产生弹性，成为可能 👍

!(img 路径弹性效果图 回弹)[]49%

!(img 路径弹性效果图 反弹)[]49%

<br>

原来的弹性表达式，有 velocity 这个点，

```javascript:
Keyframe Overshoot:
……
t = time - key(n).time;
amp = velocityAtTime(key(n).time - .001);
……
```

<br>

而 velocity 是为了获得关键帧之前极短时刻的速度

> velocity —— 返回类型：数值或数组。 返回当前时间的临时速度值。对于空间属性（例如位置），它返回正切矢量值。结果与属性的维度相同。

> velocityAtTime(t) —— 返回类型：数值或数组。 参数类型：t 是数值。返回指定时间的临时速度值。

[https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html](https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html)

<br><br>

但是路径属性中，没办法获得速度值<sub>（你可以去上面的的链接里面的 _访问有关形状、蒙版和画笔描边的路径点的表达式（表达式引用）_ 找找</sub>

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

​
