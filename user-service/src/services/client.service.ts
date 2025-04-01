import Client from "../models/client.model";

type ClientType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};
const createClient = async ({
  first_name,
  last_name,
  email,
  phone_number,
}: ClientType) => {
  try {
    if (!first_name || !last_name || !email || !phone_number) {
        return { code: 400, error: "Faltan campos obligatorios" }
      }
    const clientExists = await Client.findOne({
      where: {
        email,
      },
    });
    if (clientExists) {
      return { code: 400, message: "El cliente ya existe" };
    }
    const client = await Client.create({
      first_name,
      last_name,
      email,
      phone_number,
    });
    return { code: 201,  message: "Cliente creado", client };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Error desconocido" };
  }
};

export { createClient };
