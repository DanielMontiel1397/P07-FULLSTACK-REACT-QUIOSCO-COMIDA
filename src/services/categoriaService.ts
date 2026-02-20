
import clienteAxios from "../config/axios";
import axios from "axios";
import { CategoriasSchemaResponse, LaravelApiErrorSchema } from "../schemas/categoriaSchema";
import type { ObtenerCategoriasResponseType } from "../types";

export async function obtenerCategorias(): Promise<ObtenerCategoriasResponseType> {

    const url = '/categorias';

    try {
        const { data } = await clienteAxios.get(url);
        
        const result = CategoriasSchemaResponse.safeParse(data);

        if (!result.success) {
            return {
                success: false,
                mensaje: "Error al procesar la respuesta del servidor"
            }
        }
       
        return {
            success: true,
            data: result.data.data,
            mensaje: result.data.msg
        }
        
    } catch (error) {
        
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;
            const result = LaravelApiErrorSchema.safeParse(data);
            
            if (result.success) {
                return {
                    success: false,
                    mensaje: result.data.message,
                    errores: result.data.errors
                }
            }

            return {
                success: false,
                mensaje: "Error desconocido del servidor",
            };
        }

        return {
            success: false,
            mensaje: "No se pudo conectar con el servidor",
        };
    }

}