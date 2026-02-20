import { Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import { useAuth } from "../hooks/useAuth";

export default function AdminSidebar() {

    const logOut = useAppStore(state => state.logOut);
    const { user } = useAuth();

    return (
        <aside className="flex h-screen w-72 flex-col  bg-indigo-600  text-white">

            <div className="flex justify-center p-6">
                <img
                    className="w-36 drop-shadow-md"
                    src="/img/logo.svg"
                    alt="Imagen Logo"
                />
            </div>

            <div className="mx-4 mb-10 rounded-xl bg-white/10 p-4 text-center backdrop-blur">
                <p className="text-sm text-indigo-200">Hola</p>
                <p className="text-lg font-bold truncate">
                    {user?.name}
                </p>
            </div>

            <nav className="flex flex-col gap-3 px-4">
                <Link
                    to="/admin"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-all hover:bg-white/20 hover:translate-x-1"
                >
                    📦 Órdenes
                </Link>

                <Link
                    to="/admin/productos"
                    className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition-all hover:bg-white/20 hover:translate-x-1"
                >
                    🛒 Productos
                </Link>
            </nav>

            <div className="flex-1" />

            <div className="p-4">
                <button
                    type="button"
                    onClick={logOut}
                    className="w-full rounded-xl bg-red-500 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-600 active:scale-95 hover:cursor-pointer"
                >
                    Cerrar Sesión
                </button>
            </div>

        </aside>


    )

}
