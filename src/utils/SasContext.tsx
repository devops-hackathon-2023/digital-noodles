import React, {createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {PageResponseSasResponse, SasResponse} from "@/utils/types";
import useFetch from "@/utils/useFetch";

interface SasContextProps {
  selectedSas: SasResponse | undefined;
  handleSas: (sas: SasResponse) => void;
  allSasResponses: SasResponse[] | undefined;
  isLoading: boolean;
}

const SasContext = createContext<SasContextProps>({
  isLoading: false,
  selectedSas: undefined,
  handleSas(sas: SasResponse): void {
  },
  allSasResponses: undefined,
});

export const SasProvider: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const {
    data,
    isLoading
  } = useFetch<PageResponseSasResponse>("sases");

  const [selectedSas, setSas] = useState<SasResponse>();
  const [allSasResponses, setAllSasResponses] = useState<SasResponse[]>();

  const handleSas = useCallback((newSelectedSas: SasResponse) => {
    setSas(newSelectedSas)
  }, [])

  useEffect(() => {
    if (data) {
      setSas(data.page[0]);
      setAllSasResponses(data.page);
    }
  }, [data]);

  return (
    <SasContext.Provider value={{
      selectedSas,
      handleSas,
      allSasResponses,
      isLoading
    }}>
      {children}
    </SasContext.Provider>
  );
};

export const useSas = () => {
  return useContext(SasContext);
};