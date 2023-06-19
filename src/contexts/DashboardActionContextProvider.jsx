import { createContext, useContext, useState } from "react";

const actionContext = createContext({
  onEdit: 0,
  setOnEdit: () => {},
  permission: {
    adminPermission : ["admin"],
    ManagerPermission : ["admin", "manager"],
    foodPermission : ["admin", "foodmod", "manager"],
    orderPermission : ["admin", "ordermod", "foodmod", "manager"]
  },
});

export const DashboardActionContextProvider = ({ children }) => {
  const [onEdit, setOnEdit] = useState(0);
  const permission = {
    adminPermission : ["admin"],
    ManagerPermission : ["admin", "manager"],
    foodPermission : ["admin", "foodmod", "manager"],
    orderPermission : ["admin", "ordermod", "foodmod", "manager"]
  }

  return (
    <actionContext.Provider
      value={{
        onEdit,
        setOnEdit,
        permission
      }}
    >
      {children}
    </actionContext.Provider>
  );
};

export const useDashboardActionContext = () => useContext(actionContext);
