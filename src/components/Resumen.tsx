import { formatearDinero } from "../helpers";
import { useAppStore } from "../stores/useAppStore";
import ProductoResumen from "./ProductoResumen";

export default function Resumen() {
  const pedidos = useAppStore(state => state.pedido);
  const enviarPedido = useAppStore(state => state.crearOrden);

  const totalPedido = pedidos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <aside className="w-full bg-gray-100 h-full flex flex-col">
      
      <div className="p-6 bg-white shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800">
          🧾 Resumen del pedido
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Revisa los productos antes de confirmar
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {pedidos.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center shadow">
            <p className="text-gray-500">
              Aún no hay productos en el pedido
            </p>
          </div>
        ) : (
          pedidos.map(producto => (
            <ProductoResumen
              key={producto.id}
              producto={producto}
            />
          ))
        )}
      </div>

      <div className="p-6 bg-white shadow-inner">
        <div className=" bg-indigo-500  text-white rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-bold">{formatearDinero(totalPedido)}</span>
          </div>
        </div>

        <button
          disabled={pedidos.length === 0}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-lg font-bold py-2 rounded-xl transition hover:cursor-pointer"
          onClick={() => enviarPedido(pedidos, totalPedido)}
        >
          Confirmar pedido
        </button>
      </div>

    </aside>
  );
}
