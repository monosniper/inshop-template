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

const Checkout = () => {
    const products = [
        {
            img: '/assets/images/products/1.png',
            title: 'Air Max pegasus 37',
            count: 1,
            price: 129
        },
        {
            img: '/assets/images/products/1.png',
            title: 'Air Max pegasus 37',
            count: 3,
            price: 129
        },
        {
            img: '/assets/images/products/1.png',
            title: 'Air Max pegasus 37',
            count: 1,
            price: 129
        },
        {
            img: '/assets/images/products/1.png',
            title: 'Air Max pegasus 37',
            count: 5,
            price: 129
        }
    ]

    const router = useRouter()
    const [sum, setSum] = useState(basket.getSum())
    const [delivery, setDelivery] = useState(0)
    const [email, setEmail] = useState(0)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const handleSubmit = () => {
        shop.makeOrder({
            name, email, phone, address
        }, products).then(() => router.push($routes.successOrder))
    }

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <SubHeader text={'Новый заказ'} />

                    <CheckList items={basket.items} />

                    <Row className={'mb'}>
                        <Col className={'mt'} lg={4} sm={12} md={6}><EmailField address={email} setAddres={setEmail} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}><PhoneField address={phone} setAddres={setPhone} /></Col>
                        <Col className={'mt'} lg={4} sm={12} md={6}><NameField address={name} setAddres={setName} /></Col>
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

                    <button onClick={handleSubmit} className={'button button_lg mb mx-auto'}>Оформить заказ</button>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default observer(Checkout)