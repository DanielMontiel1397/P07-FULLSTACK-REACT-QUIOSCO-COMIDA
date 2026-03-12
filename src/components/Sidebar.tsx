import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Categoria from "./Categoria"

export type SidebarTypeProps = {
    usuarioName: string | undefined
    sidebarOpen: boolean
    setSidebarOpen: (value: boolean) => void
}

export default function Sidebar({usuarioName,sidebarOpen,setSidebarOpen}: SidebarTypeProps) {

    const obtenerCategorias = useAppStore(state => state.obtenerCategorias)
    const categorias = useAppStore(state => state.categorias)
    const logOut = useAppStore(state => state.logOut)

    useEffect(() => {
        obtenerCategorias()
    }, [])

    return (
        <>
            {/* overlay mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 z-40 h-full bg-white flex flex-col
                    transform transition-transform duration-300
                    w-full md:w-72
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    md:relative md:translate-x-0
                    `}
            >

                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute right-4 top-4 md:hidden"
                >
                    ✕
                </button>

                <div className="p-4">
                    <img
                        className="md:w-40 w-20"
                        src="/img/logo.svg"
                    />
                </div>

                <p className="md:my-6 my-3 md:text-xl text-lg text-center">
                    Hola: {usuarioName}
                </p>

                <div className="flex-1 overflow-y-auto px-3">
                    <div className="space-y-1">
                        {categorias.map(categoria => (
                            <Categoria
                                key={categoria.id}
                                categoria={categoria}
                            />
                        ))}
                    </div>
                </div>

                <div className="p-5 border-t">
                    <button
                        onClick={logOut}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded hover:cursor-pointer"
                    >
                        Cancelar Orden
                    </button>
                </div>

            </aside>
        </>
    )
}