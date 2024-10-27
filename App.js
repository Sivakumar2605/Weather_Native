// App.js
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchWeather } from './WeatherService';

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      // Display an error message based on the issue
      if (err.response) {
        setError(`Error ${err.response.status}: Unable to retrieve weather data for "${city}". Please try again.`);
      } else {
        setError('Network error: Unable to reach the weather service. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Get Weather" onPress={handleFetchWeather} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text style={styles.temp}>{Math.round(weatherData.main.temp)}°C</Text>
          <Text style={styles.desc}>{weatherData.weather[0].description}</Text>
          <Text style={styles.info}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.info}>Wind Speed: {weatherData.wind.speed} m/s</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  desc: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#333',
  },
  info: {
    fontSize: 18,
    marginTop: 10,
  },
});
