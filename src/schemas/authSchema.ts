import { z} from 'zod'

export const UsuarioSchema = z.object({
    name: z.string(),
    email: z.string(),
    admin: z.coerce.boolean(),
    updated_at: z.string(),
    created_at: z.string(),
    id: z.number()
})

export const UsuarioSchemaAuthToken = UsuarioSchema.extend({
    email_verified_at: z.string().nullable()
})

export const UsuarioSchemaRegister = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    password_confirmation: z.string().optional()
});

export const RegisterErrorValidationSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string(),
    errors: z.record(
        z.string(),
        z.array(z.string()))
})

export const RegisterErrorGeneralSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string()
})

export const RegisterSuccessSchemaResponse = z.object({
    token: z.string(),
    user: UsuarioSchema
})

//SCHEMAS PARA LOGIN
export const LoginCredencialesSchema = z.object({
    email: z.string().optional(),
    password: z.string().optional()
})

export const LoginSuccessSchemaResponse = z.object({
    token: z.string(),
    user: UsuarioSchema
})

export const LoginErrorValidationSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string(),
    errors: z.record(
        z.string(),
        z.array(z.string()))
})

export const LoginErrorGeneralSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string()
})

export const LoginErrorCredencialesSchemaResponse = z.object({
    ok: z.boolean(),
    errors: z.array(z.string())
})


//LOGOUT SCHEMA
export const LogOutSuccessSchemaResponse = z.object({
    ok: z.literal(true),
    message: z.string()
});

export const LogOutErrorSchemaResponse = z.object({
    ok: z.literal(false),
    message: z.string()
})