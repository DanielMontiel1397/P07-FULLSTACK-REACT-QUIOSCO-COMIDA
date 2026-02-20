import type { ProductoType } from "../types"

export const formatearDinero = (cantidad : ProductoType['precio']) => {
    return Number(cantidad).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}