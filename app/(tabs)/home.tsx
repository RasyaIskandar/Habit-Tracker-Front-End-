import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import axios from 'axios';

export default function JokeScreen() {
  const [joke, setJoke] = useState<string>('');

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single'); // atau type=twopart
      if (response.data.type === 'single') {
        setJoke(response.data.joke);
      } else {
        setJoke(`${response.data.setup}\n\n${response.data.delivery}`);
      }
    } catch (error) {
      console.error('Failed to fetch joke:', error);
      setJoke('Error fetching joke.');
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={tw`flex-1 bg-white justify-center items-center p-4`}>
      <Text style={tw`text-lg text-center mb-6`}>{joke}</Text>
      <TouchableOpacity onPress={fetchJoke} style={tw`bg-blue-500 px-4 py-2 rounded`}>
        <Text style={tw`text-white`}>Get Another Joke</Text>
      </TouchableOpacity>
    </View>
  );
}
