
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

export default Pokemon;