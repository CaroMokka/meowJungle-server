import { Request, Response } from "express";
import Address from "../models/address.model";
import Client from "../models/client.model";
import { where } from "sequelize";

const createAddress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { clientId } = req.params;
    const { street_address, city, state, zip_code, country } = req.body;
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    if (!street_address || !city || !state || !zip_code || !country) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const addressCount = await Address.count({
      where: { client_id: clientId },
    });
    if (addressCount >= 2) {
      return res
        .status(400)
        .json({ error: "El cliente ya tiene 2 direcciones registradas" });
    }
    const address = await Address.create({
      client_id: clientId,
      street_address,
      city,
      state,
      zip_code,
      country,
    });
    return res.status(201).json({ message: "Dirección creada", address });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const getAddressesClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { clientId } = req.params;
    if (!clientId) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const addresses = await Address.findAll({ where: { client_id: clientId } });
    if (addresses.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay direcciones para este cliente" });
    }
    return res.status(200).json({ message: "Lista de direcciones", addresses });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const getAddressById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId, addressId } = req.params;
  console.log(clientId, addressId);
  try {
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const addressClient = await Address.findOne({
      where: { client_id: clientId, id: addressId },
    });
    if (!addressClient) {
      return res
        .status(404)
        .json({ error: "La dirección no pertenece a este cliente" });
    }
    return res
      .status(200)
      .json({ message: "Dirección de cliente encontrada", addressClient });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error desconocido" });
  }
};

const updateAddress = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { clientId, addressId } = req.params;
    const { street_address, city, state, zip_code, country } =
      req.body;
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }
    await address.update({
      street_address,
      city,
      state,
      zip_code,
      country,
    },
  {
    where: { client_id: clientId, id: addressId }
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
  try {
    const {  clientId, addressId } = req.params;
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).json({ error: "Dirección no encontrada" });
    }
    const addressClient = await Address.findOne({
      where: { client_id: clientId, id: addressId },
    });
    if (!addressClient) {
      return res
        .status(404)
        .json({ error: "La dirección no pertenece a este cliente" });
    }
    await addressClient.destroy();
    return res.status(200).json({ message: "Dirección eliminada", addressClient });
  } catch (error) {
    return res.status(500).json({ error: "Error desconocido" });
  }
};
export {
  createAddress,
  getAddressesClient,
  getAddressById,
  updateAddress,
  deleteAddress,
};
