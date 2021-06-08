import {useState, useCallback} from 'react';

export const useRedaction = () => {
    const [isRedaction, setIsRedaction] = useState(false);

    const changeTrueRedaction = useCallback(() => {
        setIsRedaction(true);
    }, []);

    const changeFalseRedaction = useCallback(() => {
        setIsRedaction(false);
    }, []);

    return { isRedaction, changeTrueRedaction, changeFalseRedaction };
}
