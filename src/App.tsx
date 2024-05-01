import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./lib/utils/init";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { router } from "./router";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default App;
