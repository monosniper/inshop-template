import store from "../store/store";

export const useLayout = () => {
    console.log(store.options)
    return {
        get: (name) => store.options.layout && store.options.layout[name]
    }
}