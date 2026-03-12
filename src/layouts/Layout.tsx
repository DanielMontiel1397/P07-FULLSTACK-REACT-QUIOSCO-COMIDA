import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Resumen from "../components/Resumen"
import { useAuth } from "../hooks/useAuth"
import Spinner from "../components/Spinner"
import { ToastContainer, Bounce } from "react-toastify"
import { useState } from "react"

export default function Layout() {

  const { isLoading, user } = useAuth({
    middleware: 'auth'
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [resumenOpen, setResumenOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    )
  }

  return (

    <div className="flex h-screen bg-gray-100">

      <Sidebar
        usuarioName={user?.name}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 flex-col">

        <header className="flex items-center justify-between bg-white px-6 py-4 shadow md:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>

          <h2 className="font-bold text-gray-700">
            Menú
          </h2>

          <button
            onClick={() => setResumenOpen(true)}
            className="text-2xl"
          >
            🧾
          </button>

        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

      <Resumen
        resumenOpen={resumenOpen}
        setResumenOpen={setResumenOpen}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />

    </div>
  )
}