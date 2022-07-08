import 'bootstrap/dist/css/bootstrap-grid.min.css';
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
import ReactModal from "react-modal";
import AuthModals from "../components/AuthModals";
import {observer} from "mobx-react-lite";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      shop.requestData().then(rs => {
        auth.refresh()

        if(rs && rs.id) {
          setLoading(false)

          i18n.changeLanguage(shop.options.language)

          auth.isAuthorized && auth.data.basket_id !== '' && basket.loadBasket();

          router.push($routes.index)
        }
        else router.push($routes.undefined)
      })
  }, [])

  return loading ? <Loader /> : <>
    <AuthModals />
    <Component {...pageProps} />
  </>;
}

export default appWithTranslation(observer(MyApp))
