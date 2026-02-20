import useSWR from "swr"
import clienteAxios from "../config/axios";
import { ObtenerPedidosSuccessSchemaResponse, } from "../schemas/pedidosSchema";
import axios from "axios";

export function usePedidos() {

    const url = '/pedidos';

    const {data,error,isLoading} = useSWR(
        url,
        obtenerPedidos,
        {
            refreshInterval:10000
        }
    )

    return {
        pedidos: data?.data ?? [],
        mensaje: data?.msg ?? null,
        isLoading,
        error
    }

}

export async function obtenerPedidos(url: string){
    try {
        
        const {data} = await clienteAxios.get(url);

        const result = ObtenerPedidosSuccessSchemaResponse.safeParse(data);
        
         if(!result.success) {
             console.error("Error de validación zod: ", result.error)
             throw new Error('Formato de respuesta inválido');
        }

        return result.data

    } catch (error) {
        if(axios.isAxiosError(error)){
            throw new Error(
                error.response?.data.message || 'Error al obtener productos'
            )
        };

        throw error;
    }
}