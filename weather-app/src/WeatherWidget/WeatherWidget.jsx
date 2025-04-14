import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./WeatherWidget.module.css";


// Clé API OpenWeatherMap
const API_KEY = "a0fcfa9c5f6bbe98ab9a91e9f8e40266";

/**
 * Composant WeatherWidget
 * @param {string} city - Nom de la ville
 * @param {string} lang - Langue de la réponse ('fr' ou 'en')
 * @param {string} units - Unités de température ('metric' pour °C, 'imperial' pour °F)
 */


const WeatherWidget = ({city, lang = "fr", units = "metrics", labels, onWeatherTypeChange }) => {
  // States pour stocker les données météo, le chargement et les erreurs
  const [weather, setWeather]  = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]  = useState("");

  // Pour convertir les timestamp UNIX en heure
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString(lang === "fr" ? "fr-FR" : "en-US" , {hour: "2-digit", minute: "2-digit",})
  };

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

  // On passe le type de météo à App.js
  onWeatherTypeChange(weather.weather[0].main);
   
  // Unité à afficher
  const temperatureUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "km/h" : "mph";


  return (
    <div className={styles.widget}>

      {/* Image en fonction de la météo */}
      <div className={styles.iconWrapper}>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className={styles.weatherIcon}
        />
      </div>

      {/* Nom de la ville */}
      <h2 className={styles.city}>{weather.name}</h2>

      {/* Température */}
      <p className={styles.temp}>
        {labels.temperature} : {Math.round(weather.main.temp)}{temperatureUnit}
      </p>
      <p className={styles.temp}>
        {labels.feels_like} : {Math.round(weather.main.feels_like)}{temperatureUnit}
      </p>

      {/* Description des conditions météo (ex: "nuageux") */}
      <p> {labels.conditions} : {weather.weather[0].description}</p>

      {/* Humidité en pourcentage */}
      <p> {labels.humidity} : {weather.main.humidity}%</p>

      {/* Couverture nuageuse en pourcentage */}
      <p> {labels.clouds} : {weather.clouds.all}%</p>

      {/* Vitesse du vent */}  
      <p> {labels.wind} : {(weather.wind.speed * (units === "metric" ? 3.6 : 1)).toFixed(1)} {windUnit}</p>
      
      {/* Heure du lever de soleil */}
      <p> {labels.sunrise} : {formatTime(weather.sys.sunrise)}</p>
     
      {/* Heure du coucher de soleil */}
      <p> {labels.sunset} : {formatTime(weather.sys.sunset)}</p>
    </div>
  );
};

export default WeatherWidget;