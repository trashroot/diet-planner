
import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';
import { SQLiteDBConnection } from 'react-sqlite-hook';

// import {sqlite } from '../App'
import { dbName, databaseSchemaWithDefaultSetttings } from '../helper/DatabaseConfig';

const Planner: React.FC = () => { 
  let [data, setData] = useState<Object>()
  // useIonViewWillEnter(async () => {
  //   let con: SQLiteDBConnection;
  //   const isCon = (await sqlite.isConnection(dbName)).result;
  //   console.log("isCon>>", isCon);
    
  //   const connectionConsistency = (await sqlite.checkConnectionsConsistency()).result;
  //   console.log("connectionConsistency>>", connectionConsistency);

  //   let dbs = (await sqlite.getDatabaseList()).values;    
  //   console.log("Datbases>>",dbs);

  //   // // const isJsonValid = await sqlite.isJsonValid(JSON.stringify(databaseSchemaWithDefaultSetttings));
  //   // // // console.log(`>> jsonImport: ${JSON.stringify(databaseSchemaWithDefaultSetttings)}`)
  //   // // if(!isJsonValid.result) { 
  //   // //   throw new Error(`Error: jsonImport Object not valid`);
  //   // // }
  //   // // const retImport: any = await sqlite.importFromJson(JSON.stringify(databaseSchemaWithDefaultSetttings)); 
  //   // // console.log(`full import result ${retImport.changes.changes}`);

  //   // if(retImport.changes.changes === -1 ) {
  //   //   throw new Error(`Error: importFromJson failed`);
  //   // }
    
  //   // await sqlite.closeAllConnections();

  //   // if(!isCon && !con){
  //   //   con = await sqlite.createConnection(dbName)
  //   // }

  //   // if(isCon && !con){
  //   //   con = await sqlite.retrieveConnection(dbName)
  //   // }
    
  //   // let checkConExist = (await con.isExists()).result
  //   // await con.open();
  //   // let tables = (await con.getTableList()).values;
  //   // let res = (await con.query("SELECT * FROM default_setting;")).values;
  //   // setData(res)
  //   // await con.close()
  //   // console.log("I m here", tables, res, checkConExist, con);

  // })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">        
          <IonTitle >Planner</IonTitle>
        </IonToolbar>
      </IonHeader>  
      <IonContent fullscreen className='ion-padding'> 
        I am on Planner.
        <pre/>
          {JSON.stringify(data)}
        
      </IonContent>
    </IonPage>
  );
};

export default Planner;
