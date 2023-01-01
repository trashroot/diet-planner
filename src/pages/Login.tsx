
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useState } from "react"

import style from "./Login.module.css"

const Login: React.FC = () => {
    const [email, setEmail] = useState();
    const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login Form submitted")
    }

    
  return (
    <IonPage>
        <IonHeader >
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>         
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen className="ion-padding">
            <div>
                <form onSubmit={formHandler}>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput value="" placeholder=""></IonInput>
                    </IonItem>
                    <IonItem className="ion-margin-vertical">
                        <IonLabel position="stacked">Password</IonLabel>
                        <IonInput type="password" value=""></IonInput>
                    </IonItem>
                    <IonButton type="submit" shape="round" expand="full" fill="solid">Login</IonButton>
                </form>
            </div>
        </IonContent>
    </IonPage>
  )
}

export default Login