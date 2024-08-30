// src/components/PokemonItem.tsx
import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonThumbnail } from '@ionic/react';

type PokemonItemProps = {
  pokemon: {
    pokedex_id: number;
    name: {
      fr: string;
    };
    sprites: {
      regular: string;
    };
    types?: {
      name: string;
      image: string;
    }[];
  };
};

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  return (
    <IonCard>
      <IonThumbnail>
        <img src={pokemon.sprites.regular} alt={`Image of ${pokemon.name.fr}`} />
      </IonThumbnail>
      <IonCardHeader>
        <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
        {pokemon.types && (
          <IonCardSubtitle>
            {pokemon.types.map(type => (
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
    </IonCard>
  );
};

export default PokemonItem;