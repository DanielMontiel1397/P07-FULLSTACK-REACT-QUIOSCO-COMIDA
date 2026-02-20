import {z} from 'zod';

export const CategoriaSchemaResponse = z.object({
    nombre: z.string(),
    icono: z.string(),
    id: z.number()
});

export const CategoriasSchemaResponse = z.object({
    data: z.array(CategoriaSchemaResponse),
    msg: z.string()
})

export const LaravelApiErrorSchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
});
