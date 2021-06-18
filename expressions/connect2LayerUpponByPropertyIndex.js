let N = index - 1;
let arr = [];
for (i = 1; i < N; i++) {
    for (j = N; j > i; j--) {
        arr[arr.length] = [i, j];
    }
}
let n = thisProperty.propertyGroup(1).propertyIndex - 1;
arr = arr.map(ar => ar.map(a => thisLayer.fromComp(thisComp.layer(a).toComp(thisComp.layer(a).transform.anchorPoint))));

createPath(arr[n], [], [], false);