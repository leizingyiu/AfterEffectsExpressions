var prop = thisComp.layer("“图层 2”轮廓").content("组 1").content(thisLayer.name).path;
var p, i, o, values = '';
var keyTimes = '';
var begin, dur;

function propLayerInThisComp(prop) { var i = 0; while (typeof (prop.propertyGroup(i + 1).hasParent) == 'undefined') { i++ } var result = thisComp.layer(prop.propertyGroup(i + 1).name); return result; }
var pLayer = propLayerInThisComp(prop);


var anchorPoint, position = [0, 0];
var scale = [100, 100];
var i = 1;
while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
    if (typeof (prop.propertyGroup(i).transform) != 'undefined') {
        anchorPoint = add(anchorPoint, prop.propertyGroup(i).transform.anchorPoint);
        position = add(position, prop.propertyGroup(i).transform.position);
        scale = scale.map((v, idx) => v * prop.propertyGroup(i).transform.scale[idx] / 100);
    }
    i++;
}
var transformAdding = sub(position, anchorPoint)
var transformTxt = JSON.stringify([anchorPoint, position, scale], ' ');



for (let i = 1; i < prop.numKeys + 1; i++) {
    let T = prop.numKeys != 0 ? prop.key(i).time : time;
    P = prop.points(T);
    I = prop.inTangents(T);
    O = prop.outTangents(T);

    for (let j = 0; j < P.length; j++) {
        var cP = P[j] + transformAdding;

        if (j == 0) {
            values += 'm';
            values += cP.join(' ') + ' ';

        } else {
            let pO = O[j - 1] + P[j - 1] + transformAdding;
            let pI = I[j] + P[j] + transformAdding;
            let pP = P[j] + transformAdding;
            values += 'C'
            values += pO.join(' ') + ' , ' + pI.join(' ') + ',' + pP.join(' ');
        }
        values += '\n';
    }
    values += '; \n\n ';

    keyTimes += ';' + (prop.key(i).time - prop.key(1).time) / (prop.key(prop.numKeys).time - prop.key(1).time);
}
begin = prop.key(1).time - pLayer.inPoint;
dur = (prop.key(prop.numKeys).time - prop.key(1).time);

/** 路径检测 */
var testingTxt = '';
while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
    testingTxt += prop.propertyGroup(i).name;
    if (typeof (prop.propertyGroup(i).transform) != 'undefined') {
        testingTxt += 'yes!!; \n ';
    } else {
        testingTxt += '\n';
    }
    i++;
}
testingTxt;
values;
//transformTxt;

var beforeText = '<animate attributeName="d" attributeType="XML" ';
var afterText = 'repeatCount="indefinite" fill="freeze"></animate>';


// ```<animate attributeName="d"
// attributeType="XML"

// values="20;50;20"
// keyTimes="0;0.2;1"

// calcMode="spline"  keySplines=".5 0 .5 1;.5 0 .5 1"

// begin="0" dur="1" repeatCount="indefinite"
// fill="freeze"

// ></animate>```


var result = beforeText + ' values="' + values + '"' + ' keyTimes="' + keyTimes + '"' + ' begin="' + begin + '"' + ' dur="' + dur + '" ' + afterText
