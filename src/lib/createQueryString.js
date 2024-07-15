import {useCallback} from 'react';
import {useSearchParams} from "next/navigation";

const createQueryString = (name, value) => {
    const searchParams = useSearchParams();

    const createQuery = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return createQuery;
};

export default createQueryString;
