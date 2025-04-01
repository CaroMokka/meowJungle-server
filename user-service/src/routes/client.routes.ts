import { Router } from "express";
import {
  createClientController,
  getClientsController,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/client.controllers";

const router = Router();

router.get("/clients", getClientsController);
router.get("/clients/:id", getClientById);
router.post("/clients", createClientController);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
