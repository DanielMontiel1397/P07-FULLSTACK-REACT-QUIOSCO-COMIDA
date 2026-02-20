import { useEffect } from "react";
import { useAppStore } from "../stores/useAppStore"
import Categoria from "./Categoria"

export type SidebarTypeProps = {
    usuarioName: string | undefined
}

export default function Sidebar({usuarioName} : SidebarTypeProps) {

    const obtenerCategorias = useAppStore(state => state.obtenerCategorias);
    const categorias = useAppStore(state => state.categorias);
    const logOut = useAppStore(state => state.logOut);

    useEffect(() => {
        obtenerCategorias();
    }, [])

  return (
        <aside className=" bg-white">

            <div className="p-4">
                <img 
                    className="w-40"
                    src="/img/logo.svg"
                    alt="Imagen Logo"
                />
            </div>

            <p className="my-10 text-xl text-center">Hola: {usuarioName}</p>

            <div className="mt-10">
              
               {categorias.map( categoria => (
                    <Categoria 
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </div>

            <div className="my-5 px-5">
                <button
                    type="button"
                    className="text-center bg-red-500 hover:bg-red-600 hover:cursor-pointer w-full p-3 font-bold text-white truncate"
                    onClick={logOut} 
                >
                    Cancelar Orden
                </button>
            </div>
        </aside>
    )
}
