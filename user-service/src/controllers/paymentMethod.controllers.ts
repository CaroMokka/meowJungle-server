import { Request, Response } from "express";
import PaymentMethod from "../models/paymentMethod.model";
import Client from "../models/client.model";

const createPaymentMethod = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { clientId } = req.params;
    const { card_number, card_type, expiration_date } = req.body;
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    if (!card_number || !card_type || !expiration_date) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const paymentMethod = await PaymentMethod.create({
      client_id: clientId,
      card_number,
      card_type,
      expiration_date,
    });
    return res.status(201).json({
      message: "El metódo de pago se ha creado satisfactoriamente.",
      paymentMethod,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};

const getPaymentMethods = async (
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
    const paymentMethods = await PaymentMethod.findAll({
      where: { client_id: clientId },
    });
    return res
      .status(200)
      .json({ message: "Lista de metodos de pago", paymentMethods });
  } catch (error) {
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};

const getPaymentMethodById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId, paymentId } = req.params;
  try {
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const paymentMethod = await PaymentMethod.findByPk(paymentId);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }
    const paymentMethodClient = await PaymentMethod.findOne({
      where: { client_id: clientId, id: paymentId },
    });
    const paymentsCount = await PaymentMethod.count({
      where: { client_id: clientId },
    });
    if (paymentsCount === 0) {
      return res
        .status(404)
        .json({ error: "No hay métodos de pago para este cliente" });
    }
    if (!paymentMethodClient) {
      return res
        .status(404)
        .json({ error: "El método de pago no pertenece a este cliente" });
    }
    return res
      .status(200)
      .json({ message: "Método de pago encontrado", paymentMethodClient });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};
const updatePaymentMethod = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId, paymentId } = req.params;
  const { card_number, card_type, expiration_date } = req.body;
  try {
    if (!card_number || !card_type || !expiration_date) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const paymentMethod = await PaymentMethod.findByPk(paymentId);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }
    await paymentMethod.update({
      card_number,
      card_type,
      expiration_date,
    }, { where: { client_id: clientId ,id: paymentId } });
    return res
      .status(200)
      .json({ message: "Método de pago actualizado.", paymentMethod });
  } catch (error) {
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};
const deletePaymentMethod = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId ,paymentId } = req.params;
  try {
    const clientExists = await Client.findByPk(clientId);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const paymentMethod = await PaymentMethod.findByPk(paymentId);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }
    const paymentMethodClient = await PaymentMethod.findOne({
      where: { client_id: clientId, id: paymentId },
    });
    if (!paymentMethodClient) {
      return res
        .status(404)
        .json({ error: "El método de pago no pertenece a este cliente" });
    } 
    await paymentMethodClient.destroy();
    return res
      .status(200)
      .json({ message: "Método de pago eliminado.", paymentMethod });
  } catch (error) {
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};

export {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
};
