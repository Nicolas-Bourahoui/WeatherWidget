import React, {useState} from "react";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import "./App.css"

function App() {

  // États contrôlés pour le formulaire, avec des valeurs par défauts
  const [city, setCity] = useState("Paris");
  const [lang, setLang] = useState("fr");
  const [units, setUnits] = useState("metric");

  return (
    <div className="app-container">
      <h1>Widget Météo</h1>

      {/* Formulaire utilisateur */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="weather-form"
      >
        {/* Champ ville */}
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Entrez une ville"
        />

        {/* Choix langue */}
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>

        {/* Choix unité */}
        <select value={units} onChange={(e) => setUnits(e.target.value)}>
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
      </form>

      {/* Widget météo dynamique */}
      <WeatherWidget city={city} lang={lang} units={units} />
    </div>
  );
}
export default App;
