import { Request, Response } from "express";
import Address from "../models/address.model";
import Client from "../models/client.model";

const createAddress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client_id, street_address, city, state, zip_code, country } =
    req.body;
  try {
    if (
      !client_id ||
      !street_address ||
      !city ||
      !state ||
      !zip_code ||
      !country
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const clientExists = await Client.findByPk(client_id);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const address = await Address.create({
      client_id,
      street_address,
      city,
      state,
      zip_code,
      country,
    });
    return res.status(201).json({ message: "Dirección creada", address });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const getAddresses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const addresses = await Address.findAll();
    return res.status(200).json({ message: "Lista de direcciones", addresses });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const getAddressById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }
    return res.status(200).json({ message: "Dirección encontrada", address });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const updateAddress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { client_id, street_address, city, state, zip_code, country } =
    req.body;
  try {
    const clientExists = await Client.findByPk(client_id); 
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    } 
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }
    await address.update({
      client_id,
      street_address,
      city,
      state,
      zip_code,
      country,
    });
    return res.status(200).json({ message: "Dirección actualizada", address });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};
const deleteAddress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }
    await address.destroy();
    return res.status(200).json({ message: "Dirección eliminada", address });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};
export {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
