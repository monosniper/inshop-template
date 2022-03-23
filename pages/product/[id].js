import React, {useEffect} from 'react';
import {useRouter} from "next/router";

const Product = () => {
    const router = useRouter()

    useEffect(() => {
        const {id} = router.query
    }, [])

    return (
        <div>
            Product
        </div>
    );
};

export default Id;