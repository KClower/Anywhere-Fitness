import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import zustymiddleware from 'zustymiddleware';


export const useAuthStore = create(persist((set) => {
    return {
        user: null,
        isAuthenticated: false,
        isInstructor: null,
        logIn: (userId, isInstructor) => {
            set(() => ({
                user: userId,
                isAuthenticated: true,
                isInstructor,
            }))
        },
        logOut: () => {
            set(() => ({
                user: null,
                isAuthenticated: false,
                isInstructor: null,
            }))
        }
    }
}))
window.store = useAuthStore;
