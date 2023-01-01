import { Redirect, Route } from 'react-router';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { SQLiteHook, useSQLite } from 'react-sqlite-hook'

import Home from './pages/Home';

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

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';


import { AppContextProvider } from './helper/AppState';
import RegisterPath from './pages/RegisterPath';
import AccountPath from './pages/AccountPath';

export let sqlite: SQLiteHook;

setupIonicReact();

const App: React.FC = () => {

  sqlite = useSQLite();

return (
  <AppContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>                
          <Route exact path="/home">
            <Home />
          </Route>
          {/* <Route exact path="/login">
            <Login />
          </Route> */}
          <Route path="/registration">
            <RegisterPath />
          </Route>

          <Route path="/account">
            <AccountPath />           
          </Route>
          <Redirect exact from='/' to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </AppContextProvider>
)};

export default App;
