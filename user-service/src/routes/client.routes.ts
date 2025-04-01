import { Router } from "express";
import {
  createClientController,
  getClientsController,
  getClientByIdController,
  updateClientController,
  deleteClient,
} from "../controllers/client.controllers";

const router = Router();

router.get("/clients", getClientsController);
router.get("/clients/:clientId", getClientByIdController);
router.post("/clients", createClientController);
router.put("/clients/:clientId", updateClientController);
router.delete("/clients/:id", deleteClient);

export default router;
