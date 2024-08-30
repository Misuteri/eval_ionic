import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonThumbnail,
  IonCardContent
} from '@ionic/react';

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
    resistances?: {
      name: string;
      multiplier: number;
    }[];
    evolution?: {
      pre: {
        name: string;
      }[] | null;
      next: {
        name: string;
      }[] | null;
    } | null;
    height?: string | null;
    weight?: string | null;
  };
};

const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/pokemon/${pokemon.pokedex_id}`);
  };

  return (
    <IonCard button onClick={handleClick}>
      <IonThumbnail>
        <img src={pokemon.sprites.regular} alt={`Image of ${pokemon.name.fr}`} />
      </IonThumbnail>
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
  );
};

export default PokemonItem;
