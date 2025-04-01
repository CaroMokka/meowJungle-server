import { Router } from "express";
import {
  createClientController,
  getClientsController,
  getClientByIdController,
  updateClientController,
  deleteClientController,
} from "../controllers/client.controllers";

const router = Router();

router.get("/clients", getClientsController);
router.get("/clients/:clientId", getClientByIdController);
router.post("/clients", createClientController);
router.put("/clients/:clientId", updateClientController);
router.delete("/clients/:clientId", deleteClientController);

export default router;
