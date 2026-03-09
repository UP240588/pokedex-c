import { useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react'
import { View, Text } from 'react-native';

interface Pokemon{
  name:string;
}

export default function PokemonDetailsScreen() {
  const [pokemon,   setPokemon] = React.useState<Pokemon | null>(null);
  const params = useLocalSearchParams();
  const { name } = params;

  useEffect(() => {
    console.log("Entre en pantalla de detalles");
    if (name) {
      getPokemon();
    }
  }, [name]);

  const getPokemon = async () => {
        try {
        const URL = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
        const response = await fetch(URL, {
            method: "GET",
        });
        if (response.ok) {
            const data = await response.json();
            setPokemon(data);
        } else {
            console.log("bad request");
        }
        } catch (error) {
        console.log("error en la consulta");
        }
    };


    if (!pokemon) {
        return (
        <View>
            <Text>Cargando pokemon.</Text>
        </View>
        );
    }

    return (
        <View>
        <Text>{pokemon.name}</Text>
        <Text>{JSON.stringify(pokemon)}</Text>
        </View>
    )
}