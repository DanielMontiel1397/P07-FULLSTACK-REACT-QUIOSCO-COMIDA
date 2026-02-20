import type { StateCreator } from "zustand";
import type { NotificacionType } from "../types";


export type NotificacionSliceType = {
    notificacion: NotificacionType;
    mostrarNotificacion: (payload: Pick<NotificacionType, 'mensaje' | 'error'>) => void
    cerrarNotificacion: () => void
}

export const notificacionSlice : StateCreator<NotificacionSliceType> = (set) => ({
    notificacion: {
        mensaje: '',
        error: false
    },

    mostrarNotificacion: (payload) => {
        set({
            notificacion: {
                mensaje: payload.mensaje,
                error: payload.error
            }
        });

        setTimeout(() => {
            set({
                notificacion: {
                    mensaje: '',
                    error: false
                }
            })
        }, 5000);
    },

    cerrarNotificacion: () => {
        set({
            notificacion: {
                mensaje: '',
                error: false
            }
        })
    }
})