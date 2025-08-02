import assert from "node:assert";
import test, { describe } from "node:test";
import { classNames } from './classNames';

describe('classNames', () => {
    test('empty values', () => {
        assert.equal(classNames([]), '');
    });

    test('single value', () => {
        assert.equal(classNames('foo'), "foo");
    });

    test('two values', () => {
        assert.equal(classNames('foo', 'bar'), "foo bar");
    });

    test('array values', () => {
        assert.equal(classNames(['foo', 'bar', 'baz']), 'foo bar baz');
    });

    test('object values', () => {
        assert.equal(classNames({ 'foo-bar': true }), 'foo-bar');
        assert.equal(classNames({ 'foo-bar': false }), "");
        assert.equal(classNames({ foo: true }, { bar: true }), 'foo bar');
        assert.equal(classNames({ foo: true, bar: false, qux: true }), 'foo qux');
    });

    test('mixed values', () => {
        assert.equal(
            classNames(
                'foo',
                {
                    bar: true,
                    duck: false,
                },
                'baz',
                { quux: true },
            ), 'foo bar baz quux'
        );
        assert.equal(
            classNames('boo', true && 'loo', false && 'booz', {
                foo: true,
                bar: false,
                baz: 1,
            }), 'boo loo foo baz'
        );
    });

    test('ignores falsey values', () => {
        assert.equal(
            classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
            'bar 1');
    });

    test('recursively flattens arrays', () => {
        assert.equal(classNames('a', ['b', { c: true, d: false }]), 'a b c');
        assert.equal(classNames('a', ['b', ['c', ['d']]]), 'a b c d');
    });
});