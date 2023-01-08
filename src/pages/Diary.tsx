import { IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonAlert, useIonToast } from '@ionic/react';
import { addOutline, removeOutline } from 'ionicons/icons';

import { useContext, useEffect } from 'react';
import { AppContext } from '../helper/AppState';

import dayjs from 'dayjs';

import './Account.css';
import CalChart from './CalChart';

import { LocalNotifications, LocalNotificationSchema} from "@capacitor/local-notifications";
import { getStatsData } from '../helper/Database';

const Diary: React.FC = () => {
  
  let {setIsLoading} = useContext(AppContext);

  const {dailyCalInit, setDailyCalInit} = useContext(AppContext);
  const {dailyCal, dailyWater, calConsumed, waterConsumed} = dailyCalInit;
  const [presentAlert] = useIonAlert();

  useEffect(() => {      
    getStatsData().then((data) => {
      console.log("data11>>>", data);
      setDailyCalInit({...dailyCalInit, dailyCal:data[0].daily_cal, dailyWater: data[0].daily_water, calConsumed: data[0].consumed_cal ? data[0].consumed_cal : 0, waterConsumed: data[0].consumed_water? data[0].consumed_water : 0});
      setIsLoading(false);
    }).catch((e) => {
      console.log(`Diary ${e}`)
      setIsLoading(false);
    })    
  }, [])

  // const [present] = useIonToast();
  
  // const presentToast = (position: 'top' | 'middle' | 'bottom', msg: string) => {
  //   present({
  //     message: msg,
  //     duration: 1500,
  //     position: position
  //   });
  // };

  const addClickHandler = () => {
    return presentAlert({
      header: 'Enter the info',
      buttons: [
        {text: 'Cancel',role: 'cancel',handler: () => { }},
        {text:'OK', handler:getAlertFormData}
      ],
      inputs: [        
        {
          placeholder: 'Meal',
          type: 'text'
        },
        {
          placeholder: 'Quantity',
          type: 'number'
        }
      ],
    })
  }

  const getAlertFormData = (alertData) => {
    if(alertData && alertData[1]){
      setDailyCalInit({...dailyCalInit, calConsumed: calConsumed + parseFloat(alertData[1])})
    }    
  }

  // const addWaterClickHandler = () => {
  //   return presentAlert({
  //     header: 'No. of glass',
  //     buttons: [        
  //       {text: 'Cancel',role: 'cancel',handler: () => { }},
  //       {text:'OK', handler:getWaterAlertFormData},
  //     ],
  //     inputs: [
  //       {
  //         placeholder: 'Glass',
  //         type: 'number'
  //       },
  //     ],
  //   })
  // }

  // const getWaterAlertFormData = (alertData) => {
  //   if(alertData[0] > recomondedMaxGlass){
  //     presentToast('top', `More than ${recomondedMaxGlass} are not recomonded.`)
  //   }
  //   if(alertData && alertData[0] && alertData[0] <= recomondedMaxGlass){
  //     setDailyCalInit({...dailyCalInit, dailyWater: parseFloat(alertData[0])})
  //   }
  // }

  const addGlass = () => {
    if(dailyWater > 0 && waterConsumed < dailyWater){
      setDailyCalInit({...dailyCalInit, waterConsumed: waterConsumed + 1})
    }
  }

  const removeGlass = () => {
    if(waterConsumed > 0){
      setDailyCalInit({...dailyCalInit, waterConsumed: waterConsumed - 1})
    }
  }

  const notiFire = ()=>{
    let options:LocalNotificationSchema = {
      id:1,
      title: "Time to drink water!",
      body: "",
      summaryText: "Drink Water",
      schedule: {at: new Date( new Date().getTime() + (5 * 1000))}
    }
    LocalNotifications.schedule({notifications: [options]})
  }

  return (
    <IonPage>        
      <IonContent fullscreen>
        <div className='container_color ion-padding-top'>        
          <div className='diary_details_container'>
            <div className='chart_child'>
              <div className='ion-padding-horizontal'>
                <div className='cal_text'><span className='cal_text_position'>Remaining Cal.</span></div>
                <div className='separator'></div>
                <div className='calo_val'>{dailyCal - calConsumed}</div>
                <div className='cal_text'>
                  <span className='cal_text_position'>Consumed Cal.</span>
                </div>
                <div className='separator'></div>
                <div className='calo_val'>{calConsumed}</div>
              </div>            
            </div>
            <div className='chart_child'>
              <CalChart consumedCal={calConsumed} dailyCal={dailyCal} />
            </div>
            <div className='chart_child'>
              <div className='ion-padding-horizontal'>
                <div className='cal_text'>
                <span className='cal_text_position'>Daily Water Goal</span></div>
                <div className='separator'></div>
                <div><span className='calo_val water_width'>{dailyWater} </span> <span className="cal_text"> glass</span></div>
                <div className='cal_text'><span className='cal_text_position'>Water Consumed</span></div>
                <div className='separator'></div>
                <div ><span className='calo_val water_width'>{waterConsumed}</span> <span className="cal_text">glass</span></div>
              </div>
            </div>
            
          </div>
          <div className='macro_parent_container'>
            <div className='macro_container'>
              <span className='carbs'>{20} / {50}g</span>
              <span className='protein'>{20} / {50}g</span>
              <span className='fat'>{20} / {50}g</span>
            </div>
          </div>
          <div className='date_container'>
            <span>{dayjs().format("DD / MMM / YYYY")}</span>
          </div>
        </div>
        <div className='control_container'>
          <div className='ion-margin-top ion-padding-horizontal glass_water_container'>
            <div className='water_goal'>
              <IonButton color="warning" onClick={notiFire}>Fire</IonButton>
              {/* <IonIcon onClick={addWaterClickHandler} icon={addOutline} color="primary" size='large'></IonIcon> */}
            </div>
            <div >
              <IonIcon onClick={removeGlass} icon={removeOutline} color="primary" size='large'></IonIcon>
              <img className='glass_img' src='./assets/water-glass.svg' alt=''/>
              <IonIcon onClick={addGlass} icon={addOutline} color="primary" size='large'></IonIcon>
            </div>
          </div>
          <IonCard>
            <IonCardHeader>Breakfast</IonCardHeader>
            <IonCardContent>Recomonded 100
              {/* <IonIcon onClick={addClickHandler} icon={addOutline} color="primary" size='large' style={{float:'right'}}></IonIcon> */}
            </IonCardContent>
          </IonCard>          
          <IonCard>
            <IonCardHeader>Lunch</IonCardHeader>
            <IonCardContent>Recomonded 100              
              {/* <IonIcon onClick={addClickHandler} icon={addOutline} color="primary" size='large' style={{float:'right'}}></IonIcon> */}
            </IonCardContent>
          </IonCard>          
          <IonCard>
            <IonCardHeader>Dinner</IonCardHeader>
            <IonCardContent>Recomonded 100
              {/* <IonIcon onClick={addClickHandler} icon={addOutline} color="primary" size='large' style={{float:'right'}}></IonIcon> */}
            </IonCardContent>
          </IonCard>          
          <IonCard>
            <IonCardHeader>Snack</IonCardHeader>
            <IonCardContent>Recomonded 100
              {/* <IonIcon onClick={addClickHandler} icon={addOutline} color="primary" size='large' style={{float:'right'}}></IonIcon> */}
            </IonCardContent>
          </IonCard>          
        </div>
        <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={false}>
          <IonFabButton onClick={addClickHandler}><IonIcon icon={addOutline}></IonIcon></IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Diary;
