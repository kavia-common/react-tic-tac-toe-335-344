import React from "react";
import "./App.css";
import "./styles/theme.css";
import "./styles/app.css";
import Game from "./components/Game";

// PUBLIC_INTERFACE
function App() {
  // The root app renders the Game and handles overall theming.
  // The default light theme is set via CSS. Theme toggling can be added as needed.
  return (
    <div className="App" data-theme="light" style={{ minHeight: "100vh" }}>
      <Game />
    </div>
  );
}

export default App;
