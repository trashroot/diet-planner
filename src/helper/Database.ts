import { sqlite } from '../App';
import { databaseSchemaWithDefaultSetttings, dbName } from './DatabaseConfig';

export interface stats{
    breakfast: number;
    consumed_cal: number;
    consumed_water: number;
    daily_cal: number;
    daily_water: number;
    date: number;
    dinner: number;
    id: number;
    lunch: number;
    snack: number;
}

export const getDbConnection = async () => {
    const isCon = (await sqlite.isConnection(dbName)).result;
    sqlite.closeConnection(dbName).catch(() => {
        console.log(`Closed connection  for ${dbName}`)
    })

    if(!isCon){
        return await sqlite.createConnection(dbName, false, "no-encryption", 1);
    }
}

export const loginStatus = async () => {
    return true;
    // let defaultSetting: any[];
    // const con = await getDbConnection();
    // await con.open();
    // let defaultTableExist = (await con.isTable('default_setting')).result;

    // if(defaultTableExist){                
    //     defaultSetting = (await con.query("SELECT * FROM default_setting;")).values;

    //     if(defaultSetting.length > 0){
    //         return true;
    //     }else{
    //         return false
    //     }
    // }
}

export const dbInIt = async () => {
    
    const isJsonValid = await sqlite.isJsonValid(JSON.stringify(databaseSchemaWithDefaultSetttings));
    if(!isJsonValid.result) { 
      throw new Error(`Error: jsonImport Object not valid`);
    }

    const retImport: any = await sqlite.importFromJson(JSON.stringify(databaseSchemaWithDefaultSetttings)); 
    console.log(`full import result ${retImport.changes.changes}`);

    if(retImport.changes.changes === -1 ) {
      throw new Error(`Error: importFromJson failed`);
    }
  }

  export const insertData = async (weight,height,age,gender,activity,daily_cal,dailyWater) => {
        
    const con = await getDbConnection();

    // await con.query(`DROP TABLE default_setting;`);
    // await con.query(`DROP TABLE stats;`);

    await con.open();

    let defaultExist = (await con.isTable('default_setting')).result;

    if(defaultExist){
        await con.query(`DELETE FROM default_setting;`);

        let insertDefaultProfile = `INSERT INTO default_setting (control, default_value) 
        VALUES ('weight', ${weight}),('height', ${height}),('age', ${age}),('gender', '${gender}'),('activity', ${activity});`
        await con.execute(insertDefaultProfile);    
    }

    if(!defaultExist){
        throw new Error(`Error: default setting does not exist`);
    }

    let statsExist = (await con.isTable('stats')).result;
    if(statsExist){
        await con.query(`DELETE FROM stats;`);

        let statsData = `INSERT INTO stats (daily_cal, daily_water) VALUES (${daily_cal}, ${dailyWater});`;
        
        await con.run(statsData);
    }

    if(!statsExist){
        throw new Error(`Error: stats does not exist`);
    }
          
    await con.close();
    await sqlite.closeConnection(dbName).catch(()=>{
        console.log(`Closed connection  for ${dbName}`)
    });
  }

export const getStatsData = async() => {    
    const con = await getDbConnection();    
    con.open();
    let statsData: stats[] = (await con.query("SELECT * FROM stats;")).values;
    await con.close();
    await sqlite.closeConnection(dbName).catch(()=>{
        console.log(`Closed connection  for ${dbName}`)
    });
    return statsData;
}