import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";
import constructor from "./constructor";

class Shop {
    id = null
    defaultOptions = {
        title: '',
        slogan: '',
        hasOwnPalette: false,
        ownPalette: [],
        palette: [],
        layout: {},
        modules: []
    }
    oldOptions = this.defaultOptions
    options = this.defaultOptions

    constructor() {
        makeAutoObservable(this)
    }

    setTitle(title) {
        this.options.title = title;
    }

    setSlogan(slogan) {
        this.options.slogan = slogan;
    }

    getLayoutOption(name) {
        return this.options.layout[name];
    }

    setLayoutOption(name, state) {
        this.options.layout[name] = state;
    }

    setHasOwnPalette(state) {
        this.options.hasOwnPalette = state;
    }

    setOwnPalette(palette) {
        this.options.ownPalette = palette
    }

    setModules(modules) {
        this.options.modules = modules;
    }

    setPalette(palette) {
        this.options.palette = palette
    }

    getModules() {
        let modules = this.options.modules

        if(modules) {
            modules = [...modules.entries()].map(entry => entry[1])

            return modules
        }

        return [];
    }

    hasModule(name) {
        return  this.getModules().indexOf(name) !== -1;
    }

    isOwnPalette() {
        return this.isPalette(this.options.ownPalette, this.options.palette)
    }

    getPalette() {
        let storePalette = this.options.palette

        if(storePalette) {
            storePalette = [...storePalette.entries()].map(entry => entry[1])

            return storePalette
        }

        return [];
    }

    isPalette(palette) {
        function arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        }

        return arrayEquals(this.getPalette(), palette)
    }

    hasUpdates() {
        const oldData = JSON.stringify(this.oldOptions)
        const currentData = JSON.stringify(this.options)

        return currentData !== oldData
    }

    setId(id) {
        this.id = id
    }

    setOptions(options) {
        this.options = options;
    }

    setOldOption(options) {
        this.oldOptions = options;
    }

    resetOptions() {
        this.setOldOption({...this.defaultOptions})
        this.setOptions({...this.defaultOptions})
    }

    async sendShopUpdate() {
        const options = await ShopService.sendUpdate(this.id, this.options)

        if(options) {
            store.setShopData(this.id, options)
        }
    }

    async requestData() {
        const response = await ShopService.requestData(this.id)

        this.resetOptions()

        if(response.options) {
            this.setOldOption({...response.options})
            this.setOptions({...response.options})

            const layout = response.options.layout;

            if(layout) {
                if((Array.isArray(layout) && !layout.length) || layout.logo === undefined) {
                    this.options.layout = constructor.processLayout()
                }
            }
        }
    }
}

export default new Shop()