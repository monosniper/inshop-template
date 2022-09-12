import shop from "../store/shop";
import {useMemo} from "react";

export const useFilters = () => {
    const filters = useMemo(() => shop.filters, [shop.filters])

    return {
        get: (name) => {
            const filter = filters.find(filter => filter.slug === name)
            return filters && filter && filter.isActive
        },
        isEmpty: () => {
            return !filters.filter(filter => filter.isActive).length
        }
    }
}