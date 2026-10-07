import { createContext, useContext } from "react";

/** True while the whole deck is being rendered for PDF export / printing. */
export const PrintContext = createContext(false);

export const useIsPrinting = () => useContext(PrintContext);
