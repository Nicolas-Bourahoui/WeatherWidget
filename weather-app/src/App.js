import React from "react";
import WeatherWidget from "./WeatherWidget/WeatherWidget";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <WeatherWidget city="Paris" lang="fr" units="metric" />
      <WeatherWidget city="New York" lang="en" units="imperial" />
    </div>
  );
}
export default App;
