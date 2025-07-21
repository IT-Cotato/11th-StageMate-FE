import {create} from 'zustand';

interface ModalState {
  showCameraModal: boolean;
  setShowCameraModal: (show: boolean) => void;
}

const useModalStore = create<ModalState>((set) => ({
  showCameraModal: false,
  setShowCameraModal: (show) => set({showCameraModal: show}),
}));

export default useModalStore;
