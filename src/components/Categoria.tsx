import { useAppStore } from "../stores/useAppStore";
import type { CategoriaType } from "../types";

type CategoriaPropsType = {
    categoria: CategoriaType
}

export default function Categoria({ categoria }: CategoriaPropsType) {

    const categoriaActual = useAppStore(state => state.categoriaActual);
    const handleClickCategoria = useAppStore(state => state.setCategoriaActual);

    return (
        <button
            onClick={() => handleClickCategoria(categoria.id)}
            className={`
                group flex items-center gap-3 w-full px-4 py-2.5 text-left
                border-b border-gray-200
                transition-colors duration-150
                hover:cursor-pointer
                ${categoriaActual?.id === categoria.id
                            ? "bg-amber-100 text-amber-800 font-semibold"
                            : "bg-transparent text-gray-900 hover:bg-gray-100"
                        }
            `}
        >
            <img
                alt="Icono categoría"
                src={`/img/icono_${categoria.icono}.svg`}
                className="w-9 h-9 opacity-90 group-hover:opacity-100"
            />

            <span className=" font-medium ">
                {categoria.nombre}
            </span>
        </button>

    )
}

