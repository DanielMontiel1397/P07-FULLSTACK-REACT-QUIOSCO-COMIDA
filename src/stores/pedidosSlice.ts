import type { StateCreator } from "zustand";
import type { PedidoType } from "../types/PedidosType";
import type { ProductoType } from "../types";
import { agotarProducto, completarOrden, enviarPedido } from "../services/pedidoService";
import { toast } from "react-toastify";
import { mutate } from "swr";

export type PedidoSliceType = {
    pedido: PedidoType,
    guardarProductoPedido: (pedido : ProductoType) => void,
    eliminarProductoPedido: (id: ProductoType['id']) => void
    incrementarCantidadPedido: (id: ProductoType['id']) => void
    decrementarCantidadPedido: (id: ProductoType['id']) => void
    crearOrden: (pedido: PedidoType, total: number) => void
    completarPedido: (id: number) => void
    agotarProducto: (id: number) => void
}

export const pedidosSlice : StateCreator<PedidoSliceType> = (set, get) => ({
    pedido: [],

    guardarProductoPedido: (pedidoAgregar) => {

        const existeProducto = get().pedido.find(pedido =>pedido.id === pedidoAgregar.id);
        
        if(existeProducto) {
            const pedidoActualizado = get().pedido.map(pedido => pedido.id === pedidoAgregar.id ? {...pedido, cantidad: pedido.cantidad + 1} : pedido);
            set({
                pedido: pedidoActualizado
            })
        } else {
            set({
                pedido: [
                    ...get().pedido,
                    {...pedidoAgregar, cantidad: 1}
                ]
            })
        }
        
    },

    incrementarCantidadPedido: (id) => {
        const pedidoActualizado = get().pedido.map(pedido => pedido.id === id ? {...pedido, cantidad: pedido.cantidad + 1} : pedido);
        set({
            pedido: pedidoActualizado
        })
    },

    decrementarCantidadPedido: (id) => {
        const pedidoActualizado = get().pedido.map(pedido => pedido.id === id ? {...pedido, cantidad: pedido.cantidad - 1} : pedido);
        set({
            pedido: pedidoActualizado
        })
    },

    eliminarProductoPedido: (id) => {
        const pedidoActualizado = get().pedido.filter(pedido => pedido.id !== id)

        set({
            pedido: pedidoActualizado
        })
    },

    crearOrden: async (pedido, total) => {
        const respuesta = await enviarPedido(pedido, total);
        
        if(respuesta.ok){
            toast.success(respuesta.message);
            set({
                pedido: []
            })
        } else {
            toast.error(respuesta.message);
        }


    },

    completarPedido: async (id) => {
        const respuesta = await completarOrden(id);
        
        if(respuesta.ok){
            toast.success(respuesta.message);

            mutate('/pedidos');
        } else {
            toast.error(respuesta.message)
        }

    },

    agotarProducto: async(id) => {
        const respuesta = await agotarProducto(id);
        
        if(respuesta.ok){
            toast.success(respuesta.message);
            mutate('/productos');
        } else {
            toast.error(respuesta.message);
        }
    }
})