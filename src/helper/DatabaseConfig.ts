export let dbName = "dietPlanner";

export const databaseSchemaWithDefaultSetttings: any = {
    database : dbName,
    version : 1,
    encrypted : false,
    mode : "full",
    tables :[
        {
            name: "stats",
            schema: [
                {column:"id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column:"daily_cal", value:"number"},
                {column:"daily_water", value:"number"},
                {column:"consumed_cal", value:"number"},
                {column:"consumed_water", value:"number"},
                {column:"breakfast", value:"number"},
                {column:"lunch", value:"number"},
                {column:"dinner", value:"number"},
                {column:"snack", value:"number"},
                {column:'date', value:'INTEGER DEFAULT (strftime(\'%s\', \'now\'))'}
            ],
            indexes: [
                {name: "index_user_on_date",value: "date DESC"}
            ]
        },
        {
            name: "default_setting",
            schema: [
                {column:"id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column:"control", value:"TEXT NOT NULL"},
                {column:"default_value", value:"TEXT"},
                {column:"customized_value", value:"TEXT"}
            ],
            // values: [
            //     [1, "water", "8", ""],
            //     [2, "lunch", "1", ""],
            //     [3, "snack", "4", ""]
            // ],
            indexes: [
                {name: "index_user_on_control",value: "control"}
            ]
        },        
    ]
  };