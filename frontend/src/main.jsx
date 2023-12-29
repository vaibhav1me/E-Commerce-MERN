import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className=" bg-primary min-w-[200px] h-[100vh] min-h-[20rem]">
      <App />
    </div>
  </React.StrictMode>
);
