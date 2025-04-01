import { Request, Response } from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../services/client.service";

const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { first_name, last_name, email, phone_number } = req.body;
    const client = await createClient({
      first_name,
      last_name,
      email,
      phone_number,
    });
    if (!client) {
      return res.status(400).json({ error: "Error al crear el cliente" });
    }
    return res.status(201).json({
      code: client.code,
      message: client.message,
      client: client.client,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error desconocido" });
  }
};
const getClientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
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

const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId } = req.params;
  const clientData = req.body;
  try {
    const client = await updateClient(clientId, clientData);
    if (!client) {
      return res.status(400).json({ message: "Cliente no encontrado" });
    }
    return res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId } = req.params;
  try {
    const client = await deleteClient(clientId);
    return res.status(200).json(client);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ error: "Error desconocido" });
  }
};

export {
  createClientController,
  getClientsController,
  getClientByIdController,
  updateClientController,
  deleteClientController,
};
