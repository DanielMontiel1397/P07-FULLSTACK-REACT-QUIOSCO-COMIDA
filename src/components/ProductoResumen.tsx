import { formatearDinero } from "../helpers";
import { useAppStore } from "../stores/useAppStore";
import type {  } from "../types";
import type { ProductoPedidoType } from "../types/PedidosType";

type ProductoResumenProps = {
    producto: ProductoPedidoType;
};

export default function ProductoResumen({ producto }: ProductoResumenProps) {
    const incrementarCantidad = useAppStore(state => state.incrementarCantidadPedido);
    const decrementarCantidad = useAppStore(state => state.decrementarCantidadPedido);
    const eliminarProducto = useAppStore(state => state.eliminarProductoPedido);

    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">

            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-gray-800 text-lg">
                        {producto.nombre}
                    </p>
                    <p className="text-sm text-gray-500">
                        {formatearDinero(producto.precio)} c/u
                    </p>
                </div>

                <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors hover:cursor-pointer"
                >
                    Eliminar
                </button>
            </div>


            <div className="flex items-center justify-between">


                <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-3 py-2">
                    <button
                        disabled={producto.cantidad <= 1}
                        onClick={() => decrementarCantidad(producto.id)}
                        className="h-8 w-8 rounded-lg bg-white text-gray-700 font-bold shadow hover:bg-gray-50 active:scale-95 hover:cursor-pointer"
                    >
                        −
                    </button>

                    <span className="min-w-24px text-center font-bold text-gray-800">
                        {producto.cantidad}
                    </span>

                    <button
                        onClick={() => incrementarCantidad(producto.id)}
                        className="h-8 w-8 rounded-lg bg-white text-gray-700 font-bold shadow hover:bg-gray-50 active:scale-95 hover:cursor-pointer"
                    >
                        +
                    </button>
                </div>

                <p className="text-lg font-extrabold text-indigo-600">
                    {formatearDinero(producto.precio * producto.cantidad)}
                </p>
            </div>
        </div>
    );
}
