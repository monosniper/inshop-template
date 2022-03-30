import React from 'react';
import styles from '../styles/components/Header.module.scss'
import {Container} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import BasketButton from "./basketButton";

const Header = () => {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.header__container}>
                    <div className={styles.header__left}>
                        <Link href={'/'}>
                            <div className={styles.header__shop}>
                                <div className={styles.header__logo}>
                                    <Link href={'/'}>
                                        <Image
                                            src={'/assets/images/logo.png'}
                                            width={70}
                                            height={70}
                                            alt={'Shop name'}
                                        />
                                    </Link>
                                </div>
                                <div className={styles['header__shop-details']}>
                                    <h4 className={styles.header__title}>Ваш магазин</h4>
                                    <p className={styles.header__subtitle}>У нас лучшие цены!</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.header__right}>
                        <div className={styles.header__buttons}>
                            <BasketButton />
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