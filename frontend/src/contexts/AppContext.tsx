import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import * as clientApi from "../api-client"


type ToastMessage = {
  message: string | AxiosError;
  type: "SUCCESS" | "ERROR";
}

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn:boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
const {isError}=useQuery("validateToken",clientApi.validateToken,{
  retry:false
})
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn:!isError
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
