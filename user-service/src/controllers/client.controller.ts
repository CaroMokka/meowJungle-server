import { Request, RequestHandler, Response } from 'express';
import Client from '../models/client.model';

const createClient = async (req: Request, res: Response): Promise<Response> => {
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

const getClients = async (req: Request, res: Response): Promise<Response> => {
    try {
        const clients = await Client.findAll();
        return res.status(200).json( { message: 'Lista de clientes', clients });
    } 
    catch (error) {
        return res.status(500).json({ error: 'Error desconocido' });
    }
}
export { createClient, getClients };
