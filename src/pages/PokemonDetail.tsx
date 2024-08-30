// src/pages/PokemonDetail.tsx
import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel
} from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';

type PokemonDetailParams = {
  id: string;
};

type PokemonDetail = {
  pokedex_id: number;
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
};

const PokemonDetail: React.FC = () => {
  const { id } = useParams<PokemonDetailParams>();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setPokemon(data))
      .catch(error => console.error('Error fetching Pokémon data:', error));
  }, [id]);

  const handlePrevious = () => {
    if (pokemon?.pokedex_id > 1) {
      history.push(`/pokemon/${pokemon.pokedex_id - 1}`);
    }
  };

  const handleNext = () => {
    if (pokemon) {
      history.push(`/pokemon/${pokemon.pokedex_id + 1}`);
    }
  };

  const handleBackToList = () => {
    history.push('/Pokemon');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pokemon?.name.fr}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {pokemon && (
          <IonCard>
            <img src={pokemon.sprites.regular} alt={`Image of ${pokemon.name.fr}`} />
            <IonCardHeader>
              <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
              {pokemon.types && (
                <IonCardSubtitle>
                  Types: {pokemon.types.map(type => (
                    <img
                      key={type.name}
                      src={type.image}
                      alt={type.name}
                      style={{ width: '20px', height: '20px', marginRight: '5px' }}
                    />
                  ))}
                </IonCardSubtitle>
              )}
            </IonCardHeader>
            <IonCardContent>
              {pokemon.resistances && pokemon.resistances.length > 0 && (
                <div>
                  <strong>Résistances:</strong>
                  <ul>
                    {pokemon.resistances.map(resistance => (
                      <li key={resistance.name}>
                        {resistance.name} (x{resistance.multiplier})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {pokemon.evolution && (
                <div>
                  <strong>Évolution:</strong>
                  <ul>
                    {pokemon.evolution.pre && pokemon.evolution.pre.length > 0 && (
                      <li>Pré-évolution: {pokemon.evolution.pre.map(evo => evo.name).join(', ')}</li>
                    )}
                    {pokemon.evolution.next && pokemon.evolution.next.length > 0 && (
                      <li>Évolution suivante: {pokemon.evolution.next.map(evo => evo.name).join(', ')}</li>
                    )}
                  </ul>
                </div>
              )}
              
              {pokemon.height && (
                <div>
                  <strong>Taille:</strong> {pokemon.height}
                </div>
              )}
              
              {pokemon.weight && (
                <div>
                  <strong>Poids:</strong> {pokemon.weight}
                </div>
              )}
            </IonCardContent>
          </IonCard>
        )}
        <IonItem>
          <IonButton fill="outline" onClick={handleBackToList}>
            <IonIcon slot="start" icon={arrowBack} />
            Retour à la liste
          </IonButton>
          <IonButton fill="outline" onClick={handlePrevious} disabled={pokemon?.pokedex_id === 1}>
            <IonIcon slot="start" icon={arrowBack} />
            Précédent
          </IonButton>
          <IonButton fill="outline" onClick={handleNext}>
            <IonIcon slot="start" icon={arrowForward} />
            Suivant
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetail;