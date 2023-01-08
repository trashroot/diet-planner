import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import {deletAccount} from '../helper/Database'

const Settings: React.FC = () => {
  const router = useIonRouter()

  const logout = () => {
    deletAccount().then(() => {
      router.push('/', 'root', 'replace');
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">      
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'> 
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
