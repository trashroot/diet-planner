import { 
  IonButton,
  IonContent, 
  IonPage, 
  IonRouterLink
} from '@ionic/react';

import './Home.css';

const Home: React.FC = () => {
  
  return (
    <IonPage> 
      <IonContent fullscreen className='ion-padding home'> 
        <div className='home_layout'>
          <div className='home_user'></div>
          <div className='home_details'>
            <div className='ion-text-center'>My Diet Tracker</div>
          </div>
          <div className='home_user'>
            <IonRouterLink routerLink='/registration/profile'>
              <IonButton color="light" shape="round" expand="full" fill="solid" strong={true}>Register</IonButton>
            </IonRouterLink>
            
            {/* <IonRouterLink routerLink='/login'>
              <IonButton type="submit" shape="round" expand="full" fill="clear" strong={true}>Login</IonButton>
            </IonRouterLink> */}
          </div>
        </div> 
      </IonContent>
    </IonPage>
  );
};

export default Home;
