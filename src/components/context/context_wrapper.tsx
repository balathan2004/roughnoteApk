import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "@/src/redux/api/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllNotes } from "@/src/db";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { changeAccessToken, addDocs } = useAuth();

  const getLoginCred = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      changeAccessToken(token);
    }
  };

  const fetchLocalNotes = async () => {
    const localNotes = await getAllNotes();
    addDocs(localNotes);
  };

  useEffect(() => {
    getLoginCred();
    fetchLocalNotes();
  }, []);

  return <>{children}</>;
};

export default ContextWrapper;
