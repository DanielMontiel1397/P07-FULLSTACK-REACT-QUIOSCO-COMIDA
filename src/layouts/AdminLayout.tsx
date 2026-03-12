import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import Spinner from "../components/Spinner"
import { useAuth } from "../hooks/useAuth"
import { Bounce, ToastContainer } from "react-toastify"
import { useState } from "react"

export default function AdminLayout() {

  const { isLoading } = useAuth({
    middleware: 'admin'
  })

  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 flex-col">

        {/* Top bar mobile */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>

          <h2 className="font-bold text-gray-700">
            Panel Admin
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
      />

    </div>
  )
}