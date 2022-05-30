import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../styles/globals.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import store from "../store/store";
import {$routes} from "../http/routes";
import {observer} from "mobx-react-lite";
import Loader from "../components/loader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.requestShop()
  }, []);

  useEffect(() => {
    if (!store.shop_id) {
      router.push($routes.undefined)
    } else {
      router.push($routes.index)
    }
    setLoading(false);
  }, [store.shop_id])

  return loading ? <Loader /> : <Component {...pageProps} />;
}

export default observer(MyApp)
