import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface GenerateSlip {
  items: any;
  addPrint: (data: any) => void;
}

const useGeneratePrint = create(
  persist<GenerateSlip>(
    (set, get) => ({
      items: [],
      addPrint: (data: any) => {
        set({ items: [...get().items, data] });
        // toast.success("Ready for print");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGeneratePrint;
