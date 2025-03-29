import { Request, Response } from "express";
import PaymentMethod from "../models/paymentMethod.model";
import Client from "../models/client.model";

const createPaymentMethod = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { client_id, card_number, card_type, expiration_date } = req.body;
    const clientExists = await Client.findByPk(client_id);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    if (!client_id || !card_number || !card_type || !expiration_date) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    } 
    const paymentMethod = await PaymentMethod.create({
      client_id,
      card_number,
      card_type,
      expiration_date,
    });
    return res
      .status(201)
      .json({
        message: "El metódo de pago se ha creado satisfactoriamente.",
        paymentMethod,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};

const getPaymentMethods = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
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
  const { id } = req.params;
  try {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }
    return res
      .status(200)
      .json({ message: "Método de pago encontrado.", paymentMethod });
  } catch (error) {
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};
const updatePaymentMethod = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { client_id, card_number, card_type, expiration_date } = req.body;

  try {
    if (!client_id || !card_number || !card_type || !expiration_date) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
    const clientExists = await Client.findByPk(client_id);
    if (!clientExists) {
      return res.status(404).json({ error: "El cliente no existe" });
    }
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      return res.status(404).json({ message: "Método de pago no encontrado." });
    }
    await paymentMethod.update({
      card_number,
      card_type,
      expiration_date,
    });
    return res
      .status(200)
      .json({ message: "Método de pago actualizado.", paymentMethod });
  } catch (error) {
    return res.status(500).json({ message: "Error desconocido.", error });
  }
};
const deletePaymentMethod = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const paymentMethod = await PaymentMethod.findByPk(id);
      if (!paymentMethod) {
        return res.status(404).json({ message: "Método de pago no encontrado." });
      }
      await paymentMethod.destroy();
      return res
        .status(200)
        .json({ message: "Método de pago eliminado.", paymentMethod });
    }
    catch (error) {
      return res.status(500).json({ message: "Error desconocido.", error });
    }
  };            

export {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod
};
