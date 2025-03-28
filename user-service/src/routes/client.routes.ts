import { Router } from "express"
import  {createClient, getClients, getClientById, updateClient, deleteClient} from "../controllers/client.controller"

const router = Router()

router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

export default router;
