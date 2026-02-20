import z from "zod";
import { ProductoSchema } from "./productoSchema";
import { UsuarioSchemaAuthToken } from "./authSchema";

export const ProductoPedidoSchemaResponse = ProductoSchema.extend({
    cantidad: z.number()
});

export const pedidosSchema = z.array(ProductoPedidoSchemaResponse);

export const PedidoSuccessSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string()
})

export const PedidoErrorSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string()
})

//OBTENER PEDIDOS
export const PedidoSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    total: z.number(),
    estado: z.coerce.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    user: UsuarioSchemaAuthToken,
    productos: z.array(ProductoSchema.extend({
        created_at: z.string(),
        updated_at: z.string(),
        pivot: z.object({
            cantidad: z.number(),
            pedido_id: z.number(),
            producto_id: z.number()
        })
    }))
})

export const ObtenerPedidosSuccessSchemaResponse = z.object({
    data: z.array(PedidoSchema),
    msg: z.string()
})

export const ObtenerPedidosErrorSchemaResponse = z.object({
    ok: z.boolean(),
    message: z.string()
})

export const PedidoCompletadoSuccessSchemaResponse = z.object({
    message: z.string(),
    data: z.object({
        pedido: z.object({
            id: z.number(),
            user_id: z.number(),
            total: z.number(),
            estado: z.coerce.boolean(),
            created_at: z.string(),
            updated_at: z.string()
        })
    })
})

//HABILITAR DESHABILITAR PRODUCTO
export const ActualizarProductoSuccessSchemaResponse = z.object({
    ok: z.literal(true),
    message: z.string()
})

export const ActualizarProductoErrorSchemaResponse = z.object({
    ok: z.literal(false),
    message: z.string()
})