/**
Array.prototype.reduce is a way of "reducing" elements in an array by calling a "reducer" callback function on each element of the array in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

Implement Array.prototype.reduce. To avoid overwriting the actual Array.prototype.reduce which is being used by the autograder, we shall instead implement it as Array.prototype.myReduce.

Examples
[1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
[1, 2, 3].myReduce((prev, curr) => prev + curr, 4); // 10
Notes
There are some nuances regarding how the Array.prototype.reduce function works and what values are being passed to the reducer callback. You are recommended to read the specification for Array.prototype.reduce on MDN Docs before attempting.
 */
interface Array<T> {
    myReduce<U>(
        this: T[],
        callbackFn: (
            acc: U,
            curr: T,
            index: number,
            array: T[]
        ) => U,
        initialValue?: U,
    ): U;
}

Array.prototype.myReduce = function (this, callback, initialValue) {
    const array = this;
    const hasInitialValue = initialValue !== undefined && initialValue !== null;
    if (array.length === 0) {
        if (!hasInitialValue) {
            throw new Error("Initial value must be provided");
        }
        return initialValue!;
    }

    let acc = hasInitialValue ? initialValue : array[0];
    const startIndex = hasInitialValue ? 0 : 1
    for (let i = startIndex; i < array.length; i++) {
        if (i in array)
            acc = callback(acc, array[i], i, array);
    }

    return acc
}

