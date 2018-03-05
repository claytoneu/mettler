// Array shuffling
export function shuffleArray<T>(arr: T[]) {
    let shuffled = arr.slice();
    let temp = undefined;

    for (let i = 0; i < shuffled.length; i++) {
        let newIndex = Math.floor(Math.random() * shuffled.length);
        temp = shuffled[newIndex];
        shuffled[newIndex] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled;
}

// Array intersection
export function intersectArrays<T>(left: T[], right: T[]): T[] {
    return left.filter(function(element: T) {
        return right.indexOf(element) > -1;
    });
}

// Array transposition
// T[col][row] -> T[row][col]
export function transposeArray<T>(arr: T[][]): T[][] {
    let numTransCols = arr[0].length;
    let numTransRows = arr.length;
    let transposed: T[][] = new Array<Array<T>>();    

    for (let col = 0; col < numTransCols; col++) {
        transposed[col] = new Array<T>(numTransRows);
        for (let row = 0; row < numTransRows; row++) {
            transposed[col][row] = arr[row][col];
        }
    }

    return transposed;
}
