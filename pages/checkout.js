import React, {useState} from 'react';
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

const Checkout = () => {
    const router = useRouter()
    const [sum, setSum] = useState(basket.getSum())
    const [delivery, setDelivery] = useState(0)
    const [email, setEmail] = useState(auth.data.email)
    const [name, setName] = useState(auth.data.fio)
    const [phone, setPhone] = useState(auth.data.phone)
    const [address, setAddress] = useState(auth.data.address)
    const { t, i18n } = useTranslation();

    const handleSubmit = () => {
        shop.makeOrder({
            name, email, phone, address
        }, basket.items).then(() => router.push($routes.successOrder))
    }

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <SubHeader text={t('new order')} />

                    <CheckList items={basket.items} />

                    <Row className={'mb'}>
                        <Col className={'mt'} lg={4} sm={12} md={6}><EmailField email={email} setEmail={setEmail} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}><PhoneField phone={phone} setPhone={setPhone} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}><NameField name={name} setName={setName} /></Col>
                    </Row>

                    <Row className={'mb'}>
                        <Col className={'mt'} lg={4} sm={12} md={6}><AddressField address={address} setAddres={setAddress} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}>
                            <TotalField
                                sum={sum}
                                delivery={delivery}
                            />
                        </Col>
                    </Row>

                    <button onClick={handleSubmit} className={'button button_lg mb mx-auto'}>{t('make order')}</button>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default observer(Checkout)