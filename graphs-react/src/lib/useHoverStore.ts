import { create } from "zustand";

type HoverState = {
  hoveredItem: string | null;
  setHoveredItem: (Item: string | null) => void;
};

const useHoverStore = create<HoverState>((set) => ({
  hoveredItem: null,
  setHoveredItem: (item) => set({ hoveredItem: item }),
}));

export default useHoverStore;
