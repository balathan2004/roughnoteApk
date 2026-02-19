import { FC, ReactNode, useEffect } from "react";
import { useAuth } from "@/src/redux/api/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllNotes, getDB, updateDoc } from "@/src/db";
import { useGetAllDocsQuery } from "@/src/redux/api/docsApi";
import { Doc } from "../interfaces";

const ContextWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { changeAccessToken, addDocs, user } = useAuth();
  const { data: { data: docsData } = {} } = useGetAllDocsQuery({});

  const getLoginCred = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      changeAccessToken(token);
    }
  };

  const fetchLocalNotes = async () => {
    const db = await getDB();
    if (docsData) {
      console.log("syncing local notes with server data...", docsData.length);
      await db.withTransactionAsync(async () => {
        for (const doc of docsData) {
          await updateDoc(doc);
        }
      });
    }

    const localNotes = await getAllNotes();
    addDocs(localNotes);
  };

  useEffect(() => {
    getLoginCred();
    fetchLocalNotes();
  }, [docsData]);

  return <>{children}</>;
};

export default ContextWrapper;
