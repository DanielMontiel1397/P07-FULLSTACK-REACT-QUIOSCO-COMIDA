import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import Spinner from "../components/Spinner"
import { useAuth } from "../hooks/useAuth"
import { Bounce, ToastContainer } from "react-toastify"


export default function AdminLayout() {

  const { isLoading } = useAuth({
    middleware: 'admin'
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid h-screen grid-cols-[260px_1fr] bg-gray-100">
      <AdminSidebar />

      <main className="overflow-y-auto p-8">
        <Outlet />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

    </div>
  )
}
