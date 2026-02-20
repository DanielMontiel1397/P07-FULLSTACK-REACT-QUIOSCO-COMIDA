import type { StateCreator } from "zustand";
import type { CategoriaType } from "../types";
import { obtenerCategorias } from "../services/categoriaService";


export type CategoriaSliceType = {
    categorias: CategoriaType[],
    obtenerCategorias: () => void,
    categoriaActual: CategoriaType | null,
    setCategoriaActual: (id: CategoriaType['id']) => void,
    error: string | null
}

export const categoriasSlice: StateCreator<CategoriaSliceType> = (set, get) => ({
    error: null,
    categoriaActual: null,
    categorias: [],
    obtenerCategorias: async () => {


        const respuesta = await obtenerCategorias();
        
        if (respuesta.success) {
            set({
                categorias: respuesta.data,
                categoriaActual: respuesta.data[0] ?? null
            })
        } else {
            set({
                categorias: [],
                categoriaActual: null
            })
        }


    },
    setCategoriaActual: (id) => {
        const categoria = get().categorias.find(categoria => categoria.id === id) ?? null;
        set({
            categoriaActual: categoria
        })
    }
})