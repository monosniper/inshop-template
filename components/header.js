import React, {useEffect} from 'react';
import styles from '../styles/components/Header.module.scss'
import {Container} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import BasketButton from "./basketButton";
import {useShop} from "../hooks/useShop";
import {useLayout} from "../hooks/useLayout";
import {useModules} from "../hooks/useModules";
import {observer} from "mobx-react-lite";
import {$layout, $modules} from "../utils/config";
import Auth from "./AuthButtons";
import AuthButtons from "./AuthButtons";
import {useIsMobile} from "../hooks/useIsMobile";
import auth from "../store/auth";

const Buttons = observer(({modules}) => {
    return <div className={styles.header__buttons}>
        {modules.get($modules.basket) ? auth.isAuthorized && <BasketButton /> : null}
        {modules.get($modules.auth) ? <AuthButtons /> : null}
    </div>;
})

function ShopDetails({layout, shop}) {
    return <div className={styles['header__shop-details']}>
        {layout.get($layout.header.title) ? <h4 className={styles.header__title}>{ shop.title }</h4> : null}
        {layout.get($layout.header.slogan) ? <p className={styles.header__subtitle}>{ shop.slogan }</p> : null}
    </div>;
}

const Header = () => {
    const shop = useShop()
    const layout = useLayout()
    const modules = useModules()
    const isMobile = useIsMobile()

    return layout.get($layout.header.slug) ? (
            <header className={styles.header}>
                <Container>
                    <div className={styles.header__container}>
                        <div className={styles.header__left}>
                            <Link href={'/'}>
                                <div className={styles.header__shop}>
                                    {layout.get($layout.header.logo) ?
                                        <div className={styles.header__logo}>
                                            <Link href={'/'}>
                                                <Image
                                                    src={'/assets/images/logo.png'}
                                                    width={70}
                                                    height={70}
                                                    alt={shop.title}
                                                />
                                            </Link>
                                        </div> : null}
                                    {!isMobile ? <ShopDetails layout={layout} shop={shop} /> : null}
                                </div>
                            </Link>
                        </div>
                        <div className={styles.header__right}>
                            {isMobile ? <ShopDetails layout={layout} shop={shop} /> : <Buttons modules={modules} />}
                        </div>
                    </div>
                </Container>
            </header>
        ) : null;
};

export default observer(Header);