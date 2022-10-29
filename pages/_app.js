import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'react-awesome-slider/dist/styles.css';
import '../styles/globals.scss'
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {$routes} from "../http/routes";
import Loader from "../components/loader";
import shop from "../store/shop";
import auth from "../store/auth";
import basket from "../store/basket";
import i18n from 'i18next';
import '../utils/i18n';
import {appWithTranslation} from "next-i18next";
import AuthModals from "../components/AuthModals";
import {observer} from "mobx-react-lite";
import {$modules} from "../utils/config";
import {useModules} from "../hooks/useModules";
import ConfigStyles from "../components/ConfigStyles";
import AdultModal from "../components/modals/AdultModal";
import Head from "next/head";
import {useShop} from "../hooks/useShop";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const shopData = useShop();
  const [loading, setLoading] = useState(true);
  const modules = useModules()

  useEffect(() => {
      shop.requestData().then(async rs => {
        auth.refresh()

        if(rs && rs.id) {
          if(modules.loaded()) {
            if(modules.get($modules.custom.loading)) {
              setTimeout(() => {
                setLoading(false)
              }, 2000)
            } else {
              setLoading(false)
            }
          } else {
            setTimeout(() => {
              setLoading(false)
            }, 2000)
          }

          await i18n.changeLanguage(shop.options.language)
        }
        else await router.push($routes.undefined)
      })
  }, [])

  useEffect(() => {
      auth.isAuthorized && auth.data.basket_id !== '' && modules.get($modules.basket) && basket.loadBasket();
  }, [modules, auth])

  return loading ? <Loader /> : <>
    <Head>
      <title>{shopData.title}</title>
    </Head>
    <div className="layout">
      <ConfigStyles />
      {modules.get($modules.adult_content) ? <AdultModal /> : null}
      {modules.get($modules.auth) ? <AuthModals /> : null}
      <Component {...pageProps} />
    </div>
  </>;
}

export default appWithTranslation(observer(MyApp))
