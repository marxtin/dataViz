import { create } from "zustand";

type WindowSizeState = {
  width: number | undefined;
  height: number | undefined;
  setDimensions: (width: number, height: number) => void;
};

const useWindowSizeStore = create<WindowSizeState>((set) => ({
  width: typeof window !== "undefined" ? window.innerWidth : undefined,
  height: typeof window !== "undefined" ? window.innerHeight : undefined,
  setDimensions: (width, height) =>
    set({ width: width, height: height }),
}));

if (typeof window !== "undefined") {
  // Only run this on the client side
  window.addEventListener("resize", () => {
    useWindowSizeStore
      .getState()
      .setDimensions(window.innerWidth, window.innerHeight);
  });
}

export default useWindowSizeStore;
