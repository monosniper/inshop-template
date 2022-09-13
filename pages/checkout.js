import React, {useEffect, useMemo, useState} from 'react';
import Header from "../components/header";
import {Col, Container, Row} from "react-bootstrap";
import SubHeader from "../components/subHeader";
import Footer from "../components/footer";
import TotalField from "../components/checkout/TotalField";
import PhoneField from "../components/checkout/PhoneField";
import AddressField from "../components/checkout/AddressField";
import CheckList from "../components/checkout/CheckList";
import NameField from "../components/checkout/NameField";
import EmailField from "../components/checkout/EmailField";
import shop from "../store/shop";
import {useRouter} from "next/router";
import {$routes} from "../http/routes";
import basket from "../store/basket";
import {observer} from "mobx-react-lite";
import auth from "../store/auth";
import {useTranslation} from "react-i18next";
import styles from "../styles/components/Filters.module.scss";
import ReactModal from "react-modal";
import store from "../store/store";
import {$modules} from "../utils/config";
import {useModules} from "../hooks/useModules";
import {useShop} from "../hooks/useShop";
import {v4 as uuid} from 'uuid';

function OrderHelpText({orderId}) {
    const shop_data = useShop()
    const content = shop_data.orderText.replaceAll("%instagram%", "<a class='contrast' target='_blank' href='"+shop.getInstagramLink()+"'>instagram</a>");
    return <div dangerouslySetInnerHTML={{__html:content}} style={{textAlign: 'center', wordBreak: 'break-word'}}></div>;
}

function OrderHelpTitle({orderId}) {
    return <p style={{textAlign: 'center'}}>Номер заказа - #{orderId}</p>;
}

const Checkout = () => {
    const router = useRouter()
    const modules = useModules()
    const {product_id} = router.query
    const [email, setEmail] = useState(auth.data.email)
    const [name, setName] = useState(auth.data.fio)
    const [phone, setPhone] = useState(auth.data.phone)
    const [address, setAddress] = useState(auth.data.address)
    const [orderId, setOrderId] = useState(null)
    const { t, i18n } = useTranslation();
    const [showModal, setShowModal] = useState(false)
    const items = useMemo(() => product_id ? [
        shop.getProduct(product_id)
    ] : (modules.get($modules.basket) ? basket.items.map(item => item.product) : []), [modules, basket.items, router.query])
    const [sum, setSum] = useState(0)
    const [orderCreated, setOrderCreated] = useState(false)

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const handleSubmit = () => {
        const billId = uuid();
        shop.makeOrder(billId, {
            name, email, phone, address
        }, items.map(item => item.id)).then((rs) => {
            // router.push($routes.successOrder
            if(modules.get($modules.payment.qiwi)) {
                const params = {
                    public_key: shop.options.qiwiPublicKey,
                    'customFields[themeCode]': shop.options.qiwiTheme,
                    // successUrl: 'http://localhost:3004/success',
                    successUrl: 'https://' + shop.domain + $routes.successOrder,
                    comment: ' - ' + items.map(item => item.title).join(', '),
                    // account : '79643210393',
                    phone,
                    email,
                    billId,
                    amount: basket.getSum(items),
                }

                let url = 'https://oplata.qiwi.com/create?' + new URLSearchParams(params).toString();

                window.location.replace(url)
            } else {
                setOrderId(rs)
                setOrderCreated(true)
                handleOpenModal()
            }
        })
    }

    useEffect(() => {
        setSum(basket.getSum(items))
    }, [items])

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <SubHeader text={t('new order')} />

                    <CheckList items={items} />

                    <Row className={'mb'}>
                        <Col className={'mt'} lg={4} sm={12} md={6}><EmailField email={email} setEmail={setEmail} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}><PhoneField phone={phone} setPhone={setPhone} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}><NameField name={name} setName={setName} /></Col>
                    </Row>

                    <Row className={'mb'}>
                        <Col className={'mt'} lg={4} sm={12} md={6}><AddressField address={address} setAddress={setAddress} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}>
                            <TotalField sum={sum}/>
                        </Col>
                    </Row>
                    {orderCreated ? <>
                        <OrderHelpTitle orderId={orderId} />
                        <OrderHelpText orderId={orderId} />
                    </> : null}
                    <br/>
                    <button onClick={handleSubmit} disabled={orderCreated} className={'button button_lg mb mx-auto'}>{t('make order')}</button>
                </Container>
            </div>

            <Footer/>

            <ReactModal
                isOpen={showModal}
                className={'modal'}
                overlayClassName={'modals-overlay'}
            >
                <div className="modal__title"><OrderHelpTitle orderId={orderId} /></div>
                <OrderHelpText orderId={orderId} />
                <button onClick={handleCloseModal} className={'modal__button button'}>Ок</button>
            </ReactModal>
        </>
    );
};

export default observer(Checkout)