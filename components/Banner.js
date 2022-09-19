import React, {useMemo} from 'react';
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import {useEffect, useState} from "react";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";
import {useIsMobile} from "../hooks/useIsMobile";

const Banner = () => {
    const banners = useMemo(() => shop.banners, [shop.banners])
    const AutoplaySlider = withAutoplay(AwesomeSlider)
    const isMobile = useIsMobile()

    return banners.length ? (
            <AutoplaySlider
                bullets={false}
                className={'slider'}
                play={true}
                cancelOnInteraction={false}
                interval={6000}
            >
                {banners.map((banner, i) => <div key={'banner-'+i} className={'banner'}>
                    <div
                        className={'banner__inner'}
                        style={{
                            backgroundColor: banner.background ? banner.background : '#3a3a3a',
                            backgroundImage: banner.type.indexOf('image') !== -1 ? 'url(' + banner[isMobile ? 'mobile_image_url' : 'desktop_image_url'] + ')' : 'none',
                            pointerEvents: banner.type !== 'image' ? 'all' : 'none',
                        }}
                    >
                        {banner.type.indexOf('text') !== -1
                            ? <>
                                <div style={{color: banner.color ? banner.color : '#fff'}} className="banner__title">{banner.title}</div>
                                <div style={{color: banner.color ? banner.color : '#fff'}} className="banner__text">{banner.text}</div>
                            </>
                            : null}
                        {banner.type.indexOf('button') !== -1
                            ? <a href={banner.button_link} rel={'noreferrer'} target={'_blank'} style={{background: banner.button_background ? banner.button_background : 'red', color: banner.button_color ? banner.button_color : 'white'}} className="banner__button">{banner.button_text}</a>
                            : null}
                    </div>
                </div>)}
            </AutoplaySlider>
        ) : null;
};

export default observer(Banner);