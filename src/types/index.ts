//CATEGORIAS TYPES

import type z from "zod";
import type { ProductoSchema } from "../schemas/productoSchema";
import type { LoginCredencialesSchema, LoginErrorCredencialesSchemaResponse, LoginErrorGeneralSchemaResponse, LoginErrorValidationSchemaResponse, LogOutErrorSchemaResponse, LogOutSuccessSchemaResponse, RegisterErrorGeneralSchemaResponse, RegisterErrorValidationSchemaResponse, UsuarioSchema, UsuarioSchemaAuthToken, UsuarioSchemaRegister } from "../schemas/authSchema";

export type CategoriaType = {
    icono: string,
    nombre: string,
    id: number
};

export type ObtenerCategoriasSuccess = {
      success: true;
      data: CategoriaType[];
      mensaje: string;
    }

export type ObtenerCategoriasError = {
      success: false;
      mensaje: string;
      errores?: Record<string, string[]>;
    };

export type ObtenerCategoriasResponseType = ObtenerCategoriasSuccess | ObtenerCategoriasError;


//PRODUCTOS TYPES

export type ProductoType = z.infer<typeof ProductoSchema>;


//AUTH TYPES
export type UsuarioRegisterType = z.infer<typeof UsuarioSchemaRegister>

export type UsuarioType = z.infer<typeof UsuarioSchema>;

export type RegisterValidationType = z.infer<typeof RegisterErrorValidationSchemaResponse>

export type RegisterGeneralType = z.infer<typeof RegisterErrorGeneralSchemaResponse>;

export type RegisterSuccessType = {
  success: true;
  data: {
    token: string;
    user: UsuarioType
  },
  msg: string
};

export type RegisterErrorType = {
  success: false,
  type: 'type-internet'
  error: string
}

export type RegisterErrorValidationType = {
  success: false;
  type: 'validation';
  error: RegisterValidationType
}

export type RegisterErrorGeneralType = {
  success: false;
  type: 'general';
  error: RegisterGeneralType
}

export type RegisterResponseType = RegisterErrorType | RegisterSuccessType | RegisterErrorValidationType | RegisterErrorGeneralType;

//TYPES LOGIN
export type LoginCredencialesType = z.infer<typeof LoginCredencialesSchema>;

export type LoginValidationType = z.infer<typeof LoginErrorValidationSchemaResponse>;

export type LoginGeneralType = z.infer<typeof LoginErrorGeneralSchemaResponse>;

export type LoginCredencialesErrorType = z.infer<typeof LoginErrorCredencialesSchemaResponse>;

export type LoginSuccessType = {
  success: true,
  data: {
    token: string,
    user: UsuarioType
  },
  msg: string
};

export type LoginErrorType = {
  success: false,
  type: 'type-internet',
  error: string
};

export type LoginErrorValidationType = {
  success: false,
  type: 'validation',
  error: LoginValidationType
}

export type LoginErrorGeneralType = {
  success: false,
  type: 'general',
  error: LoginGeneralType
};

export type LoginErrorCredencialesType = {
  success: false,
  type: 'credenciales',
  error: LoginCredencialesErrorType
}

export type LoginResponseType = LoginSuccessType | LoginErrorType| LoginErrorValidationType | LoginErrorGeneralType | LoginErrorCredencialesType

/////VERIFICAR TOKEN////
export type UsuarioAuthType = z.infer<typeof UsuarioSchemaAuthToken>

//NOTIFICACIONES
export type NotificacionType = {
  mensaje: string,
  error: boolean
}


//////LOG OUT/////
export type LogOutSuccessType = z.infer<typeof LogOutSuccessSchemaResponse>

export type LogOutErrorType = z.infer<typeof LogOutErrorSchemaResponse>

export type LogOutResponseType = LogOutSuccessType | LogOutErrorType;