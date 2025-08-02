import assert from "node:assert";
import test, { describe, } from "node:test";
import { debounce } from "./debounce";



describe('debounce', () => {
    test('can be initialized', () => {
        const increment = debounce(() => { }, 50);
        assert.ok(increment)
    });

    test('executes after duration', (_, done) => {
        let i = 0;
        const increment = debounce(() => {
            i++;
        }, 10);

        assert.equal(i, 0);
        increment();
        assert.equal(i, 0);

        setTimeout(() => {
            assert.equal(i, 1);
            done();
        }, 20);
    });

    describe('uses arguments', () => {
        test('called once', (_, done) => {
            let i = 21;
            const increment = debounce((a: number, b: number) => {
                i += a * b;
            }, 10);

            assert.equal(i, 21);
            increment(3, 7);
            assert.equal(i, 21);

            setTimeout(() => {
                assert.equal(i, 42);
                done();
            }, 20);
        });

        test('uses arguments of latest invocation', (_, done) => {
            let i = 21;
            const increment = debounce((a: number, b: number) => {
                i += a * b;
            }, 10);

            assert.equal(i, 21);
            increment(3, 7);
            increment(4, 5);
            assert.equal(i, 21);

            setTimeout(() => {
                assert.equal(i, 41);
                done();
            }, 20);
        });
    });

    test('execute once even after calling it multiple times', (_, done) => {
        let i = 0;
        const increment = debounce(() => {
            i++;
        }, 20);

        assert.equal(i, 0);
        increment();
        increment();
        increment();
        increment();
        assert.equal(i, 0);

        // Should not fire yet.
        setTimeout(() => {
            assert.equal(i, 0);
        }, 10);

        setTimeout(() => {
            assert.equal(i, 1);
            done();
        }, 30);
    });

    test('duration extended if called again during window', (_, done) => {
        let i = 0;
        const increment = debounce(() => {
            i++;
        }, 100);

        assert.equal(i, 0);
        increment();
        increment();
        assert.equal(i, 0);

        // Should not fire yet.
        setTimeout(() => {
            assert.equal(i, 0);
            increment();
            assert.equal(i, 0);
        }, 50);

        setTimeout(() => {
            // Still 0 because we fired again at t=50, increment will only happen at t=150
            assert.equal(i, 0);
        }, 125);

        setTimeout(() => {
            assert.equal(i, 1);
            done();
            // Add a longer delay because the browser timer is unreliable.
        }, 1500);
    });

    test('callbacks can access `this`', (_, done) => {
        const increment = debounce(function (this: any, delta: number) {
            this.val += delta;
        }, 10);

        const obj = {
            val: 2,
            increment,
        };

        assert.equal(obj.val, 2);
        obj.increment(3);
        assert.equal(obj.val, 2);

        setTimeout(() => {
            assert.equal(obj.val, 5);
            done();
        }, 20);
    });
});
