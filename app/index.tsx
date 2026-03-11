import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native";

interface Pokemon{ //agg interfaz, tipado
  name: string;
  url: string;
}

export default function Index() {
  const [results, setResults] = useState<Pokemon[]> ([]);



  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    const response = await fetch(URL, {   //fetch jalar informacion
      method: "GET",
    }); 

    if (response.ok) {
      const data = await response.json();  //json convertir a objeto
      setResults(data.results);
    } else {
      console.log("Bad request"); 
    }
  } catch (error) {
    console.log("Ocurrió un error");
  }
}; 



//funcion para filtrar o buscar el pokemon por letras
const filterPokemon = (text: string) => {

  if (text === "") {
    getPokemons();
    return;
  }
  const arrayFiltered = results.filter((pokemon) => pokemon.name.includes(text));
  setResults(arrayFiltered);
}

  return (
    <ScrollView>
      {/* Input */}
      <TextInput 
      placeholder="Escribe el nombre del Pokémon que quieres buscar"
      onChangeText={filterPokemon}
      />
        
      {results.map((item)=>{
        return (<PokemonCard 
                  key ={item.name} 
                  name ={item.name}
                  url ={item.url}
                ></PokemonCard>
               );
      })}
    </ScrollView>
  );
}


//hola prueba