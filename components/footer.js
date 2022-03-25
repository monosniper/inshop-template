import React from 'react';
import styles from '../styles/components/Footer.module.scss'
import {Container} from "react-bootstrap";
import Watermark from "./watermark";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Container className={styles.footer__container}>
                <span>2022 Ваш магазин.</span>
                <Watermark />
            </Container>
        </div>
    );
};

export default Footer;