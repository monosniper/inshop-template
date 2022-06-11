import React, {useEffect, useState} from 'react';

import ReactModal from "react-modal";
import {showError} from "../utils/showError";
import {$errors} from "../utils/errors";
import store from "../store/store";
import auth from "../store/auth";
import {observer} from "mobx-react-lite";
import User from "./User";

const AuthButtons = () => {
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerFio, setRegisterFio] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerPasswordAgain, setRegisterPasswordAgain] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    const handleChangeRegisterEmail = (e) => setRegisterEmail(e.target.value)
    const handleChangeRegisterFio = (e) => setRegisterFio(e.target.value)
    const handleChangeRegisterPassword = (e) => setRegisterPassword(e.target.value)
    const handleChangeRegisterPasswordAgain = (e) => setRegisterPasswordAgain(e.target.value)

    const handleChangeLoginEmail = (e) => setLoginEmail(e.target.value)
    const handleChangeLoginPassword = (e) => setLoginPassword(e.target.value)

    const handleOpenRegisterModal = () => setShowRegisterModal(true)
    const handleCloseRegisterModal = () => setShowRegisterModal(false)

    const handleOpenLoginModal = () => setShowLoginModal(true)
    const handleCloseLoginModal = () => setShowLoginModal(false)

    const handleRegister = () => {
        if(registerEmail === '') showError($errors.validation.required.email)
        else if(registerPassword === '') showError($errors.validation.required.password)
        else if(registerPasswordAgain === '') showError($errors.validation.required.password_again)
        else if(registerPasswordAgain !== registerPassword) showError($errors.validation.required.password_again)
        else {
            auth.register({
                email: registerEmail,
                fio: registerFio,
                password: registerPassword,
                password_confirmation: registerPasswordAgain,
            }).then(() => {
                if(auth.isAuthorized) handleCloseRegisterModal()
            })
        }
    }
    const handleLogin = () => {
        if(loginEmail === '') showError($errors.validation.required.email)
        else if(loginPassword === '') showError($errors.validation.required.password)
        else {
            auth.login({
                email: loginEmail,
                password: loginPassword,
            }).then(() => {
                if(auth.isAuthorized) handleCloseLoginModal()
            })
        }
    }

    return (
        <>
            {auth.isAuthorized ? (
                <User  />
            ) : <>
                <button onClick={handleOpenRegisterModal} className={'button'}>Регистрация</button>
                <button onClick={handleOpenLoginModal} className={'button'}>Войти</button>
            </>}

            <ReactModal
                ariaHideApp={false}
                isOpen={showRegisterModal}
                contentLabel="Register modal"
                className={'modal'}
                overlayClassName={'modal__overlay'}
            >
                <div className="modal__title">Регистрация</div>

                <div className="modal__row">
                    <span className={'modal__label'}>E-mail</span>
                    <input type="email" value={registerEmail} placeholder={'E-mail'} onChange={handleChangeRegisterEmail} className="modal__input"/>
                </div>

                <div className="modal__row">
                    <span className={'modal__label'}>ФИО</span>
                    <input type="text" value={registerFio} placeholder={'Ф.И.О.'} onChange={handleChangeRegisterFio} className="modal__input"/>
                </div>

                <div className="modal__row">
                    <span className={'modal__label'}>Пароль</span>
                    <input type="password" value={registerPassword} onChange={handleChangeRegisterPassword} className="modal__input"/>
                </div>

                <div className="modal__row">
                    <span className={'modal__label'}>Пароль еще раз</span>
                    <input type="password" value={registerPasswordAgain} onChange={handleChangeRegisterPasswordAgain} className="modal__input"/>
                </div>

                <div className="modal__footer">
                    <button onClick={handleCloseRegisterModal} className={'modal__button'}>Отмена</button>
                    <button onClick={handleRegister} className={'modal__button'}>Регистрация</button>
                </div>
            </ReactModal>

            <ReactModal
                ariaHideApp={false}
                isOpen={showLoginModal}
                contentLabel="Login modal"
                className={'modal'}
                overlayClassName={'modal__overlay'}
            >
                <div className="modal__title">Вход</div>

                <div className="modal__row">
                    <span className={'modal__label'}>E-mail</span>
                    <input type="email" value={loginEmail} placeholder={'E-mail'} onChange={handleChangeLoginEmail} className="modal__input"/>
                </div>

                <div className="modal__row">
                    <span className={'modal__label'}>Пароль</span>
                    <input type="password" value={loginPassword} onChange={handleChangeLoginPassword} className="modal__input"/>
                </div>

                <div className="modal__footer">
                    <button onClick={handleCloseLoginModal} className={'modal__button'}>Отмена</button>
                    <button onClick={handleLogin} className={'modal__button'}>Войти</button>
                </div>
            </ReactModal>
        </>
    );
};

export default observer(AuthButtons);