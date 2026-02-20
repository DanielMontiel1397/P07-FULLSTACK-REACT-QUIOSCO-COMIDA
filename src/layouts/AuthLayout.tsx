import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function AuthLayout() {

  //HOOK PARA DIRECCIONAR USUARIO AUTENTICADO
  const { isLoading } = useAuth({
    middleware: 'guest',
    url: '/'
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    )
  }

  return (
    <main className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-center min-h-screen gap-10 py-5">

      <img
        src="../img/logo.svg"
        alt="Imagen Logotipo"
        className="max-w-xs"
      />

      <div className="w-full">
        <Outlet />
      </div>

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
    </main>
  )
}
