import defaultTheme_Green from "../themes/defaultTheme_Green";
import defaultTheme_Yellow from "../themes/defaultTheme_Yellow";
import defaultTheme_Aqua from "../themes/defaultTheme_Aqua";
import purpleTheme from "../themes/purpleTheme";

export function findTheme(theme) {
  switch (theme) {
    case "default green":
      return defaultTheme_Green;
    case "default yellow":
      return defaultTheme_Yellow;
    case "default aqua":
      return defaultTheme_Aqua;
    case "purple":
      return purpleTheme;
    default:
      return defaultTheme_Green;
  }
}
