import React from 'react';
import styles from '../styles/components/Footer.module.scss'
import {Container} from "react-bootstrap";
import Watermark from "./watermark";
import {useModules} from "../hooks/useModules";
import {$modules} from "../utils/config";

const Footer = () => {
    const modules = useModules()

    return (
        <div className={styles.footer}>
            <Container className={styles.footer__container}>
                <span>2022 Ваш магазин.</span>
                {modules.get($modules.watermark) ? null :  <Watermark />}
            </Container>
        </div>
    );
};

export default Footer;