"use client";

import { createContext, useState } from "react";
export const SnipppetContext = createContext(null);
const SnippetContextProvider = ({ children }) => {
  const [openSnippetDialog, setOpenSnippetDialog] = useState(false);
  const [snippetEditValue, setSnippetEditValue] = useState(null);

  return (
    <SnipppetContext.Provider
      value={{
        openSnippetDialog,
        setOpenSnippetDialog,
        snippetEditValue,
        setSnippetEditValue,
      }}
    >
      {children}
    </SnipppetContext.Provider>
  );
};

export default SnippetContextProvider;
