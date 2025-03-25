import sequelize from "../config/client.db";
import { DataTypes, Model } from "sequelize";

class PaymentMethod extends Model {
  public id!: number;
  public card_number!: number;
  public card_type!: string;
  public expiration_date!: Date;
}

PaymentMethod.init(
  {
    id: {
      type: new DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    card_number: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    card_type: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    expiration_date: {
      type: new DataTypes.DATE(),
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