import { useEffect, useRef, useState } from "react";

function useDebounce(fn: (args: string) => void, delay = 500) {
    const [state, setState] = useState("");
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            fn(state);
        }, delay);
        return () => {
            if (timerRef.current)
                clearTimeout(timerRef.current)
        }
    }, [state, delay, fn]);
    return {
        state,
        setState,
    };
}

export default useDebounce;
