const $modules = {
    basket: 'basket',
    auth: 'auth',
    watermark: 'watermark',
    banner: 'banner',
    custom_pages: 'custom_pages',
    discounts: 'discounts',
    reviews: 'reviews',
    adult_content: 'content.adult',
    image_zoom: 'image_zoom',
    payment: {
        qiwi: 'payment.qiwi'
    },
    custom: {
        loading: 'customization.loading'
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

const $filters = {
    sorting: 'sorting',
    search: 'search',
    availability: 'availability',
    pricing: 'pricing',
}

// Add slug ton children e.g.
// icons => categories.icons
for(let option in $layout) {
    for(let child in $layout[option]) {
        if(child !== 'slug') {
            $layout[option][child] = $layout[option]['slug']+'.'+$layout[option][child];
        }
    }
}

export {
    $modules,
    $layout,
    $colors,
    $filters,
}