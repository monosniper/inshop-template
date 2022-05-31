import 'bootstrap/dist/css/bootstrap-grid.min.css';
import '../styles/globals.scss'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import store from "../store/store";
import {$routes} from "../http/routes";
import {observer} from "mobx-react-lite";
import Loader from "../components/loader";
import shop from "../store/shop";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [data, setData] = useState({id: null});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    shop.requestData().then((rs) => {
      setData(rs)
      shop.requestProducts().then(() => setLoading(false))
    })
  }, []);

  useEffect(() => {
    if (!data.id) {
      router.push($routes.undefined)
    } else {
      router.push($routes.index)
    }
    setLoading(false);
  }, [data])

  return loading ? <Loader /> : <Component {...pageProps} />;
}

export default MyApp
