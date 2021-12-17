import React, { useContext } from "react";
import ReactLoading from "react-loading";
import { ThemeContext } from "styled-components";
import SC from "../../themes/styledComponents";

export default function Loader({ type }) {
  const themeContext = useContext(ThemeContext);

  return (
    <SC.Loader className={"loader-" + type}>
      <ReactLoading type={"bars"} color={themeContext.colors.primaryColor} />
    </SC.Loader>
  );
}
