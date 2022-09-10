const $modules = {
    basket: 'basket',
    auth: 'auth',
    watermark: 'watermark',
    banner: 'banner',
    custom_pages: 'custom_pages',
    discounts: 'discounts',
    reviews: 'reviews',
    adult_content: 'content.adult',
    payment: {
        qiwi: 'payment.qiwi'
    },
}

const $layout = {
    header: {
        slug: 'header',

        title: 'title',
        slogan: 'slogan',
        logo: 'logo'
    },
    categories: {
        slug: 'categories',

        icons: 'icons',
    },
    social: {
        slug: 'social',

        in_header: 'in_header',
        in_footer: 'in_footer',
        is_light: 'is_light',
    }
}

const $colors = {
    background: 'background',
    header_color: 'header_color',
    footer_color: 'footer_color',
    font_color: 'font_color',
    contrast_color: 'contrast_color',
}

for(let option in $layout) {
    for(let child in $layout[option]) {
        if(child !== 'slug') {
            $layout[option][child] = $layout[option]['slug']+'.'+$layout[option][child];
        }
    }
}

export {$modules, $layout, $colors}