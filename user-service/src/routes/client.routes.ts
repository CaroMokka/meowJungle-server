import { Router } from "express"
import  {createClient, getClients, getClientById, updateClient} from "../controllers/client.controller"

const router = Router()

router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);

export default router;
