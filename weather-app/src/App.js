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

    // Fonction pour changer le fond en fonction du type de météo
    const updateBackground = (weatherType) => {
      const body = document.body;
      if (weatherType === "Clear") {
        body.style.background = "linear-gradient(135deg, #FFB75E, #ED8F03)";
      } else if (weatherType === "Clouds") {
        body.style.background = "linear-gradient(135deg, #B3B3B3, #777777)";
      } else if (weatherType === "Rain") {
        body.style.background = "linear-gradient(135deg, #00BFFF, #4682B4)";
      } else if (weatherType === "Snow") {
        body.style.background = "linear-gradient(135deg, #F0F8FF, #B0E0E6)";
      } else if (weatherType === "Thunderstorm") {
        body.style.background = "linear-gradient(135deg, #333333, #000000)";
      } else {
        body.style.background = "linear-gradient(135deg, #E6E6E6, #A9A9A9)";
      }
    };

  return (
    <div className="app-container">
      <h1>{t.title}</h1>

      {/* Formulaire utilisateur */}
      <form onSubmit={handleSearch} className="weather-form">
        {/* Champ ville */}
        <input
          type="search"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder={t.placeholder}
          aria-label={t.search}
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
      }}
      onWeatherTypeChange={updateBackground}/>
    </div>
  );
}
export default App;
