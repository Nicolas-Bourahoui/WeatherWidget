import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./WeatherWidget.css";


// Clé API OpenWeatherMap
const API_KEY = "a0fcfa9c5f6bbe98ab9a91e9f8e40266";

/**
 * Composant WeatherWidget
 * @param {string} city - Nom de la ville
 * @param {string} lang - Langue de la réponse ('fr' ou 'en')
 * @param {string} units - Unités de température ('metric' pour °C, 'imperial' pour °F)
 */


const WeatherWidget = ({city, lang = "fr", units = "metrics" }) => {
  // States pour stocker les données météo, le chargement et les erreurs
  const [weather, setWeather]  = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]  = useState("");

  // Effet à chaque changement de paramètres
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Effet de chargement
      try {
        // URL de l'API 
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=${lang}&units=${units}`;
        // Requête axios
        const response = await axios.get(url);
        // On stocke les données dans l'état
        setWeather(response.data);
        setError(""); // Pas d'erreur
      } catch (err) {
        // En cas d’erreur (ville introuvable, etc.)
        setError("Impossible de récupérer les données météo.");
        setWeather(null);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchWeather();
  }, [city, lang, units]);

  // Gestion de l'affichage en fonction de l'état de chargement ou d'erreur
  if (loading) return <div className={styles.widget}>Chargement...</div>;
  if (error) return <div className={styles.widget}>{error}</div>;
  if (!weather) return null;

  // Unité de température à afficher
  const temperatureUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className={styles.widget}>
      {/* Nom de la ville */}
      <h2 className={styles.city}>{weather.name}</h2>

      {/* Température principale */}
      <p className={styles.temp}>
        Température : {Math.round(weather.main.temp)}{temperatureUnit}
      </p>

      {/* Description des conditions météo (ex: "nuageux") */}
      <p>Conditions : {weather.weather[0].description}</p>

      {/* Humidité en pourcentage */}
      <p>Humidité : {weather.main.humidity}%</p>

      {/* Couverture nuageuse en pourcentage */}
      <p>Nuages : {weather.clouds.all}%</p>
    </div>
  );
};

export default WeatherWidget;