
import type { ActualizarProductoResponseType, PedidoResponseType, PedidoType } from "../types/PedidosType";
import clienteAxios from "../config/axios";
import { ActualizarProductoErrorSchemaResponse, ActualizarProductoSuccessSchemaResponse, PedidoCompletadoSuccessSchemaResponse, PedidoErrorSchemaResponse, PedidoSuccessSchemaResponse } from "../schemas/pedidosSchema";
import axios from "axios";
import { data } from "react-router-dom";


export async function enviarPedido(pedido: PedidoType, total: number): Promise<PedidoResponseType> {

    const dataPedido = pedido.map(pedido => ({ id: pedido.id, cantidad: pedido.cantidad }));

    try {
        const url = '/pedidos'
        console.log(dataPedido);
        const { data } = await clienteAxios.post(url, {
            total: total,
            productos: dataPedido
        })

        const result = PedidoSuccessSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                ok: true,
                message: result.data.message
            }
        }

        return {
            ok: false,
            message: 'Error al procesar la respuesta del servidor'
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = PedidoErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    ok: false,
                    message: result.data.message
                }
            }
            return {
                ok: false,
                message: 'Error al procesar la respuesta del servidor'
            }
        }

        return {
            ok: false,
            message: 'Revisa tu conexión a internet'
        }
    }

}

export async function completarOrden(id: number) : Promise<PedidoResponseType> {
    console.log(id);

    try {
        const url = `/pedidos/${id}`;

        const {data} = await clienteAxios.put(url, null);
        
        const result = PedidoCompletadoSuccessSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                message: result.data.message
            }
        }

        return {
            ok: false,
            message: 'Error al procesar la respuesta del servidor'
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = PedidoErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    ok: false,
                    message: result.data.message
                }
            }
            return {
                ok: false,
                message: 'Error al procesar la respuesta del servidor'
            }
        }

        return {
            ok: false,
            message: 'Revisa tu conexión a internet'
        }
    }
}

export async function agotarProducto(id: number) : Promise<ActualizarProductoResponseType>{
    
    try {
        const url = `/productos/${id}`;

        const {data} = await clienteAxios.put(url, null);

        const result = ActualizarProductoSuccessSchemaResponse.safeParse(data);

        if(result.success){
            return {
                ok: true,
                message: result.data.message
            }
        }

        return {
            ok: false,
            message: 'Error al procesar la respuesta del servidor'
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const result = ActualizarProductoErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    ok: false,
                    message: result.data.message
                }
            }
            return {
                ok: false,
                message: 'Error al procesar la respuesta del servidor'
            }
        }

        return {
            ok: false,
            message: 'Revisa tu conexión a internet'
        }
    }
}