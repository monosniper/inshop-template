import shop from "../store/shop";
import {useMemo} from "react";

export const useLayout = () => {
    const layout = useMemo(() => shop.layout, [shop.layout])

    return {
        get: (name) => {
            const option = layout.find(option => option.slug === name)
            return layout && option && option.isActive
        }
    }
}