import shop from "../store/shop";
import {useMemo} from "react";

export const useColors = () => {
    const colors = useMemo(() => shop.colors, [shop.colors])

    return {
        get: (name) => {
            const color = colors.find(color => color.slug === name)
            return colors && color.value ? color.value : color.default_value
        }
    }
}