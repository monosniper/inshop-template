import React, {useEffect, useState} from 'react';

import ReactModal from "react-modal";
import {showError} from "../utils/showError";
import {$errors} from "../utils/errors";
import store from "../store/store";
import auth from "../store/auth";
import {observer} from "mobx-react-lite";
import User from "./User";

const AuthButtons = () => {
    return (
        <>
            {auth.isAuthorized ? (
                <User  />
            ) : <>
                <button onClick={() => auth.openRegister()} className={'button'}>Регистрация</button>
                <button onClick={() => auth.openLogin()} className={'button'}>Войти</button>
            </>}


        </>
    );
};

export default observer(AuthButtons);