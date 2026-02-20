import { formatearDinero } from "../helpers";
import { useAppStore } from "../stores/useAppStore";
import type { ProductoType } from "../types";

type ProductoPropsType = {
    producto: ProductoType;
    botonAgregar: boolean;
    botonDisponible: boolean;
};

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }: ProductoPropsType) {

    const { nombre, imagen, precio } = producto;
    const guardarProducto = useAppStore(state => state.guardarProductoPedido);
    const agotarProducto = useAppStore(state => state.agotarProducto);

    return (
        <div className="group flex flex-col rounded-2xl bg-white shadow-sm transition hover:shadow-lg">

            <div className="flex h-36 items-center justify-center bg-gray-50 p-4">
                <img
                    src={`/img/${imagen}.jpg`}
                    alt={nombre}
                    className="h-full object-contain transition-transform group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="text-base font-semibold text-gray-800">
                    {nombre}
                </h3>

                <p className="text-lg font-bold text-amber-600">
                    {formatearDinero(precio)}
                </p>

                {botonAgregar && (
                    <button
                        onClick={() => guardarProducto(producto)}
                        className="mt-auto rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 hover:cursor-pointer"
                    >
                        Agregar
                    </button>
                )}

                {botonDisponible && (
                    <button
                        onClick={() => agotarProducto(producto.id)}
                        className={`
                                mt-auto flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold
                                transition-all duration-200 active:scale-95 hover:cursor-pointer
                                ${producto.disponible
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-red-600 text-white hover:bg-red-700'
                            }
                        `}
                    >
                        {producto.disponible ? (
                            <>
                                <span>Deshabilitar producto</span>
                            </>
                        ) : (
                            <>
                                <span>Habilitar producto</span>

                            </>
                        )}
                    </button>
                )}


            </div>
        </div>

    );
}
