import { create } from "zustand";


type ModalState<T> = {
  isOpen: boolean;
  data: T | null;
  openModal: (data: T) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState<any>>((set) => ({
  isOpen: false,
  data: null,
  openModal: (data) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false, data: null }),
}));
