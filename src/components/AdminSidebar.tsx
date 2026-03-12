import { Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import { useAuth } from "../hooks/useAuth"

interface Props {
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: Props) {

  const logOut = useAppStore(state => state.logOut)
  const { user } = useAuth()

  return (
    <>
    
      {/* overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed z-40 flex h-full w-72 flex-col bg-indigo-600 text-white
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0
        `}
      >

        {/* close mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 text-2xl md:hidden"
        >
          ✕
        </button>

        <div className="flex justify-center p-6">
          <img
            className="w-36 drop-shadow-md"
            src="/img/logo.svg"
          />
        </div>

        <div className="mx-4 mb-10 rounded-xl bg-white/10 p-4 text-center backdrop-blur">
          <p className="text-sm text-indigo-200">Hola</p>
          <p className="truncate text-lg font-bold">
            {user?.name}
          </p>
        </div>

        <nav className="flex flex-col gap-3 px-4">

          <Link
            to="/admin"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20 hover:translate-x-1"
          >
            📦 Órdenes
          </Link>

          <Link
            to="/admin/productos"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold transition hover:bg-white/20 hover:translate-x-1"
          >
            🛒 Productos
          </Link>

        </nav>

        <div className="flex-1" />

        <div className="p-4">
          <button
            onClick={logOut}
            className="w-full rounded-xl bg-red-500 py-3 text-sm font-bold shadow-lg transition hover:bg-red-600 active:scale-95"
          >
            Cerrar Sesión
          </button>
        </div>

      </aside>
    </>
  )
}