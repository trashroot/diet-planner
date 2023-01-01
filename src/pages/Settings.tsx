import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';



const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">      
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'> 
        I am on setting.
      </IonContent>
    </IonPage>
  );
};

export default Settings;
