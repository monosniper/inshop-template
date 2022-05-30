import React from 'react';
import styles from '../styles/components/Loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.div}>

            <span className={styles.span}>i</span>
            <span className={styles.span} style={{animationDelay: '0.1s'}}>n</span>
            <span className={styles.span} style={{animationDelay: '0.3s'}}>s</span>
            <span className={styles.span} style={{animationDelay: '0.4s'}}>h</span>
            <span className={styles.span} style={{animationDelay: '0.5s'}}>o</span>
            <span className={styles.span} style={{animationDelay: '0.6s'}}>p</span>

        </div>
    );
};

export default Loader;