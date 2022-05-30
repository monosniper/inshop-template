import React from 'react';
import styles from '../styles/components/Header.module.scss'
import {Container} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import BasketButton from "./basketButton";
import {useShop} from "../hooks/useShop";
import {useLayout} from "../hooks/useLayout";
import {useModules} from "../hooks/useModules";

const Header = () => {
    const shop = useShop()
    const layout = useLayout()
    const modules = useModules()

    console.log(shop)

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.header__container}>
                    <div className={styles.header__left}>
                        <Link href={'/'}>
                            <div className={styles.header__shop}>
                                {layout.get('logo') ?
                                    <div className={styles.header__logo}>
                                        <Link href={'/'}>
                                            <Image
                                                src={'/assets/images/logo.png'}
                                                width={70}
                                                height={70}
                                                alt={'Shop name'}
                                            />
                                        </Link>
                                    </div> : null}
                                <div className={styles['header__shop-details']}>
                                    {layout.get('title') ? <h4 className={styles.header__title}>{ shop.title }</h4> : null}
                                    {layout.get('subtitle') ? <p className={styles.header__subtitle}>{ shop.slogan }</p> : null}
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.header__right}>
                        <div className={styles.header__buttons}>
                            {modules.get('basket') ? <BasketButton /> : null}
                            <button className={'button'}>Регистрация</button>
                            <button className={'button'}>Войти</button>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;