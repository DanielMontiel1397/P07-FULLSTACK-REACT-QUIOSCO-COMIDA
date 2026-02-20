import axios from "axios";
import clienteAxios from "../config/axios";
import { LoginErrorCredencialesSchemaResponse, LoginErrorValidationSchemaResponse, LoginSuccessSchemaResponse, LogOutErrorSchemaResponse, LogOutSuccessSchemaResponse, RegisterErrorGeneralSchemaResponse, RegisterErrorValidationSchemaResponse, RegisterSuccessSchemaResponse } from "../schemas/authSchema";
import type { LoginCredencialesType, LoginResponseType, LogOutResponseType, RegisterResponseType, UsuarioRegisterType } from "../types";

export async function registrarUsuario(usuario: UsuarioRegisterType): Promise<RegisterResponseType> {
    const url = '/registro';

    try {
        const { data } = await clienteAxios.post(url, usuario);

        const result = RegisterSuccessSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                data: result.data,
                msg: 'Usuario Registrado Correctamente'
            }
        }

        return {
            success: false,
            type: 'type-internet',
            error: "Error al procesar la respuesta del servidor"
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;

            const resultValidation = RegisterErrorValidationSchemaResponse.safeParse(data);

            if (resultValidation.success) {
                return {
                    success: false,
                    type: 'validation',
                    error: resultValidation.data
                }
            } else {
                const resultGeneral = RegisterErrorGeneralSchemaResponse.safeParse(data);

                if (resultGeneral.success) {
                    return {
                        success: false,
                        type: 'general',
                        error: resultGeneral.data
                    }
                } else {
                    return {
                        success: false,
                        type: 'type-internet',
                        error: "Error al procesar la respuesta del servidor"
                    }
                }
            }
        } else {
            return {
                success: false,
                type: 'type-internet',
                error: 'Error de conexion. Verifica tu internet'
            }
        }
    }
}

export async function loginAuthUsuario(credenciales: LoginCredencialesType): Promise<LoginResponseType> {
    const url = '/login';

    try {
        const { data } = await clienteAxios.post(url, credenciales);

        const result = LoginSuccessSchemaResponse.safeParse(data);

        if (result.success) {
            return {
                success: true,
                data: result.data,
                msg: 'Usuario autenticado correctamente'
            }
        }

        return {
            success: false,
            type: 'type-internet',
            error: "Error al procesar la respuesta del servidor"
        }

    } catch (error) {
  
        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;

            const resultValidation = LoginErrorValidationSchemaResponse.safeParse(data);

            if (resultValidation.success) {

                return {
                    success: false,
                    type: 'validation',
                    error: resultValidation.data
                }

            } else {
                const resultCredenciales = LoginErrorCredencialesSchemaResponse.safeParse(data);

                if (resultCredenciales.success) {
                    return {
                        success: false,
                        type: 'credenciales',
                        error: resultCredenciales.data
                    }
                } else {
                    const resultGeneral = RegisterErrorGeneralSchemaResponse.safeParse(data);

                    if (resultGeneral.success) {
                        return {
                            success: false,
                            type: 'general',
                            error: resultGeneral.data
                        }
                    } else {
                        return {
                            success: false,
                            type: 'type-internet',
                            error: "Error al procesar la respuesta del servidor"
                        }
                    }
                }
            }
        } else {
            return {
                success: false,
                type: 'type-internet',
                error: 'Error de conexion. Verifica tu internet'
            }
        }
    }
}

export async function cerrarSesion(): Promise<LogOutResponseType> {
    try {

        const { data } = await clienteAxios.post('/logout', null);

        const result = LogOutSuccessSchemaResponse.safeParse(data);

        if (result.success) {

            return {
                ok: true,
                message: result.data.message
            }
        }

        return {
            ok: false,
            message: "Error al procesar la respuesta del servidor"
        }

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { data } = error.response;

            const result = LogOutErrorSchemaResponse.safeParse(data);

            if (result.success) {
                return {
                    ok: false,
                    message: result.data.message
                }
            }

            return {
                ok: false,
                message: "Error al procesar la respuesta del servidor"
            }
        }

        return {
            ok: false,
            message: 'Error de conexion. Verifica tu internet'
        }

    }
}