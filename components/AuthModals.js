import React, {useState} from 'react';
import {showError} from "../utils/showError";
import {$errors} from "../utils/errors";
import auth from "../store/auth";
import ReactModal from "react-modal";
import {observer} from "mobx-react-lite";

const AuthModals = () => {
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerFio, setRegisterFio] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerPasswordAgain, setRegisterPasswordAgain] = useState('')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const handleChangeRegisterEmail = (e) => setRegisterEmail(e.target.value)
    const handleChangeRegisterFio = (e) => setRegisterFio(e.target.value)
    const handleChangeRegisterPassword = (e) => setRegisterPassword(e.target.value)
    const handleChangeRegisterPasswordAgain = (e) => setRegisterPasswordAgain(e.target.value)

    const handleChangeLoginEmail = (e) => setLoginEmail(e.target.value)
    const handleChangeLoginPassword = (e) => setLoginPassword(e.target.value)

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
                if(auth.isAuthorized) auth.closeRegister()
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
                if(auth.isAuthorized) auth.closeLogin()
            })
        }
    }

    return <>
        <ReactModal
            ariaHideApp={false}
            isOpen={auth.isRegisterOpen}
            contentLabel="Register modal"
            className={'modal'}
            overlayClassName={'modal__overlay'}
        >
            <div className="modal__title">
                <span>??????????????????????</span>
                <span className={'link'} onClick={() => auth.openLogin()}>????????</span>
            </div>

            <div className="modal__row">
                <span className={'modal__label'}>E-mail</span>
                <input type="email" value={registerEmail} placeholder={'E-mail'} onChange={handleChangeRegisterEmail} className="modal__input"/>
            </div>

            <div className="modal__row">
                <span className={'modal__label'}>??????</span>
                <input type="text" value={registerFio} placeholder={'??.??.??.'} onChange={handleChangeRegisterFio} className="modal__input"/>
            </div>

            <div className="modal__row">
                <span className={'modal__label'}>????????????</span>
                <input type="password" value={registerPassword} onChange={handleChangeRegisterPassword} className="modal__input"/>
            </div>

            <div className="modal__row">
                <span className={'modal__label'}>???????????? ?????? ??????</span>
                <input type="password" value={registerPasswordAgain} onChange={handleChangeRegisterPasswordAgain} className="modal__input"/>
            </div>

            <div className="modal__footer">
                <button onClick={() => auth.closeRegister()} className={'modal__button'}>????????????</button>
                <button onClick={handleRegister} className={'modal__button'}>??????????????????????</button>
            </div>
        </ReactModal>

        <ReactModal
            ariaHideApp={false}
            isOpen={auth.isLoginOpen}
            contentLabel="Login modal"
            className={'modal'}
            overlayClassName={'modal__overlay'}
        >
            <div className="modal__title">
                <span>????????</span>
                <span className={'link'} onClick={() => auth.openRegister()}>??????????????????????</span>
            </div>

            <div className="modal__row">
                <span className={'modal__label'}>E-mail</span>
                <input type="email" value={loginEmail} placeholder={'E-mail'} onChange={handleChangeLoginEmail} className="modal__input"/>
            </div>

            <div className="modal__row">
                <span className={'modal__label'}>????????????</span>
                <input type="password" value={loginPassword} onChange={handleChangeLoginPassword} className="modal__input"/>
            </div>

            <div className="modal__footer">
                <button onClick={() => auth.closeLogin()} className={'modal__button'}>????????????</button>
                <button onClick={handleLogin} className={'modal__button'}>??????????</button>
            </div>
        </ReactModal>
    </>
};

export default observer(AuthModals);