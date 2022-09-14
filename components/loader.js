import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Loader.module.scss'
import {useModules} from "../hooks/useModules";
import {$modules} from "../utils/config";
import {useShop} from "../hooks/useShop";
import {observer} from "mobx-react-lite";

function Default() {
    return <>
        <span className={styles.span}>i</span>
        <span className={styles.span} style={{animationDelay: '0.1s'}}>n</span>
        <span className={styles.span} style={{animationDelay: '0.3s'}}>s</span>
        <span className={styles.span} style={{animationDelay: '0.4s'}}>h</span>
        <span className={styles.span} style={{animationDelay: '0.5s'}}>o</span>
        <span className={styles.span} style={{animationDelay: '0.6s'}}>p</span>
    </>;
}

function Custom({ title }) {
    return <>
        {title.map((letter, i) => (
            <span key={'letter-'+letter+'-'+i} style={i!==0?{animationDelay: i*0.1+'s'}:{}} className={styles.span}>{letter}</span>
        ))}
    </>;
}

const Loader = () => {
    const modules = useModules()
    const shop = useShop()
    const [title, setTitle] = useState([])

    useEffect(() => {
        if(shop.title) setTitle(shop.title.split(''))
    }, [shop])

    return (
        <div className={styles.div}>
            {modules.loaded() ? modules.get($modules.custom.loading) ? <Custom title={title} /> : <Default /> : <Custom title={['.','.','.']} />}
        </div>
    );
};

export default observer(Loader);