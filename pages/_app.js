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

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const modules = useModules()

  useEffect(() => {
      shop.requestData().then(rs => {
        auth.refresh()

        if(rs && rs.id) {
          setTimeout(() => {
            setLoading(false)
          }, 3000)

          i18n.changeLanguage(shop.options.language)
        }
        else router.push($routes.undefined)
      })
  }, [])

  useEffect(() => {
      auth.isAuthorized && auth.data.basket_id !== '' && modules.get($modules.basket) && basket.loadBasket();
  }, [modules, auth])

  return loading ? <Loader /> : <>
    <div className="layout">
      <ConfigStyles />
      {modules.get($modules.adult_content) ? <AdultModal /> : null}
      {modules.get($modules.auth) ? <AuthModals /> : null}
      <Component {...pageProps} />
    </div>
  </>;
}

export default appWithTranslation(observer(MyApp))
