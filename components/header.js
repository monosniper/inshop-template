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
        {modules.get($modules.basket) && auth.isAuthorized && <BasketButton />}
        {modules.get($modules.auth) && <AuthButtons />}
    </div>;
})

function ShopDetails({layout, shop}) {
    return <div className={styles['header__shop-details']}>
        {layout.get($layout.title) && <h4 className={styles.header__title}>{ shop.title }</h4>}
        {layout.get($layout.subtitle) && <p className={styles.header__subtitle}>{ shop.slogan }</p>}
    </div>;
}

const Header = () => {
    const shop = useShop()
    const layout = useLayout()
    const modules = useModules()
    const isMobile = useIsMobile()

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.header__container}>
                    <div className={styles.header__left}>
                        <Link href={'/'}>
                            <div className={styles.header__shop}>
                                {layout.get($layout.logo) ?
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
                                {!isMobile && <ShopDetails layout={layout} shop={shop} />}
                            </div>
                        </Link>
                    </div>
                    <div className={styles.header__right}>
                        {isMobile ? <ShopDetails layout={layout} shop={shop} /> : <Buttons modules={modules} />}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default observer(Header);