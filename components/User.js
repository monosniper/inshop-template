import React from 'react';
import auth from "../store/auth";
import styles from "../styles/components/User.module.scss";
import {observer} from "mobx-react-lite";
import Image from "next/image";
import Dropdown from "./Dropdown";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import {toJS} from "mobx";

const User = (props) => {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear()
        router.push($routes.index)
    }

    return (
        <Dropdown
            options={[
                {
                    title: 'Выйти',
                    handle: handleLogout
                }
            ]}
            target={(
                <div className={styles.user}>
                    <div className={styles.user__avatar}>
                        <Image
                            src={'/assets/images/users/1.png'}
                            alt={auth.getName()}
                            width={50}
                            height={50}
                        />
                    </div>
                    <div className={styles.user__name}>{auth.getName()}</div>
                </div>
            )}
        />
    );
};

export default observer(User);