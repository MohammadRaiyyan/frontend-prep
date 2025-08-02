/*
Implement a function flatten that returns a newly-created array with all sub-array elements concatenated recursively into a single level.

Examples
// Single-level arrays are unaffected.
flatten([1, 2, 3]); // [1, 2, 3]

// Inner arrays are flattened into a single level.
flatten([1, [2, 3]]); // [1, 2, 3]
flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

// Flattens recursively.
flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
**/
type ArrayValue = any | Array<ArrayValue>
export function flatten(array: Array<ArrayValue>): Array<any> {
    const result: any[] = [];
    for (let val of array) {
        if (Array.isArray(val)) {
            result.push(...flatten(val))
        } else {
            result.push(val)
        }
    }
    return result
}

