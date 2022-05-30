import store from "../store/store";

export const useModules = () => {
    return {
        get: (name) => store.options.modules && store.options.modules.includes(name)
    }
}