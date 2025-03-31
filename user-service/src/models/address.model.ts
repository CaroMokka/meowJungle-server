import sequelize from "../config/client.db";
import { DataTypes, Model } from "sequelize";
import Client from "./client.model";

class Address extends Model {
  public id!: number;
  public client_id!: number;
  public street_address!: string;
  public city!: string;
  public state!: string;
  public zip_code!: number;
  public country!: string;
}   

Address.init(
  {
    id: {
      type:  DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: false,
    },
    street_address: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    city: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    state: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    zip_code: {
      type: new DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
  },
  {
    tableName: "addresses",
    timestamps: true,
    sequelize,
  }
);



export default Address;