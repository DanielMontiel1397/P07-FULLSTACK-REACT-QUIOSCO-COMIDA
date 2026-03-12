import { formatearDinero } from "../helpers"
import { useAppStore } from "../stores/useAppStore"
import ProductoResumen from "./ProductoResumen"

type ResumenProps = {
  resumenOpen: boolean
  setResumenOpen: (value: boolean) => void
}

export default function Resumen({ resumenOpen, setResumenOpen }: ResumenProps) {

  const pedidos = useAppStore(state => state.pedido)
  const enviarPedido = useAppStore(state => state.crearOrden)

  const totalPedido = pedidos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  )

  return (
    <>

      {resumenOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setResumenOpen(false)}
        />
      )}

      <aside
        className={`
            fixed right-0 top-0 z-40 h-full bg-gray-100 flex flex-col
            transform transition-transform duration-300
            w-full md:w-80
            ${resumenOpen ? "translate-x-0" : "translate-x-full"}
            md:relative md:translate-x-0
            `}
      >

        <button
          onClick={() => setResumenOpen(false)}
          className="absolute right-4 top-2 md:hidden"
        >
          ✕
        </button>

        <div className="md:p-6 p-4 bg-white shadow-sm">
          <h2 className="md:text-2xl text-xl font-bold text-gray-800">
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
          <div className="bg-indigo-500 text-white rounded-xl md:p-4 p-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="md:text-2xl text-xl font-bold">
                {formatearDinero(totalPedido)}
              </span>
            </div>
          </div>

          <button
            disabled={pedidos.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white md:text-lg text-md font-bold py-2  rounded-xl transition hover:cursor-pointer"
            onClick={() => enviarPedido(pedidos, totalPedido)}
          >
            Confirmar pedido
          </button>
        </div>

      </aside>
    </>
  )
}