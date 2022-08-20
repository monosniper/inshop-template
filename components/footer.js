import React from 'react';
import styles from '../styles/components/Footer.module.scss'
import {Container} from "react-bootstrap";
import Watermark from "./watermark";
import {useModules} from "../hooks/useModules";
import {$layout, $modules} from "../utils/config";
import {useShop} from "../hooks/useShop";
import {useIsMobile} from "../hooks/useIsMobile";
import FooterPanel from "./FooterPanel";
import {observer} from "mobx-react-lite";
import SocialNetworks from "./SocialNetworks";
import {useLayout} from "../hooks/useLayout";

const Footer = () => {
    const modules = useModules()
    const shop = useShop()
    const isMobile = useIsMobile()
    const layout = useLayout()

    return (
        <>
            {isMobile && <FooterPanel />}

            <div className={styles.footer + ' footer'}>
                <Container className={styles.footer__container}>
                    <span>2022 { shop.title }.</span>
                    {layout.get($layout.social.slug) && layout.get($layout.social.in_footer)
                        ? <SocialNetworks />
                        : null}
                    {modules.get($modules.watermark) ? null : <Watermark />}
                </Container>
            </div>

            {isMobile && <div style={{height: 30}}></div>}
        </>
    );
};

export default observer(Footer);