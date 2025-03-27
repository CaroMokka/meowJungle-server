import { Router } from "express";
import { createPaymentMethod } from "../controllers/paymentMethod.controllers";

const router = Router();

router.post('/payment-methods', createPaymentMethod);

export default router;