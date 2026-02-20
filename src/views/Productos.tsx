import Producto from "../components/Producto";
import Spinner from "../components/Spinner";
import { useProductos } from "../hooks/useProductos"

export default function Productos() {

  const { productos, isLoading } = useProductos();

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
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          Productos
        </h1>
        <p className="mt-3 max-w-xl text-lg text-gray-600">
          Administra los Productos desde aquí
        </p>
      </div>

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos disponibles en esta categoría
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productos.map(producto => (
            <Producto
              key={producto.id}
              producto={producto}
              botonAgregar={false}
              botonDisponible={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}
