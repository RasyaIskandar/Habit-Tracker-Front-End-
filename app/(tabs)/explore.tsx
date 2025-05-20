import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import axios from 'axios';

interface WeatherData {
  time: string;
  temperature: number;
}

export default function Explore() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        'https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m'
      );

      const times: string[] = response.data.hourly.time;
      const temps: number[] = response.data.hourly.temperature_2m;

      // Gabungkan waktu dan temperatur jadi satu array objek
      const data: WeatherData[] = times.map((time, index) => ({
        time,
        temperature: temps[index],
      }));

      setWeatherData(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`text-2xl font-bold p-4`}>London Hourly Temperature</Text>
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.time}
        renderItem={({ item }) => (
          <View style={tw`p-4 border-b border-gray-200`}>
            <Text style={tw`text-lg font-semibold text-gray-800`}>{item.time}</Text>
            <Text style={tw`text-gray-600`}>Temperature: {item.temperature} °C</Text>
          </View>
        )}
      />
    </View>
  );
}
