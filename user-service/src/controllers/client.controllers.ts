import { Request, RequestHandler, Response } from "express";
import Client from "../models/client.model";
import { createClient, getClients, getClientById } from "../services/client.service";

const createClientController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { first_name, last_name, email, phone_number } = req.body;
    const client = await createClient({first_name, last_name, email, phone_number});
    if (!client) {
      return res.status(400).json({ error: "Error al crear el cliente" });
    }
    return res.status(201).json({ code: client.code, message: client.message, client: client.client });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error desconocido" });
  }
};
const getClientsController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const clients = await getClients();
    return res.status(200).json({ clients });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};
const getClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { clientId } = req.params;
    const client = await getClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    return res.status(200).json(client);
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const updateClient = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number } = req.body;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    await client.update({
      first_name,
      last_name,
      email,
      phone_number,
    });
    return res.status(200).json({ message: "Cliente actualizado", client });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const deleteClient = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    await client.destroy();
    return res.status(200).json({ message: "Cliente eliminado", client });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

export { createClientController, getClientsController, getClientByIdController, updateClient, deleteClient };
