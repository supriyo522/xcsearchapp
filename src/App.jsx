import React, { useState, useEffect } from "react";
import "./App.css"; // Importing the CSS file

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const filteredCountries = searchTerm.trim()
    ? countries.filter((country) =>
        country?.common?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

  return (
    <div className="app-container">
      <h1>Country Search App</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="countries-container">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div key={index} className="country-card">
              <img src={country?.png} alt={country?.common} />
              <p>{country?.common}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No matching countries found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
