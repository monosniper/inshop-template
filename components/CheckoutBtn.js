import Link from "next/link";
import {$routes} from "../http/routes";
import React from "react";

const CheckoutBtn = ({ size='sm', children }) => {
    return <Link href={$routes.checkout}>
        <button className={'button button_' + size}>{children}</button>
    </Link>;
}

export default CheckoutBtn