import { Router } from "express"
import { createAddress, getAddresses, getAddressById , updateAddress, deleteAddress } from "../controllers/address.controllers"

const router = Router()

router.post("/address", createAddress)
router.get("/address", getAddresses)
router.get("/address/:id", getAddressById)
router.put("/address/:id", updateAddress)  
router.delete("/address/:id", deleteAddress)

export default router;