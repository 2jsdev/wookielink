import { create } from 'zustand';

interface MobilePreviewStore {
  isOpen: boolean;
  openPreview: () => void;
  closePreview: () => void;
}

const useMobilePreviewStore = create<MobilePreviewStore>((set) => ({
  isOpen: false,
  openPreview: () => set({ isOpen: true }),
  closePreview: () => set({ isOpen: false }),
}));

export default useMobilePreviewStore;
