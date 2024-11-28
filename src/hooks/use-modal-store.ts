import { Case } from "@/schemas";
import { CaseRequest } from "@/schemas/Case";
import { create } from "zustand";

export type ModalType = "createServer" | "deletedocument" |"ChangeStatus";

interface ModalData {
  Case?: Case;
  Caserequest?: CaseRequest;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
