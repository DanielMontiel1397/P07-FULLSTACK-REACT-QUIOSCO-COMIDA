import Spinner from "../components/Spinner";
import { formatearDinero } from "../helpers";
import { usePedidos } from "../hooks/usePedidos"
import { useAppStore } from "../stores/useAppStore";


export default function Ordenes() {

  const completarPedido = useAppStore(state => state.completarPedido);

  const { pedidos, isLoading } = usePedidos();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    )
  }

 return (
  <div className="space-y-10">


    <div className="rounded-3xl bg-linear-to-r from-indigo-50 to-purple-50 p-8 shadow-sm">
      <h1 className="text-4xl font-extrabold text-gray-800">
        Órdenes
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Administra las órdenes activas del sistema
      </p>
    </div>

    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">

      {pedidos.length === 0 && (
        <p className="text-center text-gray-500">
          Aún no hay pedidos
        </p>
      )}

      {pedidos.map(pedido => (
        <div
          key={pedido.id}
          className="rounded-3xl bg-white shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col gap-6"
        >
     
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-slate-700">
              Pedido #{pedido.id}
            </p>

            <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
              Pendiente
            </span>
          </div>

     
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase text-gray-500">
              Productos
            </p>

            <div className="divide-y divide-gray-200">
              {pedido.productos.map(producto => (
                <div
                  key={producto.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {producto.nombre}
                    </p>
                    <p className="text-gray-500">
                      ID: {producto.id}
                    </p>
                  </div>

                  <span className="font-bold text-indigo-600">
                    x{producto.pivot.cantidad}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-500">
              Cliente
            </p>
            <p className="font-medium text-gray-800">
              {pedido.user.name}
            </p>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-lg font-bold text-gray-700">
              Total
            </p>
            <p className="text-2xl font-extrabold text-amber-600">
              {formatearDinero(pedido.total)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => completarPedido(pedido.id)}
            className="mt-2 w-full rounded-xl bg-green-600 py-3 text-lg font-bold text-white transition hover:bg-green-700 active:scale-95 hover:cursor-pointer"
          >
            Completar orden
          </button>
        </div>
      ))}
    </div>

  </div>
);

}
