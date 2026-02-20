import {z} from "zod";

export const ProductoSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    imagen: z.string(),
    precio: z.number(),
    disponible: z.coerce.boolean(),
    categoria_id: z.number()
});

/*
export const PaginacionLinksSchema = z.object({
    first: z.string().nullable(),
    last: z.string().nullable(),
    prev: z.string().nullable(),
    next: z.string().nullable()
})

export const PaginacionMetaSchema = z.object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    total: z.number()
})
*/
export const ProductosSchemaResponse = z.object({
    data: z.array(ProductoSchema),
    //links: PaginacionLinksSchema,
    //meta: PaginacionMetaSchema, 
    msg: z.string()
})