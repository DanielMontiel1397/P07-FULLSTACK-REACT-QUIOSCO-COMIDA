import {createBrowserRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import Inicio from './views/Inicio';
import AuthLayout from './layouts/AuthLayout';
import Login from './views/Login';
import Registro from './views/Registro';
import AdminLayout from './layouts/AdminLayout';
import Ordenes from './views/Ordenes';
import Productos from './views/Productos';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Inicio/>
            }
        ]
    },

    //ROUTER PARA AUTENTICACIÓN, LOGIN Y REGISTER
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Registro/>
            }
        ]
    },

    //Route para usuario Administrador
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element:<Ordenes/>
            },
            {
                path: '/admin/productos',
                element: <Productos/>
            }
        ]
    }
]);

export default router;