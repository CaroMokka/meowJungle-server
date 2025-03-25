import { Request, Response } from 'express';
import Client from '../models/client.model';

export const createClient = async (req: Request, res: Response) => {
    const { first_name, last_name, email, phone_number } = req.body;    
    try {
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
          } 
        const client = await Client.create({
            first_name,
            last_name,
            email,
            phone_number
        });
        return res.status(201).json(client);
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Error desconocido' });
    }
}

