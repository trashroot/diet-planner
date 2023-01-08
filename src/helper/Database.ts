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
    // const isCon = (await sqlite.isConnection(dbName)).result;
    sqlite.closeConnection(dbName).catch(() => {
        console.log(`Closed connection  for ${dbName}`)
    })
    return await sqlite.createConnection(dbName, false, "no-encryption", 1);
    // if(!isCon){
    //     return await sqlite.createConnection(dbName, false, "no-encryption", 1);
    // }
}

export const loginStatus = async () => {
    // return true;
    let defaultSetting: any[];
    try {
        const con = await getDbConnection();
        await con.open();
        // await con.query(`DELETE FROM default_setting;`);
        // await con.query(`DELETE FROM stats;`);
        let defaultTableExist = (await con.isTable('default_setting')).result;
        console.log("defaultTableExist", defaultTableExist)
        if(defaultTableExist){
            defaultSetting = (await con.query("SELECT * FROM default_setting;")).values;
            console.log("defaultSetting", defaultSetting.length, defaultSetting)
            // return defaultSetting;
            if(defaultSetting.length > 0){
                console.log("True")
                return true;
            }
        }
        return false
      }
      catch(err) {
          console.log("Get Status>>>",err);
        throw new Error(err);
      }
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
    try{
        // await sqlite.closeConnection(dbName).catch(()=>{
        //     console.log(`Closed connection  for ${dbName}`)
        // });
        // const con = await sqlite.createConnection(dbName, false, "no-encryption", 1);
        const con = await getDbConnection();

        // await con.query(`DROP TABLE default_setting;`);
        // await con.query(`DROP TABLE stats;`);
        console.log("Connection: ", con);
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
    }catch(e){
        console.log(`DB Insert Error ${e}`)
    }
  }

export const getStatsData = async() => {
    // await sqlite.closeConnection(dbName).catch(()=>{
    //     console.log(`Closed connection  for ${dbName}`)
    // });
    // const con = await sqlite.createConnection(dbName, false, "no-encryption", 1);
    try{
        const con = await getDbConnection();
        console.log("con===",con)
        con.open();
        // await con.query(`DELETE FROM default_setting;`);
        // await con.query(`DELETE FROM stats;`);
        let statsData: stats[] = (await con.query("SELECT * FROM stats;")).values;
        await con.close();
        await sqlite.closeConnection(dbName).catch(()=>{
            console.log(`Closed connection  for ${dbName}`)
        });
        return statsData;
    }catch(err){
        throw new Error(`Get Status: ${err}`);
    }
    
}

export const deletAccount = async () => {
    try{
        // await sqlite.closeConnection(dbName).catch(()=>{
        //     console.log(`Closed connection  for ${dbName}`)
        // });
        // const con = await sqlite.createConnection(dbName, false, "no-encryption", 1);
        const con = await getDbConnection();
        con.open();
        await con.query(`DELETE FROM default_setting;`);
        await con.query(`DELETE FROM stats;`);        
        await con.close();
        await sqlite.closeConnection(dbName).catch(()=>{
            console.log(`Closed connection  for ${dbName}`)
        });
        return true;
    }catch(err){
        console.log("Delete Res", err);
        throw new Error(err)
    }
    
}