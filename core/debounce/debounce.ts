/*
Debouncing is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called.
You almost certainly have encountered debouncing in your daily lives before (e.g. when entering an elevator). Only after X duration of not pressing the "Door open" button (the debounced function not being called) will the elevator door actually close (the callback function is executed).
Implement a debounce function which accepts a callback function and a wait duration. Calling debounce() returns a function which has debounced invocations of the callback function following the behavior described above.
*/

/*
*********Follow up***********
Debounce with a cancel() method to cancel delayed invocations and
a flush() method to immediately invoke them.
*/
type DebounceReturnType = Function & {
    cancel: VoidFunction,
    flush: Function
}
export function debounce(fn: Function, delay: number = 500): DebounceReturnType {
    let timer: NodeJS.Timeout | undefined;
    function handler(this: any, ...args: unknown[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
    handler.cancel = function () {
        if (timer) clearTimeout(timer)
    }
    handler.flush = function (this: any, ...args: unknown[]) {
        if (timer) clearTimeout(timer)
        fn.apply(this, args)
    }
    return handler
}