import type { StateCreator } from "zustand";
import type { LoginCredencialesType, UsuarioAuthType, UsuarioRegisterType, UsuarioType } from "../types";
import { cerrarSesion, loginAuthUsuario, registrarUsuario } from "../services/authService";
import { toast } from "react-toastify";
import type { KeyedMutator } from "swr";
import type { PedidoSliceType } from "./pedidosSlice";


export type AuthSliceType = {
    usuario: UsuarioType| null,
    token: string,
    loading: boolean,
    erroresValidacion: Record<string, string[]>,
    limpiarErrores: () => void
    registrarUsuario: (usuario: UsuarioRegisterType) => Promise<void>
    loginUsuario: (credenciales: LoginCredencialesType) => Promise<void>
    logOut: () => Promise<void>

    mutateUser: KeyedMutator<UsuarioAuthType | null > | null
    setMutateUser: (mutateFn: KeyedMutator<UsuarioAuthType | null>) => void
};

export const authSlice: StateCreator<AuthSliceType & PedidoSliceType, [], [], AuthSliceType> = (set, get) => ({
    usuario: null,

    token: '',

    loading: false, 

    erroresValidacion: {},

    limpiarErrores: () => {
        set({
            erroresValidacion: {}
        })
    },

    registrarUsuario: async (usuario) => {

        set({
            loading: true
        })

        const respuesta = await registrarUsuario(usuario)
        
        if(respuesta.success){
            toast.success(respuesta.msg)

            localStorage.setItem('AUTH_TOKEN_QUIOSCO', respuesta.data.token)

            await get().mutateUser?.();

        } else {

            if(respuesta.type === 'validation'){
                set({
                    erroresValidacion: respuesta.error.errors
                })

            } else if(respuesta.type === 'general'){
                toast.error(respuesta.error.message)
            } else {
                toast.error(respuesta.error)
            }

            localStorage.removeItem('AUTH_TOKEN_QUIOSCO')
        }

        set({
            loading: false
        })
    },

    loginUsuario: async(credenciales) => {

        set({
            loading: true
        })

        const respuesta = await loginAuthUsuario(credenciales);
        
        if(respuesta.success){
            toast.success(respuesta.msg);
            localStorage.setItem('AUTH_TOKEN_QUIOSCO', respuesta.data.token)
            await get().mutateUser?.();
        } else {

            if(respuesta.type === 'validation'){
                set({
                    erroresValidacion: respuesta.error.errors
                })
            } else if(respuesta.type === 'general'){

                toast.error(respuesta.error.message)

            } else if(respuesta.type === 'credenciales'){

                toast.error(respuesta.error.errors[0])

            } else {
                toast.error(respuesta.error)
            }
            localStorage.removeItem('AUTH_TOKEN_QUIOSCO')
        }

        set({
            loading: false
        })
    },

    logOut: async () => {
        const respuesta = await cerrarSesion();

        if(respuesta.ok){

            toast.success(respuesta.message);
            localStorage.removeItem('AUTH_TOKEN_QUIOSCO');
            await get().mutateUser?.(null);
            set({
                pedido: []
            })
        } else {
            toast.error(respuesta.message);
        }

    },

    mutateUser: null,

    setMutateUser: (mutateFn)=> {
        set({
            mutateUser: mutateFn
        })
    }

})