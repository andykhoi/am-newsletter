/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

export const useDidUpdate = (func: any, deps: Array<any>) => {
    const didUpdate = useRef(false);

    useEffect(() => {
        if (didUpdate.current) func();
        else didUpdate.current = true;
    }, deps);
}