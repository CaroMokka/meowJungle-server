import { Request, Response } from "express" 
import PaymentMethod from "../models/paymentMethod.model"

const createPaymentMethod = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { client_id, card_number, card_type, expiration_date } = req.body
        const paymentMethod = await PaymentMethod.create({
            client_id,
            card_number,
            card_type,
            expiration_date
        })
        return res.status(201).json({ message: "El metódo de pago se ha creado satisfactoriamente.", paymentMethod })
    } catch (error) {
        return res.status(500).json({ message: "Error desconocido.", error })
    }
}

export { createPaymentMethod }