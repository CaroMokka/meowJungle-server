import { Router } from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
  getPaymentMethodById,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controllers";

const router = Router();

router.post("/:clientId/payment-methods", createPaymentMethod);
router.get("/:clientId/payment-methods", getPaymentMethods);
router.get("/:clientId/payment-methods/:paymentId", getPaymentMethodById);
router.put("/:clientId/payment-methods/:paymentId", updatePaymentMethod);
router.delete("/:clientId/payment-methods/:paymentId", deletePaymentMethod);

export default router;
