import defaultTheme_Green from "../themes/defaultTheme_Green";
import defaultTheme_Yellow from "../themes/defaultTheme_Yellow";
import defaultTheme_Aqua from "../themes/defaultTheme_Aqua";
import defaultTheme_Red from "../themes/defaultTheme_Red";
import lightTheme_Green from "../themes/lightTheme_Green";
import outrunTheme from "../themes/outrunTheme";

export function findTheme(theme) {
  switch (theme) {
    case "default green":
      return defaultTheme_Green;
    case "light green":
      return lightTheme_Green;
    case "default yellow":
      return defaultTheme_Yellow;
    case "default aqua":
      return defaultTheme_Aqua;
    case "default red":
      return defaultTheme_Red;
    case "outrun":
      return outrunTheme;
    default:
      return defaultTheme_Green;
  }
}
