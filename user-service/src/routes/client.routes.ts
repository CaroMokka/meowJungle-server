import { Router } from "express"
import  {createClient} from "../controllers/client.controller"

const router = Router()

router.post('/clients', createClient);

export default router;
