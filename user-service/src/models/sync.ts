import sequelize from "../config/client.db";
import Client from "./client.model";
import Address from "./address.model";
import PaymentMethod from "./paymentMethod.model";

Client.hasMany(Address, { foreignKey: "client_id", as: "addresses" });
Address.belongsTo(Client, { foreignKey: "client_id", as: "client" });

Client.hasMany(PaymentMethod, {
  foreignKey: "client_id",
  as: "payment_methods",
});
PaymentMethod.belongsTo(Client, { foreignKey: "client_id", as: "client" });

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced successfully ✅");
  } catch (error) {
    console.error("Error syncing database ❌:", error);
  }
};
export { Client, Address, PaymentMethod, syncModels };
