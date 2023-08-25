import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppDataContext = createContext();

const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({});

  return (
    <AppDataContext.Provider
      value={{
        appData,
        setAppData: (newData) => setAppData({ ...appData, ...newData }),
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
