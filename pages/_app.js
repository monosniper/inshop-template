import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../styles/globals.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {$routes} from "../http/routes";
import Loader from "../components/loader";
import shop from "../store/shop";
import auth from "../store/auth";
import basket from "../store/basket";


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [data, setData] = useState({id: null});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shop.requestData().then((rs) => {
      setData(rs)

      basket.loadBasket();

      shop.requestProducts().then(() => setLoading(false))
    })

    auth.refresh()
  }, []);

  useEffect(() => {
    if (!data || !data.id) {
      router.push($routes.undefined)
    } else {
      router.push($routes.index)
    }
    setLoading(false);
  }, [data])

  return loading ? <Loader /> : <Component {...pageProps} />;
}

export default MyApp
