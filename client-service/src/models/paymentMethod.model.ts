import sequelize from "../config/client.db";
import { DataTypes, Model } from "sequelize";
import Client from "./client.model";

class PaymentMethod extends Model {
  public id!: number;
  public client_id!: number;
  public card_number!: number;
  public card_type!: string;
  public expiration_date!: string;
}

PaymentMethod.init(
  {
    id: {
      type: new DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: Client,
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: false,
    },
    card_number: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    card_type: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    expiration_date: {
      type: new DataTypes.DATEONLY,
      allowNull: false,
    }
  },
  {
    tableName: "payment_methods",
    timestamps: true,
    sequelize,
  }
);



export default PaymentMethod