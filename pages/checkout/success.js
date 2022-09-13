import React from 'react';
import Header from "../../components/header";
import {Container} from "react-bootstrap";
import {$modules} from "../../utils/config";
import Banner from "../../components/Banner";
import Categories from "../../components/categories";
import Filters from "../../components/filters";
import Products from "../../components/products";
import Footer from "../../components/footer";
import {useModules} from "../../hooks/useModules";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {$routes} from "../../http/routes";

const Success = () => {
    const modules = useModules()
    const { t, i18n } = useTranslation();

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    {modules.get($modules.banner) ? <Banner /> : null}

                    <div className="white-block success-pay">
                        <BsFillCheckCircleFill color={'green'} />
                        <h1>{t('success-pay')}</h1>
                        <Link href={$routes.index}>
                            <button className={'contrast_bg success-pay__btn'}>{t('back to main')}</button>
                        </Link>
                    </div>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default Success;