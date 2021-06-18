let N = index - 1;
let arr = [];
for (i = 1; i < N; i++) {
    for (j = N; j > i; j--) {
        if (i == j) {
            continue;
        }
        arr[arr.length] = i;
        arr[arr.length] = j;
        arr[arr.length] = i;
    }
}
arr = arr.map(a => thisLayer.fromComp(thisComp.layer(a).toComp(thisComp.layer(a).transform.anchorPoint)));

createPath(arr, [], [], false);