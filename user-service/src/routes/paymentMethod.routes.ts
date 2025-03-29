import { Router } from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controllers";

const router = Router();

router.post("/payment-methods", createPaymentMethod);
router.get("/payment-methods", getPaymentMethods);
router.get("/payment-methods/:id", getPaymentMethodById);
router.put("/payment-methods/:id", updatePaymentMethod);
router.delete("/payment-methods/:id", deletePaymentMethod);

export default router;
