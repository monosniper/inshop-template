import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../styles/globals.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import store from "../store/store";
import {$routes} from "../http/routes";
import {observer} from "mobx-react-lite";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isShop, setIsShop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.requestShop()
    // shopCheck();

    // const hideContent = () => setIsShop(false);
    // router.events.on('routeChangeStart', hideContent);
    //
    // router.events.on('routeChangeComplete', shopCheck)
    //
    // return () => {
    //   router.events.off('routeChangeStart', hideContent);
    //   router.events.off('routeChangeComplete', shopCheck);
    // }
  }, []);

  useEffect(() => {
    console.log(store.shop_id)
    if (!store.shop_id) {
      router.push($routes.undefined)
    } else {
      setIsShop(true);
    }
    setLoading(false);
  }, [store.shop_id])

  function shopCheck(request=true) {
    if (!store.shop_id) {
      // request && store.requestShop().then(() => {
      //   shopCheck(false)
      // });

      setIsShop(false);

      // router.push({
      //   pathname: $routes.undefined,
      //   query: { returnUrl: router.asPath }
      // });
    } else {
      setIsShop(true);
    }

    setLoading(false);
  }

  return loading ? <h1>loading</h1> : <Component {...pageProps} />;
}

export default observer(MyApp)
