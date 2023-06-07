import { createContext, useContext, useState } from "react";

const actionContext = createContext({
  onEdit: 0,
  setOnEdit: () => {},
});

export const DashboardActionContextProvider = ({ children }) => {
  const [onEdit, setOnEdit] = useState(0);

  return (
    <actionContext.Provider
      value={{
        onEdit,
        setOnEdit,
      }}
    >
      {children}
    </actionContext.Provider>
  );
};

export const useDashboardActionContext = () => useContext(actionContext);
