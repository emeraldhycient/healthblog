import { create } from "zustand";


interface GlobalStore {
    isAuthenticated: boolean;
    isModalOpen: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isVerified: boolean;
    setIsVerified: (isAuthenticated: boolean) => void;
    openModal: () => void;
    closeModal: () => void;
}
  
export const useGlobalStore = create<GlobalStore>((set) => ({
    isAuthenticated: false,
    isModalOpen: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated: isAuthenticated }),
    isVerified: true,
    setIsVerified: (isVerified) => set({ isVerified: isVerified }),
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false }),
}));

