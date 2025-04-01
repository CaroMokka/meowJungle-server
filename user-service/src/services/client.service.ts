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
      return { code: 400, error: "Faltan campos obligatorios" };
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
    return { code: 201, message: "Cliente creado", client };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Error desconocido" };
  }
};
const getClients = async () => {
  const clients = await Client.findAll();
  return { code: 200, message: "Lista de clientes", clients };
};
const getClientById = async (clientId: string) => {
  const client = await Client.findByPk(clientId);
  if (!client) {
    return { code: 400, message: "Cliente no existe" };
  }
  return { code: 200, message: "Cliente encontrado", client };
};

const updateClient = async (clientId: string, clientData: ClientType) => {
  const { first_name, last_name, email, phone_number } = clientData;
  const client = await Client.findByPk(clientId);
  if (!client) {
    return { error: "Cliente no encontrado" };
  }
  await client.update({
    first_name,
    last_name,
    email,
    phone_number,
  });
  return { code: 200, message: "Cliente actualizado", client };
};
const deleteClient = async (clientId: string) => {
  const client = await Client.findByPk(clientId);
  if (!client) {
    return { error: "Cliente no encontrado" };
  }
  await client.destroy();
  return { code: 200, message: "Cliente eliminado", client };
};
export { createClient, getClients, getClientById, updateClient, deleteClient };
