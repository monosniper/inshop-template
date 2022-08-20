import React from 'react';
import shop from "../store/shop";

const SocialNetworks = () => {
    return (
        <div className="socials">
            {shop.social_networks.map((social_network, i) => (
                <a href={social_network.value} target={'_blank'} rel={'noreferrer'} key={'social-header-'+i} className="social">
                    <img src={social_network.icon_url} alt={social_network.slug}/>
                </a>
            ))}
        </div>
    );
};

export default SocialNetworks;