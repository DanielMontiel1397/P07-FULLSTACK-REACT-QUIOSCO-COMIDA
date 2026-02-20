import { createRef } from "react"
import { Link } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

export default function Registro() {
  
    //VALORES PARA ENVIO DE FORMULARIO
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const passwordConfirmationRef = createRef<HTMLInputElement>();

    const resgitrarUsuario = useAppStore(state => state.registrarUsuario);
    const erroresValidacion = useAppStore(state => state.erroresValidacion);
    const loading = useAppStore(state => state.loading);
    const limpiarErrores = useAppStore(state => state.limpiarErrores);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Limpiar Errores de la pagina
        limpiarErrores();

        const datos = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value
        };

        await resgitrarUsuario(datos);

    }

    return (

        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
                <p className="">Crea tu Cuenta llenando el formulario</p>
            </div>

            <div className="bg-white shadow-md rounded-md px-5 py-3 mt-5">

                <form
                    onSubmit={handleSubmit}
                    action=""
                    noValidate
                >

                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="text-slate-800"
                        >
                            Nombre:
                        </label>

                        <input
                            type="text"
                            id="name"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Tu Nombre"
                            name="name"
                            ref={nameRef}
                        />

                        {erroresValidacion.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {erroresValidacion.name[0]}
                            </p>
                        )}

                    </div>

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

                    <div className="mb-4">
                        <label
                            htmlFor="password_confirmation"
                            className="text-slate-800"
                        >
                            Repetir Password:
                        </label>

                        <input
                            type="password"
                            id="password_confirmation"
                            className="mt-2 w-full p-3 bg-gray-50"
                            placeholder="Repite tu Password"
                            name="password_confirmation"
                            ref={passwordConfirmationRef}
                        />

                        {erroresValidacion.password_confirmation && (
                            <p className="text-red-500 text-sm mt-1">
                                {erroresValidacion.password_confirmation[0]}
                            </p>
                        )}
                    </div>

                    <input
                        type="submit"
                        disabled={loading}
                        value={loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        className={`hover:cursor-pointer bg-indigo-600 text-white w-full mt-5 p-3 uppercase font-bold
                                        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-800'}
                                    `}
                    />

                </form>

                <nav className="mt-5">
                    <Link to="/auth/login">
                        ¿Ya tienes una Cuenta? Inicia Sesión.
                    </Link>
                </nav>

            </div>
        </>

    )
}
