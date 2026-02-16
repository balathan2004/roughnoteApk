import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "@/src/redux/api/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { changeAccessToken } = useAuth();

  const getLoginCred = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      changeAccessToken(token);
    }
  };

  useEffect(() => {
    getLoginCred();
  }, []);

  return <>{children}</>;
};

export default ContextWrapper;
