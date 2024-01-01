import React from "react";
import "ag-grid-enterprise";
import Grid from "./components/Grid";
import "./index.css";

export default function App() {
  return (
    <div className="p-20 space-y-3 mx-auto max-w-7xl">
      <h1 className="text-4xl font-semibold">AgGrid Example</h1>
      <Grid />
    </div>
  );
}
