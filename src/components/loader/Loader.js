import React from "react";
import ReactLoading from "react-loading";

export default function Loader({ type }) {
  return (
    <div className={"loader-" + type}>
      <ReactLoading type={"bars"} color={"#4bb44b"} />
    </div>
  );
}
