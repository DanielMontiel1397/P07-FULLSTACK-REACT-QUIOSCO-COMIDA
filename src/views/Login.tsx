import { createRef } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export default function Login() {



  //STORE
  const loginUsuario = useAppStore(state => state.loginUsuario);
  const erroresValidacion = useAppStore(state => state.erroresValidacion);
  const loading = useAppStore(state => state.loading);
  const limpiarErrores = useAppStore(state => state.limpiarErrores);

  //Almacenar Valores de Inputs
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  //Submit al backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    limpiarErrores();

    const credenciales = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    }

    await loginUsuario(credenciales);

  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-black">Inicia Sesión</h1>
        <p className="">Para crear un pedido, debes iniciar sesión.</p>
      </div>

      <div className="bg-white shadow-md rounded-md px-5 py-3 mt-5">

        <form
          onSubmit={handleSubmit}
        >

          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-slate-800"
            >
              Email:
            </label>

            <input
              type="email"
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu Email"
              name="email"
              ref={emailRef}
            />

            {erroresValidacion.email && (
              <p className="text-red-500 text-sm mt-1">
                {erroresValidacion.email[0]}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-slate-800"
            >
              Password:
            </label>

            <input
              type="password"
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu Password"
              name="password"
              ref={passwordRef}
            />

            {erroresValidacion.password && (
              <p className="text-red-500 text-sm mt-1">
                {erroresValidacion.password[0]}
              </p>
            )}
          </div>

          <input
            type="submit"
            value={loading ? 'Iniciando Sesión...' : "Iniciar Sesión"}
            className={`hover:cursor-pointer bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold
                       ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-800'}
                    `}
          />

        </form>

        <nav className="mt-5">
          <Link to="/auth/register">
            ¿No tienes cuenta? Crea una.
          </Link>
        </nav>

        <div className="mt-6 max-w-md mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-5">

          <p className="text-center text-gray-700 font-semibold text-lg mb-4">
            Prueba una cuenta de administrador
          </p>

          <div className="flex flex-col md:justify-between md:items-center gap-3 text-sm md:text-base">

            <div className=" w-full">
              <p className="font-semibold text-gray-700">
                Usuario: <span className="text-gray-600 break-all">admin@gmail.com</span>
              </p>
              
            </div>

            <div className="w-full">
              <p className="font-semibold text-gray-700">
                Password: <span className="text-gray-600">123456</span>
              </p>
              
            </div>

          </div>

        </div>

      </div>
    </>
  )
}
