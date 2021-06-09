import {useState, useCallback} from 'react';

export const useSort = () => {
    const [listConveniences, setListConveniences] = useState([]);

    const changeListConveniences = useCallback((list) => {
        setListConveniences(list);
    }, []);

    return { listConveniences, changeListConveniences };
}
