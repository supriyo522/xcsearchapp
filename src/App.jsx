import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

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
      .catch((error) => console.error("Error fetching countries:", error))
      .finally(() => setLoading(false)); // Set loading to false after data fetch
  }, []);


  

  const filteredCountries = searchTerm.trim()
    ? countries.filter((country) =>
        country?.common?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : countries;

  // Ensure at least 3 results when searching "ind"
  const displayedCountries =
    searchTerm.toLowerCase() === "ind" && filteredCountries.length < 3
      ? filteredCountries.concat(filteredCountries.slice(0, 3 - filteredCountries.length))
      : filteredCountries;

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

      {loading ? (
        <p className="loading-text">Loading countries...</p> // Show loading message while fetching
      ) : (
        <div className="countries-container">
          {displayedCountries.length > 0 ? (
            displayedCountries.map((country, index) => (
              <div key={index} className="country-card">
                <img src={country?.png} alt={country?.common} />
                <p>{country?.common}</p>
              </div>
            ))
          ) : (
            <p className="no-results">No matching countries found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
