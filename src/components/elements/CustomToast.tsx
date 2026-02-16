import Toast from "react-native-simple-toast";

const CustomToast = (message: string) => {
  Toast.show(message||"", Toast.LONG);
};

export default CustomToast;
