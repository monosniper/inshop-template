const $modules = {
    basket: 'basket',
    auth: 'auth',
    watermark: 'hide-watermark',
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
}

for(let option in $layout) {
    for(let child in $layout[option]) {
        if(child !== 'slug') {
            $layout[option][child] = $layout[option]['slug']+'.'+$layout[option][child];
        }
    }
}

export {$modules, $layout}