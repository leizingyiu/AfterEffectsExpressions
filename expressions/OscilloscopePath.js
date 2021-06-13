target = thisLayer.hasParent ? parent : thisComp.layer('sawWaveLayer');

direction = 'horizontal';
longDiv = 1;
timeDuration = thisComp.duration;

var pathPointsArr = [];
var theLong = thisComp.width;
var moveUnit = [theLong / 2 / (longDiv / 2), 0];

if (['horizontal'].indexOf(direction) == -1) {
    theLong = thisComp.height;
    moveUnit = [0, theLong / 2 / (longDiv / 2)];
}
for (i = 0; i < theLong; i++) {
    let j = (i - theLong / 2) / theLong * 2 * (longDiv / 2);
    pathPointsArr[i] = fromComp(target.position.valueAtTime(time + j * timeDuration) + j * moveUnit);
}

createPath(pathPointsArr, [], [], false);