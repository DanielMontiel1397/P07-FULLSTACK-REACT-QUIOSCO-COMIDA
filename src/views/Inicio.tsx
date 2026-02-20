import Producto from "../components/Producto";
import Spinner from "../components/Spinner";
import { useProductos } from "../hooks/useProductos";
import { useAppStore } from "../stores/useAppStore"

export default function Inicio() {
  const categoriaActual = useAppStore(state => state.categoriaActual);
  const { productos, isLoading, error } = useProductos();

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <p className="py-20 text-center text-lg font-semibold text-red-500">
        Error al cargar los productos
      </p>
    );
  }

  const productosFiltrados = categoriaActual
    ? productos.filter(
      producto => producto.categoria_id === categoriaActual.id && producto.disponible
    )
    : [];

  return (
    <div className="space-y-10">
      
      <div className="rounded-3xl bg-linear-to-r from-indigo-50 to-purple-50 p-8 shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
          {categoriaActual?.nombre}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-gray-600">
          Selecciona tus productos favoritos y agrégalos a tu pedido.
        </p>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay productos disponibles en esta categoría
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productosFiltrados.map(producto => (
            <Producto
              key={producto.id}
              producto={producto}
              botonAgregar={true}
              botonDisponible={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

