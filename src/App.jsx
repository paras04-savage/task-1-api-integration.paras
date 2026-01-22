import { useState } from "react";
import "./App.css";
import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      );

      if (!res.ok) throw new Error("City not found");

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>
          <p>{weather.main.temp} °C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;