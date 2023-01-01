
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useContext } from "react";
import { RegisterContext } from "../../helper/RegisterContext"

import  "./Register.css"
import RegistrationSteps from "./RegistrationSteps";

const Registration: React.FC = () => {
  const  regisVal = useContext(RegisterContext);
  const setRegVal = regisVal?.setRegis;
        
    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        console.log("Registration done.")
    }
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>         
          <IonTitle >Registration</IonTitle>
        </IonToolbar>
      </IonHeader>  
      <IonContent fullscreen className='ion-padding'>

        <RegistrationSteps step="details"/>

        <div className="ion-margin-vertical"></div>
        <form onSubmit={formHandler}>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="text" value={regisVal.regis.email} placeholder=""></IonInput>
          </IonItem>
          <IonItem className="ion-margin-vertical">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={regisVal.regis.password}></IonInput>
          </IonItem>
          <IonButton type="submit" expand="full" fill="solid" shape="round">Next</IonButton>
        </form>      
      </IonContent>
    </IonPage>    
  )
}

export default Registration