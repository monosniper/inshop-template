import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import shop from "../../store/shop";
import Header from "../../components/header";
import {Container} from "react-bootstrap";
import Footer from "../../components/footer";
import PageLoader from "../../components/PageLoader";
import {toJS} from "mobx";
import Head from "next/head";
import {useTranslation} from "react-i18next";

const CustomPage = () => {
    const router = useRouter()
    const {slug} = router.query
    const [pageData, setPageData] = useState(null)
    const { t, i18n } = useTranslation();

    useEffect(() => {
        console.log(slug, toJS(shop.getCustomPage(slug)))
        if(slug) setPageData(shop.getCustomPage(slug))
    }, [slug])

    function createMarkup() {
        return {__html: pageData.content};
    }

    return <>
        <Head>
            {pageData ? <>
                <title>{pageData.title}</title>
                <meta property="description" content={pageData.description} />
            </> : <>
                <title>{t('loading')}...</title>
            </>}
        </Head>

        <div className={'wrapper'}>
            <Header/>

            <Container>
                <div className={'white-block custom-page-block'}>
                    {pageData ? <>
                        <h1 style={{marginBottom: '.5rem'}}>{pageData.title}</h1>
                        <div dangerouslySetInnerHTML={createMarkup()}></div>
                    </> : <PageLoader />}
                </div>
            </Container>
        </div>

        <Footer/>
    </>;
};

export default CustomPage;