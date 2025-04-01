import sequelize from "../config/client.db";
import { DataTypes, Model } from "sequelize";

class Client extends Model {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public phone_number!: string;
}

Client.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    last_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    phone_number: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
    sequelize,
  }
);

export default Client;
