import Link from "next/link";
import {$routes} from "../http/routes";
import React from "react";

const CheckoutBtn = ({ size='sm', children, product_id }) => {
    return <Link href={$routes.checkout + '?product_id='+product_id}>
        <button className={'button button_' + size}>{children}</button>
    </Link>;
}

export default CheckoutBtn