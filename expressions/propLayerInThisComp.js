function propLayerInThisComp(prop) {
    var i = 0;
    while (typeof (prop.propertyGroup(i + 1).hasParent) == 'undefined') {
        i++;
    }
    var result = thisComp.layer(prop.propertyGroup(i + 1).name);
    return result;
}
propLayer = propLayerInThisComp(prop);