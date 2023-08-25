import { ReactNode, createContext, useState } from "react";
import PropTypes from "prop-types";

type Context = {
  showAllParks: boolean;
};

type ContextType = {
  appData: Context
  setAppData: (newData: Partial<Context>) => void
};

const defaultContextValue = {
  showAllParks: true,
};

export const AppDataContext = createContext<ContextType>({ appData: defaultContextValue, setAppData: () => {} });

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [appData, setAppData] = useState<Context>(defaultContextValue);

  const value: ContextType = {
    appData,
    setAppData: (newData: Partial<Context>) =>
      setAppData({ ...appData, ...newData }),
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
