import z from "zod";
import { ActualizarProductoErrorSchemaResponse, ActualizarProductoSuccessSchemaResponse, PedidoErrorSchemaResponse, pedidosSchema, PedidoSuccessSchemaResponse, ProductoPedidoSchemaResponse } from "../schemas/pedidosSchema";

export type ProductoPedidoType = z.infer<typeof ProductoPedidoSchemaResponse>
export type PedidoType = z.infer<typeof pedidosSchema>

export type PedidoSuccessResponseType = z.infer<typeof PedidoSuccessSchemaResponse>
export type PedidoErrorResponseType = z.infer<typeof PedidoErrorSchemaResponse>;

export type PedidoResponseType = PedidoSuccessResponseType | PedidoErrorResponseType;

//ACTUALIZAR PRODUCTO

export type ActualizarProductoSuccessResponseType = z.infer<typeof ActualizarProductoSuccessSchemaResponse>
export type AcutalizarProductoErrorResponseType = z.infer<typeof ActualizarProductoErrorSchemaResponse>

export type ActualizarProductoResponseType = ActualizarProductoSuccessResponseType | AcutalizarProductoErrorResponseType;