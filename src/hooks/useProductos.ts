import useSWR, { mutate } from "swr";
import clienteAxios from "../config/axios";
import { ProductosSchemaResponse } from "../schemas/productoSchema";
import axios from "axios";

export function useProductos() {

    const url = `/productos`;

    const {data, error, isLoading} = useSWR(
        url,
        obtenerProductos,
        {
            refreshInterval: 10000
        }
    )

    return {
        productos: data?.data ?? [],
        mensaje: data?.msg ?? null,
        isLoading,
        error,
        mutate
    };
}

export async function obtenerProductos(url: string) {
     try {
        const {data} = await clienteAxios.get(url);
    
        const result = ProductosSchemaResponse.safeParse(data);

        if(!result.success) {
             console.error("Error de validación zod: ", result.error)
             throw new Error('Formato de respuesta inválido');
        }

        return result.data;
     } catch (error) {
        if(axios.isAxiosError(error)){
            throw new Error(
                error.response?.data.message || 'Error al obtener productos'
            )
        };

        throw error;
     }
}