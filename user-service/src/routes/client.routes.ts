import { Router } from "express"
import  {createClient, getClients, getClientById} from "../controllers/client.controller"

const router = Router()

router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);

export default router;
