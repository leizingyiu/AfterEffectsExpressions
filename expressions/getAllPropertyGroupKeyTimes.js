var range = (min, max, step) => [...new Array(Math.floor((max + step - min) / step))].map((n, idx) => idx * step + min);
function propGroupTransformKeyTimes(prop) {
    var i = 1, keyTimesArr = [], p;
    while (typeof (prop.propertyGroup(i).hasParent) == 'undefined') {
        p = prop.propertyGroup(i);
        ('undefined' != typeof p.transform) && (range(1, p.transform.numProperties, 1).map(j => range(1, (p.transform(j).name != p.transform.opacity.name) && p.transform(j).numKeys, 1).map(k => keyTimesArr.push(p.transform(j).key(k).time))));
        i++
    }
    return keyTimesArr;
}
function propertyKeyTimes(prop) {
    return range(1, prop.numKeys, 1).map(i => prop.key(i).time);
}

function propAndGroupKeyTimes(prop) {
    return [...new Set([...propGroupTransformKeyTimes(prop), ...propertyKeyTimes(prop)].sort())]
}

var prop = thisComp.layer("sourcePath2").content("组 1").content("组 1").content('path').path;

var keyTimes = propAndGroupKeyTimes(prop);

keyTimes.join('\n');