import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {$routes} from "../http/routes";
import shop from "../store/shop";
import {useRouter} from "next/router";

const Undefined = () => {
    const router = useRouter()

    useEffect(() => {
        if(shop.id) router.push($routes.index)
    }, [])

    return (
        <div>
            undefined
        </div>
    );
};

export default observer(Undefined);