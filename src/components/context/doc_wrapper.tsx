import React, { useState, useContext, FC, useEffect } from "react";
import { Doc } from "../interfaces";
import { storeData } from "../credStore";

interface DocContextType {
  docData: Doc[];
  setDocData: React.Dispatch<React.SetStateAction<Doc[]>>;
}

interface Props {
  children: React.ReactNode;
}

export const DocDataContext = React.createContext<DocContextType>({
  docData: [],
  setDocData: () => {},
});

const DocDataHolder: FC<Props> = ({ children }) => {
  const [docData, setDocData] = useState<Doc[]>([]);

  useEffect(() => {
    async function storeLocal() {
      if (docData) {
        await storeData("doc_data", docData);
      }
    }
    storeLocal();
  }, [docData]);

  return (
    <DocDataContext.Provider value={{ docData, setDocData }}>
      {children}
    </DocDataContext.Provider>
  );
};

export const useDocContext = () => useContext(DocDataContext);

export default DocDataHolder;
