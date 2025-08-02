import assert from "node:assert";
import test, { describe } from "node:test";
import { throttle } from './throttle';

describe('throttle', () => {
    test('can be initialized', () => {
        const increment = throttle(() => { }, 50);
        assert.strictEqual(typeof increment, "function");
    });

    test('invokes callback immediately', () => {
        let i = 0;
        const increment = throttle(() => {
            i++;
        }, 50);

        assert.strictEqual(i, 0);
        increment();
        assert.strictEqual(i, 1);
    });

    test('throttles immediate invocations', () => {
        let i = 0;
        const increment = throttle(() => {
            i++;
        }, 50);

        assert.strictEqual(i, 0);
        increment();
        assert.strictEqual(i, 1);
        increment();
        assert.strictEqual(i, 1);
    });

    test('throttles delayed invocations', (_, done) => {
        let i = 0;
        const increment = throttle(() => {
            i++;
        }, 100);

        assert.strictEqual(i, 0);
        increment();
        assert.strictEqual(i, 1);

        setTimeout(() => {
            increment();
            assert.strictEqual(i, 1);
        }, 25);

        setTimeout(() => {
            increment();
            assert.strictEqual(i, 1);
            done();
        }, 50);
    });

    test('uses arguments', () => {
        let i = 21;
        const increment = throttle((a, b) => {
            i += a * b;
        }, 50);

        assert.strictEqual(i, 21);
        increment(3, 7);
        assert.strictEqual(i, 42);
    });

    test('can be called again after first throttling window', (_, done) => {
        let i = 0;
        const increment = throttle(() => {
            i++;
        }, 100);

        assert.strictEqual(i, 0);
        increment();
        assert.strictEqual(i, 1);

        // Should not fire yet.
        setTimeout(() => {
            assert.strictEqual(i, 1);
            increment();
            assert.strictEqual(i, 1);
        }, 50);

        setTimeout(() => {
            assert.strictEqual(i, 1);
            increment();
            assert.strictEqual(i, 2);
        }, 150);

        setTimeout(() => {
            assert.strictEqual(i, 2);
            increment();
            assert.strictEqual(i, 2);
            done();
        }, 200);
    });

    test('callbacks can access `this`', (_, done) => {
        const increment = throttle(function (delta) {
            this.val += delta;
        }, 50);

        const obj = {
            val: 2,
            increment,
        };

        assert.strictEqual(obj.val, 2);
        obj.increment(3);
        assert.strictEqual(obj.val, 5);

        setTimeout(() => {
            obj.increment(10);
            assert.strictEqual(obj.val, 15);
            done();
        }, 100);
    });
});