import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

export const createConnection = async (): Promise<mysql.Connection>  => {

    dotenv.config({ path:  `${__dirname}/../../.env`  });

    const connection = await mysql.createConnection({
        host: 'database',
        user: 'root',
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: 3306
    });
   
    connection.connect();

    return connection;

  }