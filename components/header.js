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
import shop from "../store/shop";
import SocialNetworks from "./SocialNetworks";
import Dropdown from "./Dropdown";
import {BsChevronDown} from "react-icons/bs";
import {useRouter} from "next/router";
import {$routes} from "../http/routes";
import {useTranslation} from "react-i18next";

const Buttons = observer(({layout, modules}) => {
    return <div className={styles.header__buttons}>
        {layout.get($layout.social.slug) && layout.get($layout.social.in_header)
            ? <SocialNetworks />
            : null}
        {modules.get($modules.basket) ? auth.isAuthorized && <BasketButton /> : null}
        {modules.get($modules.auth) ? <AuthButtons /> : null}
    </div>;
})

function ShopDetails({layout, modules, shop, custom_pages}) {
    const router = useRouter()
    const { t, i18n } = useTranslation();

    return <div style={{display: 'flex',gap: '1rem'}}>
        <div className={styles['header__shop-details']}>
            {layout.get($layout.header.title) ? <h4 className={styles.header__title}>{ shop.title }</h4> : null}
            {layout.get($layout.header.slogan) ? <p className={styles.header__subtitle}>{ shop.slogan }</p> : null}
        </div>
        {modules.get($modules.reviews) ? <Link href={$routes.reviews}>
            <div className={styles.header__link + ' contrast_hover reviews'}>
                {t('reviews')}
            </div>
        </Link> : null}
        {modules.get($modules.custom_pages) && custom_pages.length ? <Dropdown
            className={'more'}
            style={{display: 'flex', alignItems: 'center'}}
            options={custom_pages.map(page => {
                return {
                    title: page.title,
                    link: $routes.custom_page(page.slug),
                }
            })}
            target={(
                <div className={styles.header__more + ' contrast_hover'}>{t('more')} <BsChevronDown size={'10px'} /></div>
            )}
        /> : null}
    </div>;
}

const Header = () => {
    const shop_data = useShop()
    const layout = useLayout()
    const modules = useModules()
    const isMobile = useIsMobile()

    return layout.get($layout.header.slug) ? (
            <header className={styles.header + ' header'}>
                <Container>
                    <div className={styles.header__container}>
                        <div className={styles.header__left}>
                            <Link href={'/'}>
                                <div className={styles.header__shop}>
                                    {layout.get($layout.header.logo) ?
                                        <div className={styles.header__logo}>
                                            <Link href={'/'}>
                                                {/*<Image*/}
                                                {/*    src={shop.logo_url}*/}
                                                {/*    width={70}*/}
                                                {/*    height={70}*/}
                                                {/*    alt={shop_data.title}*/}
                                                {/*/>*/}
                                                <img src={shop.logo_url} alt={shop_data.title} width={70} height={70}/>
                                            </Link>
                                        </div> : null}
                                    {!isMobile ? <ShopDetails modules={modules} layout={layout} shop={shop_data} custom_pages={shop.custom_pages} /> : null}
                                </div>
                            </Link>
                        </div>
                        <div className={styles.header__right}>
                            {isMobile ? <ShopDetails modules={modules} layout={layout} shop={shop_data} custom_pages={shop.custom_pages} /> : <Buttons layout={layout} modules={modules} />}
                        </div>
                    </div>
                </Container>
            </header>
        ) : null;
};

export default observer(Header);