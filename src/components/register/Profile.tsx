
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonNote, IonPage, IonRadio, IonRadioGroup, IonRouterLink, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonRouter, useIonToast } from "@ionic/react"
import { useContext, useState } from "react"
import { AppContext } from "../../helper/AppState"

import { dbInIt, insertData } from '../../helper/Database';
import { calculateCal } from '../../helper/Helper';

import  "./Register.css"
// import RegistrationSteps from "./RegistrationSteps"

const Profile: React.FC = () => {
  
  const router = useIonRouter()
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const {dailyCalInit, setDailyCalInit, isLoading, setIsLoading} = useContext(AppContext);
  const { dailyWater} = dailyCalInit;
  
  const [weight, setWeight] = useState<number | null>();
  const [height, setHeight] = useState<number | null>();
  const [age, setAge] = useState<number | null>();
  const [gender, setGender] = useState<string | null>();
  const [activity, setActivity] = useState<string | null>();
  
  const formHandler = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try{
      if(!weight || !height || !age || !gender || !activity){
        presentToast('top');
      }else{

        setIsLoading(true);

        const cal = calculateCal(weight, height, age, gender, activity);
        // setDailyCalInit({...dailyCalInit, dailyCal: cal });

        // set up db for app
        dbInIt().then(() => {
          console.log("DB Imported.");
          insertData(weight, height, age, gender, activity,cal, dailyWater).then(() => {
            console.log("Profile Created.");
            router.push("/account/diary");
          })
          .catch(()=>{
            setIsLoading(false);
            getHelp();
          })
        })
        .catch(()=>{
          setIsLoading(false);
          getHelp();
        })
      }
    }catch(err){
      setIsLoading(false);
      getHelp();
    }
  }

  const getHelp = () => {
    presentAlert({
      header: 'Error',
      subHeader: 'If error persist. Please write to us',
      message: '<a href="mailto:trash.n.gam@gmail.com">Email</a>',
      buttons: ['OK'],
    })
  }

  const presentToast = (position: 'top' | 'middle' | 'bottom') => {
    present({
      message: 'All the fields are required.',
      duration: 1500,
      position: position,
      cssClass: 'custom-toast',
    });
  };
  
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="home" />
          </IonButtons>
          <IonTitle >Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className='ion-padding'>

        {/* <RegistrationSteps /> */}

        <div className="ion-margin-vertical">Enter details to calculate calories needs.</div>
        <form onSubmit={formHandler}>
          {/* <IonItem>
            <IonLabel position="stacked">Weight in (KG)</IonLabel>
            <IonInput value={regisVal?.regis.weight} onIonChange={(e) => setRegVal({...regisVal?.regis, weight: e.target.value as number})}></IonInput>
          </IonItem> */}
          <IonItem className="ion">
            <IonLabel position="stacked">Weight (kg)*</IonLabel>
            <IonInput type="number" value={weight} onIonChange={(e) => setWeight(e.target.value as number)}></IonInput>
            <IonNote slot="error">Required</IonNote>
          </IonItem>
          <IonItem className="ion-margin-vertical">
            <IonLabel position="stacked">Height (cm)</IonLabel>
            <IonInput type="number" value={height} onIonChange={(e) => setHeight(e.target.value as number)}></IonInput>
          </IonItem>
          <IonItem className="ion-margin-vertical">
            <IonLabel position="stacked">Age (Years)</IonLabel>
            <IonInput type="number" value={age} onIonChange={(e) => setAge(e.target.value as number)}></IonInput>
          </IonItem>
          
          <div className="ion-margin-vertical">
            <IonRadioGroup name="gender" value={gender} onIonChange={(e) => setGender(e.target.value)}>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonRadio value="male" className="ion-margin-end" ></IonRadio>            
                    <IonLabel>Male</IonLabel>
                  </IonCol>
                  <IonCol size="6">
                    <IonRadio value="female" className="ion-margin-end"></IonRadio>           
                    <IonLabel>Female</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>            
            </IonRadioGroup>
          </div>

          <IonList>
            <IonItem>
              <IonSelect name="activity" interface="popover" value={activity} onIonChange={(e) => setActivity(e.target.value)} placeholder="Activity / Exercise in a week">
                <IonSelectOption value="1.2" >Light</IonSelectOption>
                <IonSelectOption value="1.37">Moderate</IonSelectOption>
                <IonSelectOption value="1.55">Active</IonSelectOption>
                <IonSelectOption value="1.72">Very Active</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          {/* <IonRouterLink routerLink='/account/diary'> */}
            <IonButton type="submit" expand="full" fill="solid" shape="round">Next</IonButton>
          {/* </IonRouterLink> */}
        </form>
        <div className="help ion-margin-vertical">
          <a href="mailto:trash.n.gam@gmail.com">Help</a>
        </div>
        <IonLoading isOpen={isLoading} cssClass="spinner_color"></IonLoading>
      </IonContent>
    </IonPage>    
  )
}

export default Profile