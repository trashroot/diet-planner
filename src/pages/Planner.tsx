
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Planner: React.FC = () => { 
    
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">        
          <IonTitle >Planner</IonTitle>
        </IonToolbar>
      </IonHeader>  
      <IonContent fullscreen className='ion-padding'> 
        Planner.        
      </IonContent>
    </IonPage>
  );
};

export default Planner;
