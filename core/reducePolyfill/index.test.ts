import assert from "node:assert";
import test, { describe } from "node:test";
import './index';

const add = (prev: any, curr: any) => prev + curr;
const multiplyByIndex = (prev: number, curr: number, index: number) =>
    prev + curr * index;
const subtract = (prev: number, curr: number) => prev - curr;
const sumOfSquares = (prev: any, curr: any, index: number, array: Array<any>) =>
    prev + curr * array[index];
const combineObj = (prev: Object, curr: Object) => ({ ...prev, ...curr });
const combineArr = (prev: Array<any>, curr: any) => [...prev, curr];

describe('Array.prototype.myReduce', () => {
    test('empty array equals initial value', () => {
        assert.equal([].myReduce(add, 0), 0)
        assert.equal([].myReduce(subtract, 0), 0)
    });

    test('one value', () => {
        assert.equal([1].myReduce(add, 0), 1)
        assert.equal(["a"].myReduce(add, ""), "a")
    });

    test('two values', () => {
        assert.equal([-4, 10].myReduce(add, 0), 6)
        assert.equal(['b', 'c', 'd'].myReduce(add, ''), "bcd")
    });

    test('multiple values', () => {
        assert.equal([1, 2, 3].myReduce(add, 0), 6);
        assert.equal(['a', 'b', 'c', 'd'].myReduce(add, ''), "abcd");
    });

    test('object values', () => {
        assert.deepEqual([{ foo: 1 }, { bar: 2 }].myReduce(combineObj), {
            foo: 1,
            bar: 2,
        })
        assert.deepEqual([{ foo: 1 }, { bar: 2 }].myReduce(combineObj, {}), {
            foo: 1,
            bar: 2,
        });
    });

    test('array values', () => {
        assert.deepEqual([1, 2, 3].myReduce(combineArr, []), [1, 2, 3]);
    });

    test('reducer uses index argument when provided', () => {
        assert.equal([1, 2, 3].myReduce(multiplyByIndex, 0), 8);
        assert.equal([-1, -3, 4].myReduce(multiplyByIndex, 0), 5);
    });

    test('reducer uses array argument when provided', () => {
        assert.equal([1, 2, 3, 4].myReduce(sumOfSquares, 0), 30);
        assert.equal([-1, -3, 4].myReduce(sumOfSquares, 0), 26);
    });

    test('no initial value provided and array is empty', () => {
        assert.throws(() => {
            [].myReduce(add);
        }, /Initial value must be provided/);
    });

    test('no initial value provided and array is non-empty', () => {
        assert.equal([1, 2, 3].myReduce(add), 6);
        assert.equal([-1, -3, 4].myReduce(sumOfSquares, 0), 26);
    });

    test('sparse arrays', () => {
        // eslint-disable-next-line no-sparse-arrays
        assert.equal([1, 2, , 3].myReduce(add), 6);
        // eslint-disable-next-line no-sparse-arrays
        assert.equal([-1, -3, 4, , ,].myReduce(sumOfSquares, 0), 26);
    });
});


