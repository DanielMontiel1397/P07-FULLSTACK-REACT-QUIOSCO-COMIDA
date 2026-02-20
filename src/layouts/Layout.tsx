import { Outlet } from "react-router-dom"
//import { Link } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import Resumen from "../components/Resumen";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { ToastContainer, Bounce } from "react-toastify";
//import ModalProducto from "../components/Modal/ModalProducto";

export default function Layout() {

  const { isLoading, user } = useAuth({
    middleware: 'auth'
  })

  if(isLoading){
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    )
  }

  return (
    <>


      {/* <header className='h-16 flex items-center w-9/12 mx-auto'>
          <nav className='w-full justify-end flex gap-10 text-lg font-bold uppercase'>

          <Link to="/" className='bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-2 rounded-lg'>
              Inicio
            </Link>

            <Link to="/admin" className='bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-2 rounded-lg'>
              Panel de Administrador
            </Link>

          </nav>
        </header> */}

      <div className="grid h-screen grid-cols-[260px_1fr_360px]">
        <Sidebar 
          usuarioName={user?.name}
        />

        <main className="overflow-y-auto p-6">
          <Outlet />
        </main>

        <Resumen />

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

      {/*  <Modal 
            isOpen={modal}
            style={customStyles}
          >
            
            <ModalProducto></ModalProducto>

          </Modal>

          <ToastContainer/> */}

    </>
  )
}
