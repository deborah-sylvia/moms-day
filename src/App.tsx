import React, { useState } from "react";
import MothersDay from "./components/MothersDay";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-rose-100 flex items-center justify-center p-4">
      <MothersDay />
    </div>
  );
}

export default App;
