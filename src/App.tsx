import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Pokemon from './pages/Pokemon';
import Films from './pages/Films';
import PokemonDetail from './pages/PokemonDetail';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { filmOutline, gameControllerOutline } from 'ionicons/icons';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Pokemon">
            <Pokemon />
          </Route>
          <Route exact path="/pokemon/:id">
            <PokemonDetail />
          </Route>
          <Route exact path="/Films">
            <Films />
          </Route>
          <Route exact path="/">
            <Redirect to="/Pokemon" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Pokemon" href="/Pokemon">
            <IonIcon aria-hidden="true" icon={gameControllerOutline} />
            <IonLabel>Pokemons</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Films" href="/Films">
            <IonIcon aria-hidden="true" icon={filmOutline} />
            <IonLabel>Films</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
