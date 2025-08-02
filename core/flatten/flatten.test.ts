import assert from "node:assert";
import test, { describe, } from "node:test";
import { flatten } from './flatten';

describe('flatten array', () => {
    test('empty array', () => {
        assert.deepEqual(flatten([]), []);
        assert.deepEqual(flatten([[], [[]], [[], [[[]]]]]), []);
    });

    test('single-element array', () => {
        assert.deepEqual(flatten([1]), [1]);
        assert.deepEqual(flatten(['foo']), ["foo"]);
        assert.deepEqual(flatten([undefined]), [undefined]);
    });

    test('array with only one level', () => {
        assert.deepEqual(flatten([1, 2, 3]), [1, 2, 3]);
        assert.deepEqual(flatten(['foo', 'bar']), ['foo', 'bar']);
        assert.deepEqual(flatten([null, true, undefined]), [null, true, undefined]);
    });

    test('array with multiple levels of nesting', () => {
        assert.deepEqual(flatten([0, 1, 2, [3, 4]]), [0, 1, 2, 3, 4]);
        assert.deepEqual(flatten([1, [2, [3]]]), [1, 2, 3]);
        assert.deepEqual(
            flatten([
                [1, 2],
                [3, 4],
            ]), [1, 2, 3, 4]
        );
        assert.deepEqual(flatten(['foo', ['bar']]), ['foo', 'bar']);
        assert.deepEqual(flatten([[null, [true]], undefined]), [
            null,
            true,
            undefined,
        ]);
    });

    test('list-style array', () => {
        assert.deepEqual(flatten([1, [2, [3, [4, [5]]]]]), [1, 2, 3, 4, 5]);
        assert.deepEqual(flatten([[[[[1], 2], 3], 4], 5]), [1, 2, 3, 4, 5]);
    });

    test('deeply-nested single-element array', () => {
        assert.deepEqual(flatten([[[[1]]]]), [1]);
    });
});


