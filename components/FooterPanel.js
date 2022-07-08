import React, {useEffect, useState} from 'react';
import styles from '../styles/components/FooterPanel.module.scss'
import Link from "next/link";
import {$routes} from "../http/routes";
import {AiOutlineHome} from "react-icons/ai";
import {AiOutlineHeart} from "react-icons/ai";
import {RiShoppingCartLine} from "react-icons/ri";
import {AiOutlineSearch} from "react-icons/ai";
import {AiOutlineUser} from "react-icons/ai";
import {useRouter} from "next/router";
import Category from "./category";
import {ScrollingCarousel} from "@trendyol-js/react-carousel";
import {useModules} from "../hooks/useModules";
import {$modules} from "../utils/config";
import auth from "../store/auth";


function FooterPanelButton({to, handler, icon}) {
    const router = useRouter()
    const [isActive, setIsActive] = useState(router.pathname === to)

    useEffect(() => {
        setIsActive(router.pathname === to)
    }, [router.pathname])

    return to ? <Link
        href={to}
    >
        <div className={styles.button + ' ' + (isActive && styles.button_active)}>
            {icon}
        </div>
    </Link> : <div onClick={handler} className={styles.button + ' ' + (isActive && styles.button_active)}>
        {icon}
    </div>;
}

const FooterPanel = () => {
    const modules = useModules()

    const openSearch = () => {

    }

    return (
        <div className={styles.panel}>
            <ScrollingCarousel className={styles.slider}>
                <FooterPanelButton
                    to={$routes.index}
                    icon={<AiOutlineHome size={28} />}
                />
                <FooterPanelButton
                    handler={openSearch}
                    icon={<AiOutlineSearch size={28} />}
                />
                {auth.isAuthorized ? <FooterPanelButton
                    to={$routes.profile}
                    icon={<AiOutlineUser size={28} />}
                /> : <FooterPanelButton
                    handler={() => auth.openLogin()}
                    icon={<AiOutlineUser size={28} />}
                />}
                {modules.get($modules.basket) && auth.isAuthorized && <FooterPanelButton
                    to={$routes.basket}
                    icon={<RiShoppingCartLine size={28} />}
                />}
            </ScrollingCarousel>
        </div>

        // <div className={styles.panel}>
        //     <FooterPanelButton
        //         to={$routes.index}
        //         icon={<AiOutlineHome size={28} />}
        //     />
        //     <FooterPanelButton
        //         handler={openSearch}
        //         icon={<AiOutlineSearch size={28} />}
        //     />
        //     <FooterPanelButton
        //         to={$routes.profile}
        //         icon={<AiOutlineUser size={28} />}
        //     />
        //     <FooterPanelButton
        //         to={$routes.basket}
        //         icon={<RiShoppingCartLine size={28} />}
        //     />
        //     <FooterPanelButton
        //         to={$routes.wishlist}
        //         icon={<AiOutlineHeart size={28} />}
        //     />
        // </div>
    );
};

export default FooterPanel;