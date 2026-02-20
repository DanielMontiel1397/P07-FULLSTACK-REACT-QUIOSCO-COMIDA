import {create} from 'zustand';
import {type  CategoriaSliceType, categoriasSlice } from './categoriasSlice';
import { devtools } from 'zustand/middleware';
import { authSlice, type AuthSliceType } from './authSlice';
import { notificacionSlice, type NotificacionSliceType } from './notificacionSlice';
import { pedidosSlice, type PedidoSliceType } from './pedidosSlice';

export const useAppStore = create<CategoriaSliceType & AuthSliceType & NotificacionSliceType & PedidoSliceType>()((devtools(
    ((...a) => ({
        ...categoriasSlice(...a),
        ...authSlice(...a),
        ...notificacionSlice(...a),
        ...pedidosSlice(...a)
    }))
)))