import { Theme } from "@react-navigation/native"; // Import Theme type
import { fonts } from "./../node_modules/@react-navigation/native/src/theming/fonts"; // Import fonts or define your own fonts object


export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)", // Dark blue
    background: "rgb(0, 0, 0)", // Black
    card: "rgb(18, 18, 18)", // Dark card
    text: "rgb(229, 229, 231)", // Light text
    border: "rgb(255, 255, 255)", // Dark border
    notification: "rgb(145, 142, 142)", // Red notification
  },
  fonts, // Keep consistent font structure
};