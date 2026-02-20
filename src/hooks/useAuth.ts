import useSWR from "swr"
import clienteAxios from "../config/axios"
import axios from "axios"
import { UsuarioSchemaAuthToken } from "../schemas/authSchema"
import type { UsuarioAuthType } from "../types"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"

type UseAuthProps = {
    middleware?: 'auth' | 'guest' | 'admin'
    url?: string
}

export const useAuth = ({ middleware, url }: UseAuthProps = {}) => {
 
    const setMutateUser = useAppStore(state =>state.setMutateUser);

    const navigate = useNavigate();
    
    const { data: user, error, isLoading, mutate } = useSWR<UsuarioAuthType | null>('/user', 
        fetcherUser,
        {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 0,
        shouldRetryOnError: false
    })

    const isAuthenticated = ! !user;

    useEffect(() => {
        if (isLoading === false) {

            //Usuario no autenticado
            if (middleware === 'auth' && !user) {
                navigate('/auth/login')
            }

            if (middleware === 'guest' && url && user) {
                navigate(url)
            }

            if (middleware === 'guest' && user && user.admin) {
                navigate('/admin');
            }

            if (middleware === 'admin' && user && !user.admin) {
                navigate('/')
            }

            if(middleware === 'admin' && !user) {
                navigate('/auth/login')
            }
            
        }
    }, [user, error])

    useEffect(() => {
        setMutateUser(mutate);
    }, [mutate])

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        mutate
    }

}

const fetcherUser = async (url: string) => {
   
    try {
        const { data } = await clienteAxios.get(url);

        const result = UsuarioSchemaAuthToken.safeParse(data);
        
        if (result.success) {
            return result.data
        }
        throw new Error('Formato de respuesta inválido');
        
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            
            if (error.response?.status === 401) {
                throw new Error('Error al iniciar sesión');
            }

            throw new Error(
                error.response?.data.message || 'Error del servidor'
            )
        }

        throw new Error('Revise su conexión a internet');
    }

}