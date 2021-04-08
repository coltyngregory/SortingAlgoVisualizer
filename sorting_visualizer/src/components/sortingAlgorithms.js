export function bubbleSortAnimations(array) {
	const animations = [];
	const auxiliaryArray = array.slice();
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < auxiliaryArray.length; i++) {
            if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
            	const temp = auxiliaryArray[i + 1];
    			auxiliaryArray[i + 1] = auxiliaryArray[i];
    			auxiliaryArray[i] = temp;
                // swap(i, i + 1, array);
                animations.push([i, i + 1]);
                sorted = false;
            }
        }
    }
    return animations;
}
