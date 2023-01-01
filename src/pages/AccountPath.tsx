import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { Redirect, Route } from "react-router"
import { bookmarkSharp, bookSharp, settingsSharp } from 'ionicons/icons';

import Diary from "./Diary";
import Planner from "./Planner";
import Settings from "./Settings";

const AccountPath: React.FC = () => {

  return (
      <IonTabs>    
        <IonRouterOutlet>
          <Route exact path="/account/diary">
            <Diary />
          </Route>
          <Route exact path="/account/planner">
            <Planner />
          </Route>
          <Route exact path="/account/setting">
            <Settings />
          </Route>
          <Redirect exact path='/account/' to="/account/diary" />
        </IonRouterOutlet>

        <IonTabBar slot="bottom"  color="primary" translucent={true}>
          <IonTabButton tab="diary" href="/account/diary">
            <IonIcon icon={bookmarkSharp} />
            <IonLabel>Diary</IonLabel>
          </IonTabButton>

          <IonTabButton tab="planner" href="/account/planner">
            <IonIcon icon={bookSharp} />
            <IonLabel>Planner</IonLabel>
          </IonTabButton>

          <IonTabButton tab="settings" href="/account/setting">
            <IonIcon icon={settingsSharp} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>              
      </IonTabs>
  )
}

export default AccountPath