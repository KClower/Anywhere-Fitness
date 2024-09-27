import { create } from 'zustand'
import zustymiddleware from 'zustymiddleware';


export const useAuthStore = create(zustymiddleware((set) => {
    return {
        user: null,
        isAuthenticated: false,
        logIn: (userId) => {
            set(() => ({
                user: userId,
                isAuthenticated: true
            }))
        },
        logOut: () => {
            set(() => ({
                user: null,
                isAuthenticated: false
            }))
        }
    }
}))
window.store = useAuthStore;
