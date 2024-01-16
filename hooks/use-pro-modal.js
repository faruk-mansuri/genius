import { create } from 'zustand';

export const useProModal = create((set) => {
  return {
    isModalOpen: false,
    onOpen: () => {
      set({ isModalOpen: true });
    },
    onClose: () => {
      set({ isModalOpen: false });
    },
  };
});
