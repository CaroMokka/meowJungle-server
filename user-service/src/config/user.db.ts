import { Sequelize } from 'sequelize';
import { dbConfig } from '../config/config';

const sequelize = new Sequelize(
    dbConfig.database, 
    dbConfig.username, 
    dbConfig.password, 
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect as 'postgres',
    }
  );

export default sequelize;