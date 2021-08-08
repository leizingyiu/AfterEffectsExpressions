var prop = thisComp.layer("“图层 2”轮廓").content("组 1").content(thisLayer.name).path;
var p, i, o, txt = '';
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
            txt += 'm';
            txt += cP.join(' ') + ' ';

        } else {
            let pO = O[j - 1]+P[j-1]+transformAdding;
            let pI = I[j] +P[j]+ transformAdding;
            let pP = P[j] + transformAdding;
            txt += 'C'
            txt += pO.join(' ') + ' , ' + pI.join(' ') + ',' + pP.join(' ');
        }
        txt += '\n';
    }
    txt += '; \n\n ';
}



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
txt;
//transformTxt;
