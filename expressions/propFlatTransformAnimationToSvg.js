
var animateObject = {
    beforeText: '<animate ',
    afterText: '></animate>',
    
}

var frames = thisComp.duration / thisComp.frameDuration;
for (let f = 0; f < frames; f++) {


}



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