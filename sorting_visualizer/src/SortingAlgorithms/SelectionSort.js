export function getSelectionSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    selectionSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    array = auxillaryArray;
    return [animations, array];
}

function selectionSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    for (let i = 0; i < N - 1; i++) {
        let minIndex = i; //Finding minimum element in unsorted array
        for (let j = i + 1; j < N; j++) {
            animations.push(["comparisonOne", j, minIndex]);
            animations.push(["comparisonTwo", j, minIndex]);
            if (auxillaryArray[j] < auxillaryArray[minIndex]) {
                minIndex = j;
            }
        }
        animations.push(["swap", minIndex, auxillaryArray[i]]);
        animations.push(["swap", i, auxillaryArray[minIndex]]);
        // Swap the found minimum element with the first element
        swap(auxillaryArray, minIndex, i);
    }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}