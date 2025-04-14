import React, {useState} from "react";
import WeatherWidget from "./WeatherWidget/WeatherWidget";
import "./App.css"

function App() {

  // États contrôlés pour le formulaire, avec des valeurs par défauts
  const [cityInput, setCityInput] = useState("Paris");
  const [lang, setLang] = useState("fr");
  const [units, setUnits] = useState("metric");
  
  const [searchCity, setSearchCity] = useState("Paris"); // Ville utilisée dans le widget

  // Traductions de l’interface
  const translations = {
    fr: {
      title: "Widget Météo",
      placeholder: "Entrez une ville",
      search: "Rechercher",
      language: "Langue",
      unit: "Unité",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
    },
    en: {
      title: "Weather Widget",
      placeholder: "Enter a city",
      search: "Search",
      language: "Language",
      unit: "Unit",
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
    },
  };

  const t = translations[lang]; // Raccourci pour la langue sélectionnée

  // Action sur clic "Rechercher"
  const handleSearch = (e) => {
    e.preventDefault();
    if (cityInput.trim() !== "") {
      setSearchCity(cityInput.trim());
    }
  };

  return (
    <div className="app-container">
      <h1>{t.title}</h1>

      {/* Formulaire utilisateur */}
      <form onSubmit={handleSearch} className="weather-form">
        {/* Champ ville */}
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder={t.placeholder}
        />

        {/* Bouton Rechercher */}
        <button type="submit">{t.search}</button>

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

      {/* Widget météo dynamique avec traduction des labels*/}
      <WeatherWidget
      city={searchCity}
      lang={lang}
      units={units}
      labels={{
        temperature: lang === "fr" ? "Température" : "Temperature",
        humidity: lang === "fr" ? "Humidité" : "Humidity",
        clouds: lang === "fr" ? "Nuages" : "Clouds",
        conditions: lang === "fr" ? "Conditions" : "Conditions",
        feels_like: lang === "fr" ? "Ressentie" : "Feels like",
        wind: lang === "fr" ? "Vent" : "Wind",
        sunrise: lang === "fr" ? "Lever du soleil" : "Sunrise",
        sunset: lang === "fr" ? "Coucher du soleil" : "Sunset",
        loading: lang === "fr" ? "Chargement..." : "Loading...",
        error: lang === "fr" ? "Impossible de récupérer les données météo." : "Unable to fetch weather data.",
      }}/>
    </div>
  );
}
export default App;
