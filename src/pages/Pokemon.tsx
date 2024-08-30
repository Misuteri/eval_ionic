import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonSearchbar
} from '@ionic/react';
import PokemonItem from '../components/PokemonItem';
import './Pokemon.css';

type Pokemon = {
  pokedex_id: number;
  generation: number;
  category: string;
  name: {
    fr: string;
    en: string;
    jp: string;
  };
  sprites: {
    regular: string;
    shiny: string | null;
    gmax: string | null;
  };
  types: {
    name: string;
    image: string;
  }[] | null;
  talents: {
    name: string;
    tc: boolean;
  }[] | null;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spe_atk: number;
    spe_def: number;
    vit: number;
  } | null;
  resistances: {
    name: string;
    multiplier: number;
  }[] | null;
  evolution: {
    pre: {
      pokedex_id: number;
      name: string;
      condition: string;
    }[] | null;
    next: {
      pokedex_id: number;
      name: string;
      condition: string;
    }[] | null;
    mega: {
      orbe: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }[] | null;
  } | null;
  height: string | null;
  weight: string | null;
  egg_groups: string[] | null;
  sexe: {
    male: number;
    female: number;
  } | null;
  catch_rate: number | null;
  level_100: number | null;
  formes: any | null;
};

const PokemonPage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetch('https://tyradex.vercel.app/api/v1/pokemon')
      .then(response => response.json())
      .then(data => {
        // Exclude MissinNo. from the data
        const filteredData = data.filter((pokemon: Pokemon) => pokemon.pokedex_id !== 0);
        setPokemons(filteredData);
        setFilteredPokemons(filteredData);
        extractTypes(filteredData);
      })
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }, []);

  const handleTypeChange = (value: string) => {
    if (value === 'all') { // Ligne modifiée pour réinitialiser les filtres
      setSelectedType('');
    } else {
      setSelectedType(value);
    }
  };

  const extractTypes = (pokemons: Pokemon[]) => {
    const typesSet = new Set<string>();
    pokemons.forEach(pokemon => {
      pokemon.types?.forEach(type => typesSet.add(type.name));
    });
    // Convert to array and sort alphabetically
    const sortedTypes = Array.from(typesSet).sort((a, b) => a.localeCompare(b)); // Ligne modifiée pour trier les types
    setTypes(sortedTypes);
  };

  const filterPokemons = () => {
    let results = pokemons;
  
    if (selectedType) {
      results = results.filter(pokemon => pokemon.types?.some(type => type.name === selectedType));
    }
    if (searchQuery) {
      results = results.filter(pokemon => 
        pokemon.name.fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.name.en.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPokemons(results);
  };
  

  useEffect(() => {
    filterPokemons();
  }, [selectedType, searchQuery]);
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokémon List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pokémon List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          value={searchQuery}
          onIonInput={e => setSearchQuery((e.target as HTMLInputElement).value)}
          debounce={0}
          placeholder="Rechercher un Pokémon"
        />
        <IonSelect
          value={selectedType}
          placeholder="Filtrer par Type"
          onIonChange={e => handleTypeChange(e.detail.value)}
        >
          <IonSelectOption value="all">Tous</IonSelectOption>
          {types.map(type => (
            <IonSelectOption key={type} value={type}>{type}</IonSelectOption>
          ))}
        </IonSelect>
        <IonGrid>
          <IonRow>
            {filteredPokemons.map(pokemon => (
              <IonCol size="12" size-md="6" size-lg="4" key={pokemon.pokedex_id}>
                <PokemonItem pokemon={pokemon} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PokemonPage;