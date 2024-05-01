import { ErrorSvg } from "@src/components/icons/ErrorSvg";
import React from "react";

export const NotFound = () => {
  const goBackToDashboard = () => {
    window.location.href = "/";
  };
  return (
    <div id="errorMain">
      <p id="errorText">Uh-oh! Something broke.</p>
      <ErrorSvg />
      <button id="errorLink" onClick={goBackToDashboard}>
        Go Back Home
      </button>
    </div>
  );
};
